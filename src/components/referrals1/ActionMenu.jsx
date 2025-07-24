import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  Typography,
  Button,
  Stack,
  Divider,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import {
  MoreVert,
  Send,
  Print,
  FolderCopy,
  Archive,
  CheckCircleOutlineOutlined,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ReferralService from "../../services/ReferralService";
import FileService from "../../services/FileService";
import { toast } from "react-toastify";
import ShowDetailsModal from "../referral/ShowDetailsModal";

const ActionMenu = ({ referral, history }) => {
  // State for managing the anchor element of the Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // State for managing the modal visibility
  const [openShowDetails, setOpenShowDetails] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Handlers for Menu open and close
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handlers for Show Details Modal open and close
  const handleOpenShowDetails = () => {
    setOpenShowDetails(true);
  };

  const handleCloseShowDetails = () => {
    setOpenShowDetails(false);
  };

  // Mutation for completing the referral
  const completeMutation = useMutation({
    mutationFn: (id) => ReferralService.markReferralCompleted(id),
    onSuccess: () => {
      toast.success("Request marked as completed successfully!");
      queryClient.invalidateQueries("referrals");
    },
    onError: () => {
      toast.error("Failed to mark referral as completed.");
    },
  });

  // Mutation for downloading PDF
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

  // Mutation for cloning the referral
  const cloneMutation = useMutation({
    mutationFn: (id) => ReferralService.cloneReferral(id),
    onSuccess: (response) => {
      const newReferralId = response?.data?.id;
      toast.success("Request cloned successfully!");
      queryClient.invalidateQueries("referrals");
      navigate(`/add-referral/continue-referral/${newReferralId}`);
    },
    onError: () => {
      toast.error("Failed to clone Request.");
    },
  });

  // Mutation for archiving or unarchiving the referral
  const archiveMutation = useMutation({
    mutationFn: (id) =>
      referral?.is_archived
        ? ReferralService.unarchiveReferral(id)
        : ReferralService.archiveReferral(id),
    onSuccess: () => {
      const action = referral?.is_archived ? "unarchived" : "archived";
      toast.success(`Request ${action} successfully!`);
      queryClient.invalidateQueries("referrals");
    },
    onError: () => {
      toast.error("Failed to update archive status.");
    },
  });

  // Mutation for marking referral as sent
  const sentMutation = useMutation({
    mutationFn: (id) => ReferralService.markReferralAsSent(id),
    onSuccess: () => {
      toast.success("Request marked as sent successfully!");
      queryClient.invalidateQueries("referrals");
    },
    onError: () => {
      toast.error("Failed to mark Request as sent.");
    },
  });

  // Action Handlers
  const handleCompleteClick = () => completeMutation.mutate(referral.id);
  const handleSentClick = () => sentMutation.mutate(referral.id);
  const handleDownloadPdf = () => pdfMutation.mutate(referral.id);
  const handleCloneClick = () => cloneMutation.mutate(referral.id);
  const handleArchiveClick = () => archiveMutation.mutate(referral.id);

  // Conditional rendering for "Mark as Completed" button
  const isCompletionAllowed =
    referral.status.toLowerCase() === "sent" ||
    referral.status.toLowerCase() === "booked";

  // Dynamic tooltip message based on referral status
  const getTooltipMessage = () => {
    if (referral.status.toLowerCase() === "completed") {
      return "This Request is already completed.";
    }
    return "Only sent and booked Request can be completed.";
  };

  return (
    <div>
      <Stack direction={"row"} spacing={2}>
        {/* Options Button */}
        <Button
          sx={{
            color: "#000",
            border: "1px solid #000",
            borderRadius: "24px",
            paddingInline: "20px",
          }}
          onClick={handleClick}
          endIcon={<MoreVert />}
        >
          Options
        </Button>

        <Button
          variant="blueGradient"
          endIcon={
            <Send
              fontSize="small"
              style={
                !isCompletionAllowed
                  ? { color: "#fff" }
                  : { color: "rgb(211, 211, 211, 0.7)" }
              }
            />
          }
          onClick={handleSentClick}
          disabled={sentMutation.isLoading || isCompletionAllowed} // Disable if mutation is in progress
        >
          {completeMutation.isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Mark as Sent"
          )}
        </Button>

        {/* Conditionally enabled "Mark as Completed" Button */}
        {isCompletionAllowed ? (
          <Button
            variant="greenGradient"
            endIcon={<CheckCircleOutlineOutlined />}
            onClick={handleCompleteClick}
            disabled={completeMutation.isLoading} // Disable if mutation is in progress
          >
            {completeMutation.isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Mark as completed"
            )}
          </Button>
        ) : (
          <Tooltip title={getTooltipMessage()}>
            <span>
              <Button
                variant="greenGradient"
                endIcon={<CheckCircleOutlineOutlined />}
                disabled // Disabled if status is not "sent" or "booked"
              >
                Mark as completed
              </Button>
            </span>
          </Tooltip>
        )}

        {/* Show Details Button */}
        <Button
          variant="blueGradient"
          endIcon={<KeyboardArrowRight />}
          onClick={handleOpenShowDetails}
        >
          Show details
        </Button>
      </Stack>

      {/* ShowDetailsModal Component */}
      <ShowDetailsModal
        openShowDetails={openShowDetails}
        handleCloseShowDetails={handleCloseShowDetails}
        referral={referral}
        history={history}
      />

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "12px",
            backgroundColor: "#555", // Matches your design
            padding: "10px 0",
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {/* Title inside the menu */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            px: 2,
            pb: 1,
            color: "#fff",
          }}
        >
          <Typography variant="h6">Actions</Typography>
          <IconButton size="small" disabled>
            <MoreVert style={{ color: "#fff" }} />
          </IconButton>
        </Stack>

        {/* Divider to separate title from menu items */}
        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

        {/* Send Action (Navigate to send referral page) */}
        <MenuItem
          onClick={() => navigate(`/add-referral/send-referral/${referral.id}`)}
        >
          <ListItemIcon>
            <Send fontSize="small" style={{ color: "#fff" }} />
          </ListItemIcon>
          <Typography variant="inherit" style={{ color: "#fff" }}>
            Send
          </Typography>
        </MenuItem>

        {/* Print Action (Download PDF) */}
        <MenuItem onClick={handleDownloadPdf} disabled={pdfMutation.isPending}>
          <ListItemIcon>
            {pdfMutation.isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <Print fontSize="small" style={{ color: "#fff" }} />
            )}
          </ListItemIcon>
          <Typography variant="inherit" style={{ color: "#fff" }}>
            Print
          </Typography>
        </MenuItem>

        {/* Clone Action (Clone referral) */}
        <MenuItem onClick={handleCloneClick} disabled={cloneMutation.isPending}>
          <ListItemIcon>
            {cloneMutation.isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <FolderCopy fontSize="small" style={{ color: "#fff" }} />
            )}
          </ListItemIcon>
          <Typography variant="inherit" style={{ color: "#fff" }}>
            Clone
          </Typography>
        </MenuItem>

        {/* Archive/Unarchive Action */}
        <MenuItem
          onClick={handleArchiveClick}
          disabled={archiveMutation.isPending}
        >
          <ListItemIcon>
            {archiveMutation.isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <Archive fontSize="small" style={{ color: "#fff" }} />
            )}
          </ListItemIcon>
          <Typography variant="inherit" style={{ color: "#fff" }}>
            {referral?.is_archived ? "Unarchive" : "Archive"}
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ActionMenu;
