import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReferralService from "../services/ReferralService";
import FileService from "../services/FileService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { resetReferral, setFile } from "../store/slices/referralSlice1";
import { clearPatient } from "../store/slices/patientSlice1";
import { useDispatch } from "react-redux";

const useSaveReferral = (mode, initialReferralData, patient, resetForm) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isSavingNext, setIsSavingNext] = useState(false);

  const mutationFn = (dataToSubmit) => {
    if (mode === "edit") {
      return ReferralService.updateReferral(dataToSubmit.id, dataToSubmit);
    } else {
      return ReferralService.createReferral(dataToSubmit);
    }
  };

  const saveDraftMutation = useMutation({
    mutationFn,
    onSuccess: (response) => {
      if (isSavingNext) {
        setIsSavingNext(false);
        toast.success("Request saved successfully");
        dispatch(resetReferral());
        dispatch(clearPatient());
        queryClient.invalidateQueries(["patient", patient.id]);

        if (resetForm) {
          resetForm();
        }

        navigate(`/add-referral/send-referral/${response.data.id}`);
      } else {
        setIsSavingDraft(false);
        toast.success("Draft saved successfully");
        dispatch(resetReferral());
        dispatch(clearPatient());

        // Invalidate patient query key
        queryClient.invalidateQueries(["patient", patient.id]);

        // Reset the form
        if (resetForm) {
          resetForm();
        }

        // Redirect to referral list page
        navigate("/referrals");
      }
    },
    onError: async (error, variables) => {
      try {
        if (variables.wasFileUploaded && variables.file) {
          await FileService.deleteFile(variables.file);
          toast.error("Failed to save draft. Uploaded file has been deleted.");
        } else {
          toast.error("Failed to save draft: " + error.response.data.detail);
        }
        setIsSavingDraft(false);
        setIsSavingNext(false);
      } catch (deleteError) {
        toast.error(
          "Failed to save draft and delete file: " + deleteError.message
        );
        setIsSavingDraft(false);
        setIsSavingNext(false);
      }
    },
  });

  const handleSaveDraft = async (
    isNextStep,
    updatedReferralData,
    selectedFile,
    method
  ) => {
    if (!patient.id) {
      toast.error("Please select a patient before saving the draft.");
      return;
    }

    if (!updatedReferralData.type) {
      toast.error("Please select a Request type before saving the draft.");
      return;
    }

    if (
      isNextStep &&
      method === "file" &&
      (!selectedFile || selectedFile === "Ijdnm4WiGr7n") &&
      (!updatedReferralData.file || updatedReferralData.file === "Ijdnm4WiGr7n")
    ) {
      toast.error(
        "Please upload a valid file before proceeding to the next step."
      );
      return;
    }

    // Set saving states
    if (isNextStep) {
      setIsSavingNext(true);
    } else {
      setIsSavingDraft(true);
    }

    let wasFileUploaded = false;
    let fileReference = null;
    try {
      if (method === "file") {
        if (selectedFile) {
          const response = await FileService.uploadFile(selectedFile);
          fileReference = response.data.id;
          wasFileUploaded = true;
          dispatch(setFile(fileReference));
        } else {
          fileReference = updatedReferralData.file_data?.id || "Ijdnm4WiGr7n";
          dispatch(setFile(fileReference));
        }
      }

      const currentDateTime = new Date().toISOString();

      const dataToSubmit = {
        ...updatedReferralData,
        ...(method === "file" && { file: fileReference }),
        patient: patient.id,
        signed_date: wasFileUploaded
          ? currentDateTime
          : updatedReferralData.signed_date,
        ...(mode !== "edit" && { patient_gives_consent: true }),
      };

      if (mode === "edit") {
        dataToSubmit.id = updatedReferralData.id;
      }

      // Submit the draft
      saveDraftMutation.mutate({
        ...dataToSubmit,
        ...(method === "file" && { file: fileReference }),
      });
    } catch (error) {
      setIsSavingDraft(false);
      setIsSavingNext(false);
      toast.error("Failed to upload file: " + error.message);
    }
  };

  return {
    isSavingDraft,
    isSavingNext,
    handleSaveDraft,
  };
};

export default useSaveReferral;
