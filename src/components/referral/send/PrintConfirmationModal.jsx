import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@tanstack/react-query";
import FileService from "../../../services/FileService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CheckMark from "../../../assets/icons/checkmark.gif";
import ReferralService from "../../../services/ReferralService";
import GradientCircularProgress from "../../GradientCircularProgress";

const PrintConfirmationModal = ({
  open,
  onClose,
  referralData,
  additionalRecipients,
}) => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const referralId = referralData?.id;

  // Combined mutation: Mark as sent and download PDF
  const combinedMutation = useMutation({
    mutationFn: async () => {
      if (referralData?.status === "DRAFT") {
        await ReferralService.updateReferral(referralId, {
          patient: referralData?.patient,
          to_emails: additionalRecipients,
          type: referralData?.type,
          patient_gives_consent: true,
        });
        await ReferralService.markReferralAsSent(referralId);
      }
      const response = await FileService.downloadReportPdf(referralId);
      return response;
    },
    onSuccess: (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Request-${referralId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setIsSuccess(true);
      toast.success("Request marked as sent and PDF downloaded successfully!");
    },
    onError: (error) => {
      console.error("Error during print confirmation:", error);
      toast.error("Failed to print Request.");
    },
  });

  const handleConfirm = () => {
    combinedMutation.mutate();
  };

  const handleModalClose = () => {
    onClose();
  };

  const isLoading = combinedMutation.isLoading;

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#E9E9E9",
          borderRadius: "30px",
          boxShadow: 24,
          p: "19px 33.5px",
          width: isSuccess ? "521px" : "624px",
          gap: "20px",
        }}
      >
        {referralData ? ( // Ensure the modal content is displayed only if referralData is present
          <Stack spacing={4}>
            {!isSuccess ? (
              <>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography sx={{ fontSize: "30px", fontWeight: 600 }}>
                    Print and Mark as "Sent"
                  </Typography>
                  <CloseIcon
                    sx={{ cursor: "pointer" }}
                    onClick={handleModalClose}
                  />
                </Box>

                <Typography sx={{ my: 2 }}>
                  Printing this Request will set the its status as "Sent".
                </Typography>

                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                  <Button
                    variant="greenGradient"
                    onClick={handleConfirm}
                    disabled={combinedMutation.isPending}
                    endIcon={
                      combinedMutation.isPending ?
                        <GradientCircularProgress size={20} /> :
                        null
                    }
                  >
                    Confirm
                  </Button>
                </Stack>
              </>
            ) : (
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems="center"
                spacing={0}
              >
                <Typography sx={{ fontSize: "30px", fontWeight: 600 }}>
                  Request Printed Successfully
                </Typography>

                <Box
                  component="img"
                  src={CheckMark}
                  alt="Success Check"
                  sx={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              </Stack>
            )}
          </Stack>
        ) : (
          <Typography>Loading Request data...</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default PrintConfirmationModal;
