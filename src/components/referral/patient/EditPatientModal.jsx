import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PatientForm from "./PatientForm";
import PatientService from "../../../services/PatientService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setPatientId } from "../../../store/slices/referralSlice1";
import { setPatient } from "../../../store/slices/patientSlice1";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#E9E9E9",
  padding: "10px 20px",
  width: "795px",
  borderRadius: "30px",
  boxShadow: "0px 0px 30px 0px rgba(0, 0, 0, 0.20)",
};

const EditPatientModal = ({
  isOpen,
  onClose,
  initialValues,
  setSearchTerm,
  handleSelectPatient,
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [apiErrors, setApiErrors] = useState({});
  const selectedPatient = useSelector((state) => state.referral.patient);

  const mutation = useMutation({
    mutationFn: (patientData) =>
      PatientService.updatePatient(initialValues.id, patientData),
    onSuccess: (updatedPatientData) => {
      setApiErrors({});
      if (selectedPatient && selectedPatient === updatedPatientData.data.id) {
        dispatch(setPatient(updatedPatientData.data));
        dispatch(setPatientId(updatedPatientData.data.id));
      }

      // Set search term first before closing the modal
      setSearchTerm(
        `${updatedPatientData.data.first_name} ${updatedPatientData.data.last_name} ${updatedPatientData.data.phone}`
      );

      handleSelectPatient(updatedPatientData.data);

      queryClient.invalidateQueries(["patients"]).then(() => {
        // Show success notification
        toast.success("Patient updated successfully!");

        // Close the modal after search term is updated
        onClose();
      });
    },
    onError: (error) => {
      if (error.response && error.response.data) {
        setApiErrors(error.response.data);
        toast.error("Failed to update patient: " + error.response.data.detail);
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
    },
  });

  const handleSubmit = (patientData) => {
    mutation.mutate(patientData);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="edit-patient-modal-title"
      aria-describedby="edit-patient-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between", // Space between CloseIcon and Typography
            alignItems: "center", // Center vertically
          }}
        >
          <Typography
            id="edit-patient-modal-title"
            variant="h4"
            component="h2"
            gutterBottom
          >
            Patient Details
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: "black" }}
          >
            <CancelIcon />
          </IconButton>
        </Box>
        <PatientForm
          onSubmit={handleSubmit}
          initialValues={initialValues}
          isEditing
          apiErrors={apiErrors}
          loading={mutation.isPending}
        />
      </Box>
    </Modal>
  );
};

export default EditPatientModal;
