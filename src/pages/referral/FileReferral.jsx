import React, { useState } from "react";
import { Grid, Box, Button, Stack, CircularProgress } from "@mui/material";
import PractitionerDetails from "../../components/referral/common/PractitionerDetails";
import PatientDetails from "../../components/referral/common/PatientDetails";
import MedicareDetails from "../../components/referral/common/MedicareDetails";
import TestRequiredBox from "../../components/referral/common/TestRequiredBox";
import FileUpload from "../../components/referral/FileUpload";
import UrgentReasonForm from "../../components/referral/common/UrgentReasonForm";
import SendResultsTo from "../../components/referral/common/SendResultsTo";
import useSaveReferral from "../../hooks/useSaveReferral";
import { toast } from "react-toastify";
import { useForm, FormProvider } from "react-hook-form";
import StepNavigator from "../../components/referral/common/StepNavigator";
import ReferralHeader from "../../components/referral/common/ReferralHeader";
import ActionMenu from "../../components/referrals1/ActionMenu";

const FileReferral = ({
  mode,
  method,
  referral,
  patient,
  practitionerProfile,
  practitionerLoading,
  referralType,
  history,
  continueDraft,
}) => {
  const methods = useForm({
    defaultValues: {
      is_urgent: referral?.is_urgent || false,
      urgent_reason: referral?.urgent_reason || "",
      send_results_to_emails: referral?.send_results_to_emails || "",
      signed_date: referral?.signed_date || "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { handleSubmit, reset } = methods;
  const [selectedFile, setSelectedFile] = useState(null);

  const resetSpecificFields = () => {
    reset(
      {
        is_urgent: false,
        urgent_reason: "",
        send_results_to_emails: "",
      },
      {
        keepValues: true, // Keeps other fields unchanged
        keepErrors: true,
        keepDirty: true,
        keepTouched: true,
        keepIsValid: true,
        keepSubmitCount: true,
      }
    );
  };

  const { isSavingDraft, isSavingNext, handleSaveDraft } = useSaveReferral(
    mode,
    referral,
    patient,
    reset,
    resetSpecificFields
  );

  // const navigate = useNavigate();

  const handleBack = () => {
    if (mode === "view" || mode === "edit") {
      navigate("/referrals"); // Navigate to referrals list when in view mode
    } else {
      navigate("/add-referral/select-referral-type");
    }
  };

  const handleNext = (data) => {
    onSubmit(data, true);
  };

  const isNextDisabled =
    (!selectedFile && !referral?.file_data) ||
    practitionerLoading ||
    mode === "view";

  const handleFileSelection = (file) => {
    setSelectedFile(file);
  };

  const isViewMode = mode === "view";
  const isEditModeLocal = mode === "edit";

  const onSubmit = async (data, isNextStep) => {
    if (method !== "file") {
      toast.error("Invalid method. Please select a valid method.");
      return;
    }

    let signedDateToUse = data.signed_date;
    if (!signedDateToUse) {
      signedDateToUse = new Date().toISOString();
      methods.setValue("signed_date", signedDateToUse);
    }

    const updatedReferralData = {
      ...(isEditModeLocal && referral),
      is_urgent: data.is_urgent,
      urgent_reason: data.urgent_reason,
      send_results_to_emails: data.send_results_to_emails,
      type: mode === "create" ? referralType : referral?.type,
      signed_date: signedDateToUse,
    };

    await handleSaveDraft(
      isNextStep,
      updatedReferralData,
      selectedFile,
      method
    );
  };

  return (
    <FormProvider {...methods}>
      <Box>
        <Stack spacing={3} mb={2}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <StepNavigator
              title={isViewMode ? "View Request" : "File Request"}
              onBack={handleBack}
              onNext={isViewMode ? null : handleSubmit(handleNext)}
              disableNext={isNextDisabled}
              disableBack={continueDraft ? true : false}
              type={
                isViewMode
                  ? `(${referral?.type ?? ""} - #${referral?.id ?? ""})`
                  : mode === "create"
                  ? `Request (${referralType.toLowerCase() ?? ""})`
                  : `Request (${referral?.type.toLowerCase() ?? ""} - #${
                      referral?.id ?? ""
                    })`
              }
            />
            {isViewMode && <ActionMenu referral={referral} history={history} />}
          </Stack>

          <ReferralHeader
            type={mode === "create" ? referralType : referral?.type}
            referralId={referral?.id}
          />
        </Stack>

        {isViewMode ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid
                  container
                  sx={{
                    borderRadius: "19px",
                    border: "2px solid rgba(0, 0, 0, 0.10)",
                    background: "rgba(217, 217, 217, 0.00)",
                    paddingBottom: "50px",
                    justifyContent: "space-between",
                    p: 2,
                  }}
                >
                  <Grid item xs={8}>
                    <PatientDetails layout={3} patient={patient} mode={mode} />
                  </Grid>
                  <Grid item xs={3.75}>
                    <MedicareDetails
                      columns={2}
                      patient={referral?.patient_data}
                      mode={mode}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TestRequiredBox data={referral?.test_required} />
              </Grid>

              <Grid item xs={12}>
                <PractitionerDetails
                  columns={2}
                  profile={practitionerProfile}
                  loading={practitionerLoading}
                  mode={mode}
                  method={method}
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <form onSubmit={handleSubmit((data) => onSubmit(data, true))}>
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <PatientDetails layout={2} patient={patient} mode={mode} />
                </Grid>
                <Grid item xs={6}>
                  <PractitionerDetails
                    columns={2}
                    profile={practitionerProfile}
                    loading={practitionerLoading}
                    mode={mode}
                    method={method}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} mt={4}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <FileUpload
                    onFileSelected={handleFileSelection}
                    existingFile={referral?.file_data}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={2}>
                    <SendResultsTo mode={mode} />
                    <UrgentReasonForm mode={mode} />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2.5,
                  mt: 4,
                }}
              >
                <Button
                  variant="blueGradient"
                  size="medium"
                  onClick={handleSubmit((data) => onSubmit(data, false))}
                  disabled={isSavingDraft || isSavingNext}
                  endIcon={
                    isSavingDraft && (
                      <CircularProgress size={16} color="inherit" />
                    )
                  }
                >
                  {isEditModeLocal ? "Save Changes" : "Save Draft"}
                </Button>
                <Button
                  variant="greenGradient"
                  size="medium"
                  type="submit"
                  disabled={isSavingDraft || isSavingNext || isNextDisabled}
                  endIcon={
                    isSavingNext && (
                      <CircularProgress size={16} color="inherit" />
                    )
                  }
                >
                  Next
                </Button>
              </Box>
            </Grid>
          </form>
        )}
      </Box>
    </FormProvider>
  );
};

export default FileReferral;
