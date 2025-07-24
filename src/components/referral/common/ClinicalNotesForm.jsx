import React from "react";
import { Box, InputBase, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

const ClinicalNotesForm = ({ mode }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const isReadOnly = mode === "view";

  return (
    <Box
      mt={3}
      sx={{
        backgroundColor: isReadOnly ? "#c8c8c8" : "#FFF",
        borderRadius: "18px",
        padding: "10px",
        width: "100%",
      }}
    >
      <InputBase
        multiline
        rows={4}
        fullWidth
        {...register("clinical_notes")}
        disabled={isReadOnly}
        sx={{
          width: "100%",
          fontSize: "16px",
          color: "#333",
          "&.MuiInputBase-root": {
            padding: "10px 12px",
          },
        }}
      />
      {errors?.clinical_notes && (
        <Typography color="error" variant="body2">
          {errors.clinical_notes.message}
        </Typography>
      )}
    </Box>
  );
};

export default ClinicalNotesForm;
