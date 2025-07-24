import React from "react";
import { IconButton, Stack, Typography, CircularProgress } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReferralService from "../../services/ReferralService";
import { toast } from "react-toastify";
import FileService from "../../services/FileService";

import SendIcon from "../../assets/icons/send-icon.svg";
import PrintIcon from "../../assets/icons/print-icon.svg";
import CloneIcon from "../../assets/icons/clone-icon.svg";
import ArchiveIcon from "../../assets/icons/archive-icon.svg";
import ViewIcon from "../../assets/icons/view-icon.svg";
import DeleteIcon from "../../assets/icons/delete-icon.svg";
import CompleteIcon from "../../assets/icons/complete-icon.svg";

const ActionButtons = ({ referral }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const completeMutation = useMutation({
    mutationFn: (id) => ReferralService.markReferralCompleted(id),
    onSuccess: () => {
      toast.success("Request marked as completed successfully!");
      queryClient.invalidateQueries("referrals");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.detail?.[0] ||
        "Failed to mark Request as completed";
      toast.error(errorMessage);
    },
  });

  const pdfMutation = useMutation({
    mutationFn: (referralId) => FileService.downloadReportPdf(referralId),
    onSuccess: (response, referralId) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Request-${referralId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("PDF downloaded successfully!");
    },
    onError: () => {
      toast.error("Failed to download PDF.");
    },
  });

  const cloneMutation = useMutation({
    mutationFn: (id) => ReferralService.cloneReferral(id),
    onSuccess: (response) => {
      const newReferralId = response?.data?.id; // Assuming the response contains the new referral's ID
      toast.success("Request cloned successfully!");

      // Invalidate the queries and navigate to the continue page with the new referral ID
      queryClient.invalidateQueries("referrals");

      // Navigate to the continue referral page with the new referral ID
      if (newReferralId) {
        navigate(`/add-referral/continue-referral/${newReferralId}`);
      } else {
        toast.error("Failed to retrieve new Request ID.");
      }
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.detail?.[0] || "Failed to clone Request";
      toast.error(errorMessage);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => ReferralService.deleteReferral(id),
    onSuccess: () => {
      toast.success("Request deleted successfully!");
      queryClient.invalidateQueries("referrals");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.detail?.[0] || "Failed to delete Request";
      toast.error(errorMessage);
    },
  });

  // Archive mutation
  const archiveMutation = useMutation({
    mutationFn: (id) => ReferralService.archiveReferral(id),
    onSuccess: () => {
      toast.success("Request archived successfully!");
      queryClient.invalidateQueries("referrals");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.detail?.[0] || "Failed to archive Request";
      toast.error(errorMessage);
    },
  });

  // Unarchive mutation
  const unarchiveMutation = useMutation({
    mutationFn: (id) => ReferralService.unarchiveReferral(id),
    onSuccess: () => {
      toast.success("Request unarchived successfully!");
      queryClient.invalidateQueries("referrals");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.detail?.[0] || "Failed to unarchive Request";
      toast.error(errorMessage);
    },
  });

  const handleCompleteClick = () => completeMutation.mutate(referral.id);
  const handleSendClick = () =>
    navigate(`/add-referral/send-referral/${referral.id}`);
  const handleDownloadPdf = () => pdfMutation.mutate(referral.id);
  const handleCloneClick = () => cloneMutation.mutate(referral.id);
  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this Request?")) {
      deleteMutation.mutate(referral.id);
    }
  };

  // Conditional archive/unarchive handler
  const handleArchiveClick = () => {
    if (referral.is_archived) {
      unarchiveMutation.mutate(referral.id); // Unarchive if archived
    } else {
      archiveMutation.mutate(referral.id); // Archive if not archived
    }
  };

  const handleViewClick = () =>
    navigate(`/add-referral/view-referral/${referral.id}`);
  const handleContinueClick = () =>
    navigate(`/add-referral/continue-referral/${referral.id}`);

  const renderActionButton = (
    iconSrc,
    label,
    onClickHandler,
    isPending,
    isError,
    isUnarchive
  ) => (
    <Stack
      direction={"row"}
      alignItems="center"
      justifyContent={"end"}
      onClick={(event) => {
        event.stopPropagation();
        onClickHandler();
      }}
      sx={{
        cursor: "pointer",
        padding: "5px",
        transition: "background 0.25s, color 0.25s, border-radius 0.22s",
        "&:hover": {
          background: "#e0e0e0",
          color: "#000",
          borderRadius: "8px",
          paddingInline: "5px",
          "& .MuiTypography-root": {
            color: "#000",
            fontSize: "16px",
            transition: "color 0.22s, font-size 0.22s",
          },
          "& .MuiIconButton-root": {
            transform: "scale(1.2)",
            transition: "transform 0.22s cubic-bezier(.4,1.2,.6,1)",
          },
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "16px",
          color: "#999",
          "&:hover": {
            // background:
            //   "linear-gradient(90deg, rgba(224, 224, 224, 0.8), rgba(176, 176, 176, 0.8))", // Gradient gray background with opacity
            borderRadius: "8px",
          },
        }}
      >
        {label}
      </Typography>
      <IconButton
        sx={{
          transform: isUnarchive ? "rotate(180deg)" : "none",
          paddingBlock: "0px",
          paddingInline: "10px",
          transition: "transform 0.3s ease", // Smooth transition for scaling
        }}
      >
        {isPending ? (
          <CircularProgress size={24} sx={{ color: "#fff" }} />
        ) : isError ? (
          <ErrorIcon color="error" />
        ) : (
          <img src={iconSrc} alt={label} width={28} height={28} /> // Make icon bigger
        )}
      </IconButton>
    </Stack>
  );

  return (
    <Stack spacing={1}>
      {referral.status === "DRAFT" && (
        <>
          {renderActionButton(
            CompleteIcon,
            "Continue",
            handleContinueClick,
            false,
            false
          )}
          {renderActionButton(
            DeleteIcon,
            "Delete",
            handleDeleteClick,
            deleteMutation.isPending,
            deleteMutation.isError
          )}
        </>
      )}
      {referral.status === "SENT" && (
        <>
          {renderActionButton(SendIcon, "Send", handleSendClick, false, false)}
          {renderActionButton(
            PrintIcon,
            "Print",
            handleDownloadPdf,
            pdfMutation.isPending,
            pdfMutation.isError
          )}
          {renderActionButton(
            CloneIcon,
            "Clone",
            handleCloneClick,
            cloneMutation.isPending,
            cloneMutation.isError
          )}
          {renderActionButton(
            ArchiveIcon,
            referral.is_archived ? "Unarchive" : "Archive",
            handleArchiveClick,
            referral.is_archived
              ? unarchiveMutation.isPending
              : archiveMutation.isPending,
            referral.is_archived
              ? unarchiveMutation.isError
              : archiveMutation.isError,
            referral.is_archived
          )}
          {renderActionButton(
            CompleteIcon,
            "Complete",
            handleCompleteClick,
            completeMutation.isPending,
            completeMutation.isError
          )}
          {renderActionButton(ViewIcon, "View", handleViewClick, false, false)}
        </>
      )}
      {referral.status === "COMPLETED" && (
        <>
          {renderActionButton(SendIcon, "Send", handleSendClick, false, false)}
          {renderActionButton(
            PrintIcon,
            "Print",
            handleDownloadPdf,
            pdfMutation.isPending,
            pdfMutation.isError
          )}
          {renderActionButton(
            CloneIcon,
            "Clone",
            handleCloneClick,
            cloneMutation.isPending,
            cloneMutation.isError
          )}
          {renderActionButton(
            referral.is_archived ? ArchiveIcon : ArchiveIcon,
            referral.is_archived ? "Unarchive" : "Archive", // Same conditional logic for completed status
            handleArchiveClick,
            referral.is_archived
              ? unarchiveMutation.isPending
              : archiveMutation.isPending,
            referral.is_archived
              ? unarchiveMutation.isError
              : archiveMutation.isError
          )}
          {renderActionButton(ViewIcon, "View", handleViewClick, false, false)}
        </>
      )}
    </Stack>
  );
};

export default ActionButtons;
