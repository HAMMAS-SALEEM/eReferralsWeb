import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, InputBase, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import UrgentReasonForm from "../common/UrgentReasonForm";
import SendResultsTo from "../common/SendResultsTo";
import ClinicalNotesForm from "../common/ClinicalNotesForm";

const RadiologyFormSection = ({ mode, register, errors }) => {
  const [showWarning, setShowWarning] = useState(false);
  const { watch } = useFormContext();
  const examinationRequired = watch("examination_required");
  const maxRows = 4;
  const maxLength = 300;

  const handleInputChange = (e) => {
    const text = e.target.value;
    const rowCount = text.split("\n").length;

    if (text.length >= maxLength || rowCount > maxRows) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  };

  return (
    <Box sx={{ p: 2, borderRadius: 2 }}>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item xs={5}>
          <Typography variant="h5">Examination Required*</Typography>
        </Grid>
        <Grid item xs={7}>
          <UrgentReasonForm register={register} showLabel={false} mode={mode} />
        </Grid>
      </Grid>
      <Stack spacing={2} mt={2}>
        <Box
          sx={{
            backgroundColor: mode === "view" ? "#c8c8c8" : "#FFF",
            borderRadius: "18px",
            padding: "10px",
          }}
        >
          <InputBase
            multiline
            rows={4}
            maxRows={4}
            fullWidth
            inputProps={{ maxLength: 300 }}
            {...register("examination_required", {
              onChange: handleInputChange,
              maxLength: maxLength,
            })}
            sx={{
              width: "100%",
              fontSize: "16px",
              color: "#333",
              "&.MuiInputBase-root": {
                padding: "10px 12px",
              },
            }}
            disabled={mode === "view"}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const rowCount = e.target.value.split("\n").length;

                // Prevent new line if it exceeds max rows
                if (rowCount >= maxRows) {
                  setShowWarning(true);
                  e.preventDefault(); // Ensures Enter key does not create new line
                }
              }
            }}
            onFocus={() => {
              // Show warning if at max length on focus
              if (examinationRequired && examinationRequired.length >= maxLength) {
                setShowWarning(true);
              }
            }}
            onBlur={() => setShowWarning(false)}
          />
        </Box>
        {/* Show warning message if 300 character limit is reached */}
        {showWarning && (
          <Typography color="#D5B60A" variant="body2" sx={{ mt: 1 }}>
            300 Characters within 4 Rows are the limit for optimal A4 PDF
            Printing.
          </Typography>
        )}
        <Box>
          <Typography variant="h5">Clinical Notes*</Typography>
          <ClinicalNotesForm register={register} errors={errors} mode={mode} />
        </Box>
        {/* Pass register and errors to SendResultsTo */}
        <SendResultsTo register={register} errors={errors} mode={mode} />
      </Stack>
    </Box>
  );
};

export default RadiologyFormSection;
