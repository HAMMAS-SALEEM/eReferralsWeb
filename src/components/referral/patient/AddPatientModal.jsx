import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PatientForm from "./PatientForm";
import PatientService from "../../../services/PatientService";
import { toast } from "react-toastify";
import { IconButton, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "795px",
  bgcolor: "#E9E9E9",
  borderRadius: "30px",
  boxShadow: 24,
  padding: "10px 20px",
};

const AddPatientModal = ({
  isOpen,
  onClose,
  setSearchTerm,
  handleSelectPatient,
}) => {
  const queryClient = useQueryClient();
  const [apiErrors, setApiErrors] = useState({});

  const mutation = useMutation({
    mutationFn: PatientService.createPatient,
    onSuccess: (newPatientData) => {
      // Set the search term before closing the modal
      setSearchTerm(
        `${newPatientData.data.first_name} ${newPatientData.data.last_name} ${newPatientData.data.phone}`
      );

      handleSelectPatient(newPatientData.data);

      // Invalidate the patient query to refetch and update the list
      queryClient.invalidateQueries(["patients"]).then(() => {
        // Show success notification
        toast.success("Patient added successfully!");

        // Close the modal after updating the search term
        onClose();
      });
    },
    onError: (error) => {
      // Handle errors from the API
      if (error.response && error.response.data) {
        setApiErrors(error.response.data);
        if (error.response.data.email) {
          toast.error(`Failed to add patient: ${error.response.data.email[0]}`);
        } else if (error.response.data.phone) {
          toast.error(`Failed to add patient: ${error.response.data.phone[0]}`);
        } else if (error.response.data.detail) {
          toast.error(`Failed to add patient: ${error.response.data.detail}`);
        } else if (error.response.data.non_field_errors) {
          toast.error(
            `Failed to add patient: ${error.response.data.non_field_errors[0]}`
          );
        } else {
          // Handle any other API errors with fields we don't explicitly check
          const firstErrorKey = Object.keys(error.response.data)[0];
          if (firstErrorKey) {
            const errorMessage = Array.isArray(
              error.response.data[firstErrorKey]
            )
              ? error.response.data[firstErrorKey][0]
              : error.response.data[firstErrorKey];
            toast.error(`Failed to add patient: ${errorMessage}`);
          } else {
            toast.error("Failed to add patient: An error occurred");
          }
        }
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
      aria-labelledby="add-patient-modal-title"
      aria-describedby="add-patient-modal-description"
    >
      <Box sx={style}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography id="add-patient-modal-title" variant="h4" component="h2">
            Add Patient
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: "black" }}
          >
            <CancelIcon />
          </IconButton>
        </Stack>
        <PatientForm
          onSubmit={handleSubmit}
          apiErrors={apiErrors}
          loading={mutation.isPending}
        />
      </Box>
    </Modal>
  );
};

export default AddPatientModal;
