import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ReferralService from "../services/ReferralService";
import FileService from "../services/FileService"; // Import the FileService for downloading PDFs

// Define all bulk actions in this hook
export const useBulkAction = () => {
  const queryClient = useQueryClient(); // Access the query client to invalidate queries
  let previousToastId = null; // Keep track of the previous toast ID

  // Create mutations for each action
  const deleteReferralMutation = useMutation({
    mutationFn: (id) => ReferralService.deleteReferral(id),
  });

  const archiveReferralMutation = useMutation({
    mutationFn: (id) => ReferralService.archiveReferral(id),
  });

  const completeReferralMutation = useMutation({
    mutationFn: (id) => ReferralService.markReferralCompleted(id),
  });

  const downloadReferralPdfMutation = useMutation({
    mutationFn: (id) => FileService.downloadReportPdf(id),
    onSuccess: (response, id) => {
      // Handle successful PDF download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Request-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
  });

  const performBulkAction = async (action, selectedRowIds) => {
    const total = selectedRowIds.length;
    let completed = 0;

    // Define a unique ID for the new toast
    const newToastId = "bulk-action-toast";

    // Dismiss the previous toast if it exists
    if (previousToastId && toast.isActive(previousToastId)) {
      toast.dismiss(previousToastId);
    }

    // Set the new toast as the current active toast
    previousToastId = newToastId;

    // Create a new toast or update the existing one with a custom ID
    toast.info(`Starting ${action} action...`, {
      toastId: newToastId,
      autoClose: false, // Keep it open initially
      progress: 0,
    });

    for (const id of selectedRowIds) {
      try {
        // Call different mutations based on the action type
        if (action === "delete") {
          await deleteReferralMutation.mutateAsync(id);
        } else if (action === "archive") {
          await archiveReferralMutation.mutateAsync(id);
        } else if (action === "complete") {
          await completeReferralMutation.mutateAsync(id);
        } else if (action === "print") {
          // Call the PDF download mutation for the print action
          await downloadReferralPdfMutation.mutateAsync(id);
        }

        // Update the progress in the existing toast
        completed++;
        toast.update(newToastId, {
          render: `${completed}/${total} Requests ${action}d`,
          progress: completed / total,
          autoClose: false, // Keep it open during the process
        });
      } catch (error) {
        // Update the existing toast with an error message
        toast.update(newToastId, {
          render: `Failed to ${action} Requests ${id}: ${error.message}`,
          type: "error",
          autoClose: 3000, // Close the toast automatically on error
        });
      }
    }

    // After the bulk action is completed, invalidate and refetch the table data (for non-print actions)
    if (action !== "print") {
      queryClient.invalidateQueries(["referrals"]);
    }

    // Final update to the toast when all actions are complete
    toast.update(newToastId, {
      render: `All selected Requests ${action}d successfully`,
      type: "success",
      autoClose: 3000, // Allow it to close after completion
    });
  };

  return { performBulkAction };
};
