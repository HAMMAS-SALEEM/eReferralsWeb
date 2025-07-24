import React from "react";
import {
  Checkbox,
  FormControlLabel,
  Box,
  InputBase,
  Typography,
  Stack,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import UncheckedBox from "../../../assets/icons/UncheckedBox.svg";
import CheckedBox from "../../../assets/icons/CheckedBox.svg";
import DisabledCheckbox from "../../../assets/icons/DisabledCheckBox.svg";
import DisabledCheckedbox from "../../../assets/icons/DisabledCheckedBox.svg";

const UrgentReasonForm = ({ mode }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const isReadOnly = mode === "view";

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={6}>
      <Controller
        name="is_urgent"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            label="Urgent"
            labelPlacement="start"
            control={
              <Checkbox
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
                checked={field.value || false}
                onChange={(e) => field.onChange(e.target.checked)}
                disabled={isReadOnly}
              />
            }
          />
        )}
      />

      {/* Urgent Reason Input */}

      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={1.5}
        sx={{ flex: 1 }}
      >
        <Typography>Reason</Typography>
        <InputBase
          {...register("urgent_reason")}
          disabled={isReadOnly}
          sx={{
            backgroundColor: isReadOnly ? "#C8C8C8" : "#fff",
            padding: "0px 25px",
            borderRadius: "30px",
            border: "none",
            width: "100%",
            maxHeight: "40px",
            fontSize: "16px",
            fontFamily: "sans-serif",
            color: "#333",
          }}
        />
      </Stack>

      {errors.urgent_reason && (
        <Typography color="error" variant="body2">
          {errors.urgent_reason.message}
        </Typography>
      )}
    </Stack>
  );
};

export default UrgentReasonForm;
