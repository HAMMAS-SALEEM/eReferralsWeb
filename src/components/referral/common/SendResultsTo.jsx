import React from "react";
import { Typography, Box, InputBase } from "@mui/material";
import { useFormContext } from "react-hook-form";

const SendResultsTo = ({ mode }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const isReadOnly = mode === "view";

  return (
    <Box
      sx={{
        borderRadius: "18px",
      }}
    >
      {/* Title */}
      <Box my={2}>
        <Typography variant="h5">Send a Copy of the Results to</Typography>
      </Box>

      {/* InputBase for email addresses */}
      <InputBase
        multiline
        rows={5}
        fullWidth
        {...register("send_results_to")}
        disabled={isReadOnly}
        sx={{
          fontSize: "16px",
          color: "#333",
          "&.MuiInputBase-root": {
            padding: "10px 12px",
            borderRadius: "18px",
            backgroundColor: isReadOnly ? "#c8c8c8" : "#fff",
            border: "1px solid #e0e0e0",
          },
        }}
      />
      {errors?.send_results_to && (
        <Typography color="error" variant="body2">
          {errors.send_results_to.message}
        </Typography>
      )}
    </Box>
  );
};

export default SendResultsTo;
