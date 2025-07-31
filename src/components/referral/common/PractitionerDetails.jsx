import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import PractitionerSignature from "./PractitionerSignature";
import { InfoRounded } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";

const PractitionerDetails = ({
  register,
  setValue,
  profile,
  loading,
  mode,
  columns = 4,
  method,
}) => {
  const fullColumn = 12;
  const halfColumn = 6;
  console.log(profile)

  return (
    <Grid
      sx={{
        p: 2,
        borderRadius: "19px",
        background:
          "linear-gradient(270deg, rgba(103, 222, 127, 0.20) 0%, rgba(62, 137, 217, 0.20) 100%)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ display: "flex", alignItems: "start", fontWeight: "bold" }}
      >
        Practitioner Details
        <Tooltip title="Details editable from profile">
          <InfoRounded sx={{ ml: 0.5, height: "20px", width: "20px" }} />
        </Tooltip>
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : profile ? (
        <>
          <Grid container spacing={1}>
            {/* Practitioner Full Name */}
            <Grid
              item
              xs={
                (mode === "view" && method === "file") ||
                profile.type === "RADIOLOGY"
                  ? 9
                  : 12
              }
            >
              <Grid container spacing={1}>
                <Grid item xs={columns === 4 ? halfColumn : fullColumn}>
                  <Typography variant="label">
                    Practitioner Full Name *
                  </Typography>
                  <Typography
                    sx={{
                      height: "28px",
                      lineHeight: "28px",
                      pl: "10px",
                      borderRadius: "15px",
                      bgcolor: "#C8C8C8",
                    }}
                  >
                    {profile?.doctor?.first_name} {profile?.doctor?.last_name}
                  </Typography>
                </Grid>
                <Grid item xs={columns === 4 ? halfColumn : fullColumn}>
                  <Typography variant="label">Provider Number</Typography>
                  <Typography
                    sx={{
                      height: "28px",
                      lineHeight: "28px",
                      pl: "10px",
                      borderRadius: "15px",
                      bgcolor: "#C8C8C8",
                    }}
                  >
                    {profile?.doctor?.provider_no}
                  </Typography>
                </Grid>

                {/* Clinic Name */}
                <Grid item xs={fullColumn}>
                  <Typography variant="label">Clinic Name</Typography>
                  <Typography
                    sx={{
                      height: "28px",
                      lineHeight: "28px",
                      pl: "10px",
                      borderRadius: "15px",
                      bgcolor: "#C8C8C8",
                    }}
                  >
                    {profile?.organisation?.name}
                  </Typography>
                </Grid>

                {/* Address, Suburb, State, Postcode */}
                <Grid item xs={columns === 4 ? 4 : 12}>
                  <Typography variant="label">Address</Typography>
                  <Typography
                    sx={{
                      height: "28px",
                      lineHeight: "28px",
                      pl: "10px",
                      borderRadius: "15px",
                      bgcolor: "#C8C8C8",
                    }}
                  >
                    {profile?.organisation?.address_1}
                  </Typography>
                </Grid>
                <Grid item xs={columns === 4 ? 4 : 4}>
                  <Typography variant="label">Suburb</Typography>
                  <Typography
                    sx={{
                      height: "28px",
                      lineHeight: "28px",
                      pl: "10px",
                      borderRadius: "15px",
                      bgcolor: "#C8C8C8",
                    }}
                  >
                    {profile?.organisation?.city}
                  </Typography>
                </Grid>
                <Grid item xs={columns === 4 ? 2 : 4}>
                  <Typography variant="label">State</Typography>
                  <Typography
                    sx={{
                      height: "28px",
                      lineHeight: "28px",
                      pl: "10px",
                      borderRadius: "15px",
                      bgcolor: "#C8C8C8",
                    }}
                  >
                    {profile?.organisation?.state}
                  </Typography>
                </Grid>
                <Grid item xs={columns === 4 ? 2 : 4}>
                  <Typography variant="label">Postcode</Typography>
                  <Typography
                    sx={{
                      height: "28px",
                      lineHeight: "28px",
                      pl: "10px",
                      borderRadius: "15px",
                      bgcolor: "#C8C8C8",
                    }}
                  >
                    {profile?.organisation?.postcode}
                  </Typography>
                </Grid>

                {/* Email and Phone */}
                <Grid item xs={halfColumn}>
                  <Typography variant="label">Email</Typography>
                  <Typography
                    sx={{
                      height: "28px",
                      lineHeight: "28px",
                      pl: "10px",
                      borderRadius: "15px",
                      bgcolor: "#C8C8C8",
                    }}
                  >
                    {profile?.organisation?.email}
                  </Typography>
                </Grid>
                <Grid item xs={halfColumn}>
                  <Typography variant="label">Phone Number *</Typography>
                  <Typography
                    sx={{
                      height: "28px",
                      lineHeight: "28px",
                      pl: "10px",
                      borderRadius: "15px",
                      bgcolor: "#C8C8C8",
                    }}
                  >
                    {profile?.organisation?.phone}
                  </Typography>
                </Grid>
                <Grid item xs={halfColumn}>
                  <Typography variant="label">Fax</Typography>
                  <Typography
                    sx={{
                      height: "28px",
                      lineHeight: "28px",
                      pl: "10px",
                      borderRadius: "15px",
                      bgcolor: "#C8C8C8",
                    }}
                  >
                    {profile?.organisation?.fax}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Practitioner Signature */}
          {method !== "file" && (
            <PractitionerSignature
              mode={mode}
              register={register}
              setValue={setValue}
            />
          )}
        </>
      ) : (
        <Typography>No practitioner details available</Typography>
      )}
    </Grid>
  );
};

export default PractitionerDetails;
