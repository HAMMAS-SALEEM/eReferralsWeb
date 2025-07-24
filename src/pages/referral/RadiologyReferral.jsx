import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Grid, Box, Button, Stack, CircularProgress } from "@mui/material";
import PatientDetails from "../../components/referral/common/PatientDetails";
import MedicareDetails from "../../components/referral/common/MedicareDetails";
import RadiologyFormSection from "../../components/referral/radiology/RadiologyFormSection";
import PractitionerDetails from "../../components/referral/common/PractitionerDetails";
import useSaveReferral from "../../hooks/useSaveReferral";
import { toast } from "react-toastify";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PatientStatusRadiology from "../../components/referral/radiology/PatientStatusRadiology";
import { useDispatch } from "react-redux";
import { setType } from "../../store/slices/referralSlice1";
import { useNavigate } from "react-router-dom";
import StepNavigator from "../../components/referral/common/StepNavigator";
import ReferralHeader from "../../components/referral/common/ReferralHeader";
import ActionMenu from "../../components/referrals1/ActionMenu";
import { useUpdatePatient } from "../../hooks/patientHooks";

const DUMMY_DATE = "1970-01-01T00:00:00Z";

const RadiologyReferral = ({
  mode,
  referral,
  referralType,
  patient,
  method,
  practitionerProfile,
  practitionerLoading,
  history,
  continueDraft,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isViewMode = mode === "view";

  useEffect(() => {
    if (referral) {
      dispatch(setType(referral?.type));
    }
  }, [referral, dispatch]);

  const methods = useForm({
    defaultValues: {
      examination_required:
        referral?.form?.examination_required === " "
          ? ""
          : referral?.form?.examination_required || "",
      is_urgent: referral?.is_urgent ?? false,
      urgent_reason: referral?.urgent_reason || "",
      clinical_notes:
        referral?.form?.clinical_notes === " "
          ? ""
          : referral?.form?.clinical_notes || "",
      send_results_to_emails: referral?.send_results_to_emails || "",
      has_contrast_allergy: referral?.form?.has_contrast_allergy ?? null,
      has_renal_impairment: referral?.form?.has_renal_impairment ?? null,
      egfr: referral?.form?.egfr || "",
      is_pregnant: referral?.form?.is_pregnant || "",
      has_pension: patient?.has_pension ?? false,
      has_healthcare_card: patient?.has_healthcare_card ?? false,
      has_dva: patient?.has_dva ?? false,
      do_not_send_to_my_health_record:
        referral?.do_not_send_to_my_health_record ?? false,
      signed_date:
        mode === "create"
          ? ""
          : referral?.signed_date && referral.signed_date !== DUMMY_DATE
            ? referral.signed_date
            : "",
    },
  });

  const { reset, watch } = methods;

  const { isSavingDraft, isSavingNext, handleSaveDraft } = useSaveReferral(
    mode,
    referral,
    patient,
    reset
  );

  const updatePatientMutation = useUpdatePatient(); // Initialize the mutation

  const handleBack = () => {
    if (mode === "view" || mode === "edit") {
      navigate("/referrals"); // In view mode, navigate to referrals list
    } else {
      navigate("/add-referral/select-referral-type");
    }
  };

  const updatePatientIfNeeded = async (data) => {
    const updatedPatientData = {
      ...patient, // Spread the old patient data
      has_pension: data.has_pension,
      has_healthcare_card: data.has_healthcare_card,
      has_dva: data.has_dva,
    };

    // Check if the relevant fields have changed
    const hasPatientChanged =
      updatedPatientData.has_pension !== patient.has_pension ||
      updatedPatientData.has_healthcare_card !== patient.has_healthcare_card ||
      updatedPatientData.has_dva !== patient.has_dva;

    if (hasPatientChanged) {
      try {
        // Pass the full patient object (old + updated fields) to the mutation
        await updatePatientMutation.mutateAsync({
          id: patient.id,
          data: updatedPatientData,
        });
        return true;
      } catch (error) {
        // Error handling is managed within the mutation hook
        return false;
      }
    }

    return true; // No changes needed
  };

  const buildFormObject = (data, isDraft) => {
    const form = { ...data };

    if (isDraft) {
      form.examination_required = form.examination_required || " ";
      form.clinical_notes = form.clinical_notes || " ";
    }
    return form;
  };

  const onSubmit = async (data) => {
    const formToSave = buildFormObject(data, false);
    delete formToSave.is_urgent;
    delete formToSave.urgent_reason;
    delete formToSave.do_not_send_to_my_health_record;
    delete formToSave.send_results_to_emails;
    // Validation checks
    if (!data.examination_required || data.examination_required.trim() === "") {
      toast.error("Please enter the examination required before proceeding.");
      return;
    }

    if (!data.clinical_notes || data.clinical_notes.trim() === "") {
      toast.error("Please enter the clinical notes before proceeding.");
      return;
    }

    if (!data.signed_date || data.signed_date.trim() === "") {
      toast.error("Please enter the signed date before proceeding.");
      return;
    }

    // Update patient if needed
    const isPatientUpdated = await updatePatientIfNeeded(data);
    if (!isPatientUpdated) return; // Stop if patient update failed

    // Prepare updated referral data
    const updatedReferralData = {
      ...referral,
      form: formToSave,
      is_urgent: data.is_urgent,
      urgent_reason: data.urgent_reason || "",
      do_not_send_to_my_health_record: data.do_not_send_to_my_health_record,
      send_results_to_emails: data.send_results_to_emails,
      type: "RADIOLOGY",
      signed_date: data.signed_date,
    };
    // Save the referral
    await handleSaveDraft(true, updatedReferralData, null, method);
  };

  const handleDraftSave = async (data) => {
    const formToSave = buildFormObject(data, true);
    // Remove is_urgent and urgent_reason from form object
    delete formToSave.is_urgent;
    delete formToSave.urgent_reason;
    delete formToSave.do_not_send_to_my_health_record;
    delete formToSave.send_results_to_emails;

    const signedDateToSave =
      data.signed_date && data.signed_date.trim() !== ""
        ? data.signed_date
        : DUMMY_DATE;

    // Update patient if needed
    const isPatientUpdated = await updatePatientIfNeeded(data);
    if (!isPatientUpdated) return; // Stop if patient update failed

    // Prepare updated referral data
    const updatedReferralData = {
      ...referral,
      form: formToSave,
      type: "RADIOLOGY",
      signed_date: signedDateToSave,
      is_urgent: data.is_urgent,
      urgent_reason: data.urgent_reason || "",
      do_not_send_to_my_health_record: data.do_not_send_to_my_health_record,
      send_results_to_emails: data.send_results_to_emails,
    };

    // Save the draft referral
    await handleSaveDraft(false, updatedReferralData, null, method);
  };

  const isNextDisabled =
    !watch("examination_required") ||
    !watch("clinical_notes") ||
    isSavingNext ||
    mode === "view";

  return (
    <FormProvider {...methods}>
      <Box>
        <Stack spacing={3} mb={2}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <StepNavigator
              title={isViewMode ? "View Request" : "Create Request"}
              onBack={handleBack}
              onNext={isViewMode ? null : methods.handleSubmit(onSubmit)}
              disableNext={isNextDisabled}
              disableBack={continueDraft ? true : false}
              type={
                isViewMode
                  ? `(${referral?.type ?? ""} - #${referral?.id ?? ""})`
                  : mode === "create"
                    ? `Request (${referralType ?? ""})`
                    : `Request (${referral?.type ?? ""} - #${referral?.id ?? ""})`
              }
            />
            {isViewMode && <ActionMenu referral={referral} history={history} />}
          </Stack>
          <ReferralHeader
            type={mode === "create" ? referralType : referral?.type}
            referralId={referral?.id}
          />
        </Stack>

        <Stack spacing={2}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Grid
                container
                sx={{
                  borderRadius: "19px",
                  border: "2px solid rgba(0, 0, 0, 0.10)",
                  padding: "20px",
                  justifyContent: "space-between",
                }}
              >
                <Grid item xs={8}>
                  <PatientDetails
                    layout={3}
                    patient={patient}
                    method={method}
                    mode={mode}
                  />
                </Grid>
                <Grid item xs={3.75}>
                  <MedicareDetails
                    mode={mode}
                    patient={patient}
                    register={methods.register}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                sx={{
                  borderRadius: "19px",
                  border: "2px solid rgba(0, 0, 0, 0.10)",
                  justifyContent: "space-between",
                }}
              >
                <Grid item xs={8}>
                  <RadiologyFormSection
                    mode={mode}
                    register={methods.register}
                    errors={methods.formState.errors}
                  />
                </Grid>
                <Grid item xs={3.75}>
                  <PatientStatusRadiology mode={mode} referral={referral} />
                </Grid>
              </Grid>

              <Grid
                container
                sx={{
                  justifyContent: "space-between",
                }}
              >
                <Grid item xs={referralType === "RADIOLOGY" ? 12 : 8}>
                  <PractitionerDetails
                    columns={4}
                    profile={practitionerProfile}
                    loading={practitionerLoading}
                    mode={mode}
                    method={method}
                  />
                </Grid>
              </Grid>
            </Stack>

            {mode !== "view" && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                <Button
                  type="button"
                  variant="blueGradient"
                  size="medium"
                  sx={{ mr: 2 }}
                  onClick={methods.handleSubmit(handleDraftSave)}
                  disabled={isSavingDraft || isSavingNext}
                  endIcon={
                    isSavingDraft && (
                      <CircularProgress size={16} color="inherit" />
                    )
                  }
                >
                  {mode === "edit" ? "Save Changes" : "Save Draft"}
                </Button>
                <Button
                  type="submit"
                  variant="greenGradient"
                  size="medium"
                  sx={{ mr: 2 }}
                  disabled={isSavingDraft || isNextDisabled}
                  endIcon={
                    isSavingNext ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : (
                      <ArrowForwardIosIcon />
                    )
                  }
                >
                  Next
                </Button>
              </Box>
            )}
          </form>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default RadiologyReferral;
