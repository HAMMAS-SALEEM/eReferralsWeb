import { useSelector } from "react-redux";
import {
  InputBase,
  Box,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Controller, useFormContext } from "react-hook-form";

const PractitionerSignature = ({ mode }) => {
  const doctorName = useSelector(
    (state) =>
      `${state.profile?.data?.doctor?.first_name} ${state.profile?.data?.doctor?.last_name}`
  );

  const referralType = useSelector((state) => state.referral.type);

  const { control } = useFormContext();
  const isReadOnly = mode === "view";
  const isRadiology = referralType === "RADIOLOGY";

  const formatDateForDisplay = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: "#000",
          fontFamily: "Albert Sans",
          fontSize: "24px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
        }}
      >
        Practitioner Signature
      </Typography>
      <Grid container alignItems="center" columnSpacing={5}>
        <Grid item xs={isRadiology ? 8 : 8}>
          <Typography variant="label">Doctor Signature</Typography>
          <Controller
            name="signed_date"
            control={control}
            render={({ field }) => {
              const isSigned = !!field.value;
              const label =
                mode === "create"
                  ? isSigned
                    ? `Electronically Signed By Dr. ${doctorName}`
                    : ""
                  : isSigned
                  ? `Electronically Signed By Dr. ${doctorName}`
                  : "";

              return (
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: isReadOnly ? "#C8C8C8" : "#FFF",
                    borderRadius: "43px",
                    padding: "0px 15px",
                    display: "flex",
                    alignItems: "center",
                    cursor: !isReadOnly ? "pointer" : "default",
                    border:
                      !isReadOnly && !isSigned
                        ? "2px dashed #90caf9"
                        : "2px solid transparent",
                    borderColor:
                      !isReadOnly && !isSigned ? "#90caf9" : "transparent",
                    transition: "box-shadow 0.18s, border-color 0.18s",
                    boxShadow:
                      !isReadOnly && !isSigned
                        ? "0 2px 10px 0 rgba(33,150,243,0.08)"
                        : "none",
                    "&:hover": {
                      boxShadow: !isReadOnly
                        ? "0 2px 12px 0 rgba(33,150,243,0.18)"
                        : "none",
                      borderColor:
                        !isReadOnly && !isSigned ? "#1976d2" : "transparent",
                    },
                    minHeight: "32px",
                  }}
                  onClick={() => {
                    if (!isReadOnly && !isSigned) {
                      const now = new Date();
                      const isoDate = now.toISOString();
                      field.onChange(isoDate);
                    }
                  }}
                >
                  <Typography
                    sx={{
                      color: !isReadOnly && !isSigned ? "#bdbdbd" : "#212121",
                      flex: 1,
                      fontSize: "18px",
                      userSelect: "none",
                    }}
                  >
                    {label ||
                      (!isReadOnly
                        ? "(Click here to electronically sign)"
                        : "Not signed")}
                  </Typography>
                  {!isReadOnly && (
                    <InputAdornment position="end" sx={{ ml: 1 }}>
                      <IconButton
                        tabIndex={-1}
                        disableRipple
                        sx={{
                          pointerEvents: "none",
                          color: isSigned ? "success.main" : "#888",
                        }}
                      >
                        <FileUploadIcon />
                      </IconButton>
                    </InputAdornment>
                  )}
                </Box>
              );
            }}
          />
        </Grid>

        <Grid item xs={isRadiology ? 4 : 4}>
          <Typography variant="label">Date</Typography>
          <Controller
            name="signed_date"
            control={control}
            render={({ field }) => (
              <InputBase
                value={
                  mode === "create" && !field.value
                    ? ""
                    : field.value
                    ? formatDateForDisplay(field.value)
                    : ""
                }
                readOnly
                fullWidth
                sx={{
                  backgroundColor: isReadOnly ? "#C8C8C8" : "#FFF",
                  borderRadius: "43px",
                  padding: "0px 15px",
                }}
                disabled={isReadOnly}
              />
            )}
          />
        </Grid>

        {isRadiology && (
          <Grid item xs={12} mt={2}>
            <Typography variant="body1">
              This request may be taken to a diagnostic imaging provider of the
              patient's choice.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PractitionerSignature;
