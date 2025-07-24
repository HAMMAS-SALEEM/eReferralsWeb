import React from "react";
import { Box, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import UncheckedBox from "../../../assets/icons/UncheckedBox.svg";
import CheckedBox from "../../../assets/icons/CheckedBox.svg";
import DisabledCheckbox from "../../../assets/icons/DisabledCheckBox.svg";
import DisabledCheckedbox from "../../../assets/icons/DisabledCheckedBox.svg";

const MedicareDetails = ({ mode, patient }) => {
  const { watch, control } = useFormContext();
  const isReadOnly = mode === "view";

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Medicare Details
      </Typography>

      {/* Medicare number and expiry */}
      <Box sx={{ display: "flex", gap: "16px" }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="label">Medicare Number</Typography>
          <Typography
            variant="body1"
            sx={{
              height: "28px",
              lineHeight: "28px",
              pl: "10px",
              borderRadius: "15px",
              bgcolor: "#C8C8C8",
            }}
          >
            {patient?.medicare_no}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="label">Expiry Date</Typography>
          <Typography
            variant="body1"
            sx={{
              height: "28px",
              lineHeight: "28px",
              pl: "10px",
              borderRadius: "15px",
              bgcolor: "#C8C8C8",
            }}
          >
            {patient?.medicare_expiry_date || ""}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <FormControlLabel
          control={
            <Controller
              name="has_pension"
              control={control}
              render={({ field }) => (
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
              )}
            />
          }
          label={<Typography sx={{ fontSize: "18px" }}>Pension</Typography>}
        />
        <FormControlLabel
          control={
            <Controller
              name="has_healthcare_card"
              control={control}
              render={({ field }) => (
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
              )}
            />
          }
          label={
            <Typography sx={{ fontSize: "18px" }}>Health Care Card</Typography>
          }
        />
        <FormControlLabel
          control={
            <Controller
              name="has_dva"
              control={control}
              render={({ field }) => (
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
              )}
            />
          }
          label={<Typography sx={{ fontSize: "18px" }}>DVA</Typography>}
        />
      </Box>

      {/* My Health Record */}
      <Typography variant="h4" gutterBottom sx={{ mt: 1 }}>
        My Health Record
      </Typography>
      <FormControlLabel
        control={
          <Controller
            name="do_not_send_to_my_health_record"
            control={control}
            render={({ field }) => (
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
            )}
          />
        }
        label={
          <Typography sx={{ fontSize: "18px" }}>
            Do not send to My Health Record
          </Typography>
        }
      />
    </Box>
  );
};

export default MedicareDetails;
