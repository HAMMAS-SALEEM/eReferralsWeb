import React from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Typography,
  Checkbox,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import UncheckedBox from "../../../assets/icons/UncheckedBox.svg"; // Custom unchecked icon
import CheckedBox from "../../../assets/icons/CheckedBox.svg"; // Custom checked icon
import DisabledCheckbox from "../../../assets/icons/DisabledCheckBox.svg";
import DisabledCheckedbox from "../../../assets/icons/DisabledCheckedBox.svg";

const PaymentMethod = ({ mode }) => {
  const { control } = useFormContext();
  const isReadOnly = mode === "view";

  // Function to handle checkbox toggle behavior
  const handleCheckboxClick = (field, currentValue, newValue) => {
    if (currentValue === newValue) {
      field.onChange(""); // Deselect if clicked again
    } else {
      field.onChange(newValue); // Select the new value
    }
  };

  return (
    <Box
      sx={{
        mt: 4,
        padding: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <FormControl component="fieldset">
        <Controller
          name="payment_method"
          control={control}
          defaultValue={""} // No default selection
          render={({ field }) => (
            <>
              <FormControlLabel
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
                    checked={field.value === "BULK_BILL"}
                    onClick={() =>
                      handleCheckboxClick(field, field.value, "BULK_BILL")
                    }
                    disabled={isReadOnly}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "18px" }}>Bulk Bill</Typography>
                }
              />
              <FormControlLabel
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
                    checked={field.value === "PRIVATE"}
                    onClick={() =>
                      handleCheckboxClick(field, field.value, "PRIVATE")
                    }
                    disabled={isReadOnly}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "18px" }}>Private</Typography>
                }
              />
              <FormControlLabel
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
                    checked={field.value === "SCHEDULE_FEE"}
                    onClick={() =>
                      handleCheckboxClick(field, field.value, "SCHEDULE_FEE")
                    }
                    disabled={isReadOnly}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "18px" }}>
                    Schedule Fee
                  </Typography>
                }
              />
            </>
          )}
        />
      </FormControl>
    </Box>
  );
};

export default PaymentMethod;
