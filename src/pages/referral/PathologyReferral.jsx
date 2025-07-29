import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Grid, Box, Button, CircularProgress, Stack } from "@mui/material";
import PatientDetails from "../../components/referral/common/PatientDetails";
import PractitionerDetails from "../../components/referral/common/PractitionerDetails";
import MedicareDetails from "../../components/referral/common/MedicareDetails";
import PatientStatusOptions from "../../components/referral/pathology/PatientStatusOptions";
import PaymentMethod from "../../components/referral/pathology/PaymentMethod";
import HospitalStatus from "../../components/referral/pathology/HospitalStatus";
import PathologyFormSection from "../../components/referral/pathology/PathologyFormSection";
import { toast } from "react-toastify";
import useSaveReferral from "../../hooks/useSaveReferral";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import StepNavigator from "../../components/referral/common/StepNavigator";
import ReferralHeader from "../../components/referral/common/ReferralHeader";
import ActionMenu from "../../components/referrals1/ActionMenu";
import { useUpdatePatient } from "../../hooks/patientHooks";
import dayjs from "dayjs";

const DUMMY_DATE = "1970-01-01T00:00:00Z";

const PathologyReferral = ({
  mode,
  referral,
  history,
  referralType,
  patient,
  method,
  practitionerProfile,
  practitionerLoading,
  continueDraft,
}) => {
  const methods = useForm({
    defaultValues: {
      test_required: referral?.form?.test_required || "",
      is_urgent: referral?.is_urgent || false,
      urgent_reason: referral?.urgent_reason || "",
      clinical_notes: referral?.form?.clinical_notes || "",
      is_self_determined: referral?.form?.is_self_determined || true,
      send_results_to: referral?.send_results_to || "",
      has_pension: patient?.has_pension || false,
      has_healthcare_card: patient?.has_healthcare_card || false,
      has_dva: patient?.has_dva || false,
      do_not_send_to_my_health_record:
        referral?.do_not_send_to_my_health_record || false,
      is_fasting: referral?.form?.is_fasting || false,
      is_not_fasting: referral?.form?.is_not_fasting || false,
      is_pregnant: referral?.form?.is_pregnant || false,
      is_on_hormone_therapy: referral?.form?.is_on_hormone_therapy || false,
      gestional_age: referral?.form?.gestional_age || "",
      lnmp: referral?.form?.lnmp ? dayjs(referral.form.lnmp) : null,
      allergies: referral?.form?.allergies || "",
      payment_method: referral?.form?.payment_method || "",
      hospital_status: referral?.form?.hospital_status || "DOES_NOT_APPLY",
      signed_date:
        mode === "create"
          ? ""
          : referral?.signed_date && referral.signed_date !== DUMMY_DATE
            ? referral.signed_date
            : "",
    },
  });

  const { reset, watch } = methods;
  const navigate = useNavigate();

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
    // Combine the old patient data with the updated fields
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

  const handleNext = async (data) => {
    const formToSave = buildFormObject(data, false);

    delete formToSave.is_urgent;
    delete formToSave.urgent_reason;
    delete formToSave.do_not_send_to_my_health_record;
    delete formToSave.send_results_to;

    // Validation checks
    if (!data.test_required || data.test_required.trim() === "") {
      toast.error("Please specify the required tests before proceeding.");
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
      type: "PATHOLOGY",
      signed_date: data.signed_date,
      is_urgent: data.is_urgent,
      urgent_reason: data.urgent_reason || null,
      do_not_send_to_my_health_record: data.do_not_send_to_my_health_record,
      send_results_to: data.send_results_to || null,
    };

    // Save the referral
    await handleSaveDraft(true, updatedReferralData, null, method);
  };

  const handleDraftSave = async (data) => {
    const formToSave = buildFormObject(data, true);

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
      from_doctor_data: practitionerProfile,
      form: formToSave,
      type: "PATHOLOGY",
      signed_date: signedDateToSave,
      is_urgent: data.is_urgent,
      urgent_reason: data.urgent_reason || null,
      do_not_send_to_my_health_record: data.do_not_send_to_my_health_record,
      send_results_to: data.send_results_to || null,
    };

    // Save the draft referral
    await handleSaveDraft(false, updatedReferralData, null, method);
  };

  const buildFormObject = (data, isDraft) => {
    const form = { ...data };

    form.gestional_age = data.gestional_age ? Number(data.gestional_age) : null;

    form.lnmp = data.lnmp ? dayjs(data.lnmp).format("YYYY-MM-DD") : null;

    if (isDraft) {
      form.test_required = form.test_required || " ";
      form.clinical_notes = form.clinical_notes || " ";
    }
    return form;
  };

  const isViewMode = mode === "view";

  const isNextDisabled =
    !watch("test_required") ||
    !watch("clinical_notes") ||
    isSavingNext ||
    mode === "view";

  return (
    <FormProvider {...methods}>
      <Box>
        <Stack spacing={3} mb={2}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <StepNavigator
              title={mode === "view" ? "View Request" : "Create Request"}
              onBack={handleBack}
              onNext={isViewMode ? null : methods.handleSubmit(handleNext)}
              disableNext={isNextDisabled}
              disableBack={continueDraft ? true : false}
              type={
                isViewMode
                  ? `(${referral?.type ?? ""} - #${referral?.id ?? ""})`
                  : mode === "create"
                    ? `Request (${referralType ?? ""})`
                    : `Request (${referral?.type ?? ""} - #${referral?.id ?? ""})`
              }
              mode={mode}
            />
            {isViewMode && <ActionMenu referral={referral} history={history} />}
          </Stack>

          <ReferralHeader
            type={mode === "create" ? referralType : referral?.type}
            referralId={referral?.id}
          />
        </Stack>

        <Stack spacing={2}>
          <form onSubmit={methods.handleSubmit(handleNext)}>
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
                  <MedicareDetails mode={mode} patient={patient} />
                </Grid>
              </Grid>
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
                  <PathologyFormSection mode={mode} />
                </Grid>
                <Grid item xs={3.75}>
                  <PatientStatusOptions mode={mode} />
                  <PaymentMethod mode={mode} />
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  justifyContent: "space-between",
                }}
              >
                <Grid item xs={8}>
                  <PractitionerDetails
                    columns={4}
                    profile={practitionerProfile}
                    loading={practitionerLoading}
                    mode={mode}
                    method={method}
                  />
                </Grid>
                <Grid
                  item
                  xs={3.75}
                  sx={{
                    borderRadius: "19px",
                    border: "2px solid rgba(0, 0, 0, 0.10)",
                    padding: "20px",
                  }}
                >
                  <HospitalStatus mode={mode} />
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

export default PathologyReferral;
