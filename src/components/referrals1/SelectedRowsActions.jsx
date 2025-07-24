import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  CircularProgress,
  Button as MuiButton, // Import MUI Button
} from "@mui/material";
import { styled } from "@mui/material/styles"; // MUI's styled utility
import { useBulkAction } from "../../hooks/useBulkAction";
import { toast } from "react-toastify";
import DeleteIcon from "../../assets/icons/delete-icon.svg";
import PrintIcon from "../../assets/icons/print-icon.svg";
import ArchiveIcon from "../../assets/icons/archive-icon.svg";
import CompleteIcon from "../../assets/icons/complete-icon.svg";

// MUI Styled Button component
const StyledButton = styled(MuiButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: "#fff",
  fontSize: "18px",
  textTransform: "none",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  "& img": {
    width: 24,
    height: 24,
  },
  "&:hover": {
    opacity: 0.8,
  },
}));

const SelectedRowsActions = ({
  selectedRowIds,
  selectedRows = [],
  clearSelection,
}) => {
  const { performBulkAction } = useBulkAction();
  const [loadingAction, setLoadingAction] = useState(null); // Track the action being performed

  const hasDrafts = selectedRows.some((row) => row.status === "DRAFT");
  const hasNonDrafts = selectedRows.some(
    (row) =>
      row.status === "SENT" ||
      row.status === "BOOKED" ||
      row.status === "COMPLETED"
  );
  const hasMixedSelection = hasDrafts && hasNonDrafts;
  const allSentBookedCompleted = selectedRows.every(
    (row) =>
      row.status === "SENT" ||
      row.status === "BOOKED" ||
      row.status === "COMPLETED"
  );

  const handleBulkAction = async (action) => {
    if (selectedRowIds.length === 0) {
      toast.error("No referrals selected");
      return;
    }

    setLoadingAction(action); // Set loading state

    try {
      if (action === "delete-archive") {
        const draftIds = selectedRows
          .filter((row) => row.status === "DRAFT")
          .map((row) => row.id);
        const archiveIds = selectedRows
          .filter(
            (row) =>
              row.status === "SENT" ||
              row.status === "BOOKED" ||
              row.status === "COMPLETED"
          )
          .map((row) => row.id);

        if (draftIds.length > 0) {
          await performBulkAction("delete", draftIds);
          toast.success(`${draftIds.length} draft(s) deleted successfully.`);
        }

        if (archiveIds.length > 0) {
          await performBulkAction("archive", archiveIds);
          toast.success(
            `${archiveIds.length} Request(s) archived successfully.`
          );
        }
      } else {
        await performBulkAction(action, selectedRowIds);
        // toast.success(`Action "${action}" performed successfully.`);
      }

      clearSelection(); // Clear the selection after the action is performed
    } catch (error) {
      toast.error("An error occurred while performing the action.");
      console.error(error);
    } finally {
      setLoadingAction(null); // Reset loading state after action
    }
  };

  if (selectedRowIds.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.30)",
        borderRadius: "15px",
        padding: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "10px",
      }}
    >
      <Stack direction="row" spacing={1}>
        <Typography
          sx={{
            color: " #FFF",
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: "24px",
          }}
        >
          Actions for selected
        </Typography>
        <Typography
          sx={{
            color: " #67DE7F",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "24px",
          }}
        >
          ({selectedRowIds.length} Request
          {selectedRowIds.length > 1 ? "s" : ""} selected)
        </Typography>
      </Stack>

      <Stack direction={"row"}>
        {/* Delete Button */}
        {hasDrafts && !hasMixedSelection && (
          <StyledButton
            variant="text"
            onClick={() => handleBulkAction("delete")}
            endIcon={
              loadingAction === "delete" ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                <img src={DeleteIcon} alt="Delete Icon" />
              )
            }
          >
            Delete
          </StyledButton>
        )}

        {/* Archive Button (Only when not mixed) */}
        {!hasDrafts && allSentBookedCompleted && (
          <StyledButton
            variant="text"
            onClick={() => handleBulkAction("archive")}
            endIcon={
              loadingAction === "archive" ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                <img src={ArchiveIcon} alt="Archive Icon" />
              )
            }
          >
            Archive
          </StyledButton>
        )}

        {/* Mixed Selection: Show Delete/Archive Button */}
        {hasMixedSelection && (
          <StyledButton
            variant="text"
            onClick={() => handleBulkAction("delete-archive")}
            endIcon={
              loadingAction === "delete-archive" ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                <img src={DeleteIcon} alt="Delete/Archive Icon" />
              )
            }
          >
            Delete/Archive
          </StyledButton>
        )}

        {/* Other Actions for all Sent/Booked/Completed */}
        {!hasDrafts && allSentBookedCompleted && (
          <>
            <StyledButton
              variant="text"
              onClick={() => handleBulkAction("print")}
              endIcon={
                loadingAction === "print" ? (
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                  <img src={PrintIcon} alt="Print Icon" />
                )
              }
            >
              Print
            </StyledButton>

            <StyledButton
              variant="text"
              onClick={() => handleBulkAction("complete")}
              endIcon={
                loadingAction === "complete" ? (
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                  <img src={CompleteIcon} alt="Complete Icon" />
                )
              }
            >
              Complete
            </StyledButton>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default SelectedRowsActions;
