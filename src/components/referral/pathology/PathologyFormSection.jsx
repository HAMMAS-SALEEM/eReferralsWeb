import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Grid,
  InputBase,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";
import UrgentReasonForm from "../common/UrgentReasonForm";
import SendResultsTo from "../common/SendResultsTo";
import ClinicalNotesForm from "../common/ClinicalNotesForm";
import CheckedBox from "../../../assets/icons/CheckedBox.svg";
import UncheckedBox from "../../../assets/icons/UncheckedBox.svg";
import DisabledCheckbox from "../../../assets/icons/DisabledCheckBox.svg";
import DisabledCheckedbox from "../../../assets/icons/DisabledCheckedBox.svg";

const PathologyFormSection = ({ mode }) => {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext();
  const isReadOnly = mode === "view";
  const [showWarning, setShowWarning] = useState(false);
  const testRequired = watch("test_required");
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
    <Box sx={{ borderRadius: 2 }}>
      {/* Test Required and Urgent Reason */}
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={5}>
          <Typography variant="h5">Test Required*</Typography>
        </Grid>
        <Grid item xs={7}>
          <UrgentReasonForm mode={mode} />
        </Grid>
      </Grid>

      {/* Test Required Input */}
      <Box
        mt={3}
        sx={{
          backgroundColor: isReadOnly ? "#c8c8c8" : "#fff",
          borderRadius: "18px",
          padding: "10px",
        }}
      >
        <InputBase
          multiline
          rows={4}
          maxRows={4}
          fullWidth
          {...register("test_required", {
            onChange: handleInputChange,
            maxLength: maxLength,
          })}
          disabled={isReadOnly}
          inputProps={{ maxLength: 300 }}
          sx={{
            width: "100%",
            fontSize: "16px",
            color: "#333",
            "&.MuiInputBase-root": {
              padding: "10px 12px",
            },
            maxHeight: "100px",
            overflowY: "hidden",
          }}
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
              if (testRequired && testRequired.length >= maxLength) {
                setShowWarning(true);
              }
            }}
            onBlur={() => setShowWarning(false)}
        />
        {errors.test_required && (
          <Typography color="error" variant="body2">
            {errors.test_required.message}
          </Typography>
        )}
      </Box>
      {showWarning && (
        <Typography color="#D5B60A" variant="body2" sx={{ mt: 1 }}>
        300 Characters within 4 Rows are the limit for optimal A4 PDF
        Printing.
        </Typography>
      )}

      {/* Clinical Notes and Self Determined */}
      <Grid container justifyContent="space-between" alignItems="center" mt={2}>
        <Grid item xs={6}>
          <Typography variant="h5">Clinical Notes*</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Controller
            name="is_self_determined"
            control={control}
            defaultValue={true}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={isReadOnly}
                    icon={
                      <img
                        src={isReadOnly ? DisabledCheckbox : UncheckedBox}
                        alt="Unchecked"
                      />
                    }
                    checkedIcon={
                      <img
                        src={isReadOnly ? DisabledCheckedbox : CheckedBox}
                        alt="Checked"
                      />
                    }
                  />
                }
                label="Self Determined (SD)"
              />
            )}
          />
        </Grid>
      </Grid>

      {/* Clinical Notes Input */}
      <ClinicalNotesForm mode={mode} />

      {/* Send Results To */}
      <SendResultsTo mode={mode} />
    </Box>
  );
};

export default PathologyFormSection;
