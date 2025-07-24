import React from "react";
import { Box, Typography, Grid } from "@mui/material";

function capitalizeWords(str) {
  if (str === null || str === undefined) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

const ReferralDetailsCollapse = ({ referral }) => {
  return (
    <Box margin={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            padding={2}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              width: "100%",
              height: "120px",
              overflowY: "auto",
              scrollbarWidth: "none",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ whiteSpace: "normal" }}
            >
              {referral?.type?.toLowerCase() === "radiology"
                ? "Examination Required"
                : "Test Requested"}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                whiteSpace: "normal",
                overflowWrap: "break-word",
                wordBreak: "break-word", // Ensures long words break
                maxWidth: "100%",
              }}
            >
              {referral?.type?.toLowerCase() === "radiology"
                ? referral?.form?.examination_required
                  ? referral?.form?.examination_required
                  : referral.file
                  ? "As per attachment"
                  : "No additional notes"
                : referral?.form?.test_required
                ? referral?.form?.test_required
                : referral.file
                ? "As per attachment"
                : "No additional notes"}
            </Typography>
          </Box>
        </Grid>

        {/* Referral Notes Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Box
            padding={2}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              height: "120px",
              overflowY: "auto",
              scrollbarWidth: "none",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Notes
            </Typography>
            <Box
              sx={{
                whiteSpace: "normal",
                overflowWrap: "break-word",
                wordBreak: "break-word", // Ensures long words break
              }}
            >
              <Typography variant="body2">
                {referral?.form?.clinical_notes
                  ? referral?.form?.clinical_notes
                  : referral.file
                  ? "As per attachment"
                  : "No additional notes"}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Patient Details Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Box
            padding={2}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              height: "100%",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Patient Details
            </Typography>
            <Typography variant="body2">
              <strong>Full name:</strong>{" "}
              {`${referral.patient_data.first_name} ${referral.patient_data.last_name}`}
            </Typography>
            <Typography variant="body2">
              <strong>Date of birth:</strong>{" "}
              {new Date(referral.patient_data.birth_date).toLocaleDateString(
                "en-GB"
              )}
            </Typography>
            <Typography variant="body2">
              <strong>Phone number:</strong>{" "}
              {referral.patient_data.phone || "N/A"}
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong> {referral.patient_data.email || "N/A"}
            </Typography>
          </Box>
        </Grid>

        {/* Provider Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Box
            padding={2}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              height: "100%",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {referral.to_service_data?.type || "Provider"}
            </Typography>
            <Typography variant="body2">
              <strong>Name:</strong>{" "}
              {referral.to_service_data?.organisation?.name || "N/A"}
            </Typography>
            <Typography variant="body2">
              <strong>Phone:</strong>{" "}
              {referral.to_service_data?.organisation?.phone || "N/A"}
            </Typography>
            <Typography
              variant="body2"
              // sx={{ display: "flex", whiteSpace: "nowrap" }}
            >
              <strong>Address:</strong>{" "}
              {referral.to_service_data?.organisation
                ? `${referral.to_service_data?.organisation?.address_3}, 
                  ${capitalizeWords(
                    referral.to_service_data?.organisation?.city
                  )}, 
                  ${referral.to_service_data?.organisation?.state}, 
                  ${referral.to_service_data?.organisation?.postcode}`
                : "N/A"}
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong>{" "}
              {referral.to_service_data?.organisation?.ereferrals_email ||
                referral.to_service_data?.organisation?.email ||
                "N/A"}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReferralDetailsCollapse;
