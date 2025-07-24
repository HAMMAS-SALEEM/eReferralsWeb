import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  FormControlLabel,
  InputBase,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import UncheckedBox from "../../../assets/icons/UncheckedBox.svg";
import CheckedBox from "../../../assets/icons/CheckedBox.svg";
import DisabledCheckbox from "../../../assets/icons/DisabledCheckBox.svg";
import DisabledCheckedbox from "../../../assets/icons/DisabledCheckedBox.svg";

const PatientStatusRadiology = ({ mode }) => {
  const { control } = useFormContext();
  const isReadOnly = mode === "view";

  // Function to handle deselection logic
  const handleRadioClick = (field, currentValue, newValue) => {
    if (currentValue === newValue) {
      field.onChange(null);
    } else {
      field.onChange(newValue);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Stack spacing={2}>
        {/* Contrast Allergy Section */}
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              sx={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#000",
                "&.Mui-focused": { color: "#000" },
              }}
            >
              Contrast Allergy
            </FormLabel>
            <Controller
              name="has_contrast_allergy"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  row
                  value={field.value === null ? "" : field.value}
                >
                  <FormControlLabel
                    value={false}
                    control={
                      <Radio
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
                        disabled={isReadOnly}
                        onClick={() =>
                          handleRadioClick(field, field.value, false)
                        }
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "18px" }}>No</Typography>
                    }
                  />
                  <FormControlLabel
                    value={true}
                    control={
                      <Radio
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
                        disabled={isReadOnly}
                        onClick={() =>
                          handleRadioClick(field, field.value, true)
                        }
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "18px" }}>Yes</Typography>
                    }
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
        </Grid>

        {/* Renal Impairment Section */}
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              sx={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#000",
                "&.Mui-focused": { color: "#000" },
              }}
            >
              Renal Impairment
            </FormLabel>
            <Stack direction={"row"} spacing={2} alignItems="center">
              <Controller
                name="has_renal_impairment"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    row
                    value={field.value === null ? "" : field.value}
                  >
                    <FormControlLabel
                      value={false}
                      control={
                        <Radio
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
                          disabled={isReadOnly}
                          onClick={() =>
                            handleRadioClick(field, field.value, false)
                          }
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: "18px" }}>No</Typography>
                      }
                    />
                    <FormControlLabel
                      value={true}
                      control={
                        <Radio
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
                          disabled={isReadOnly}
                          onClick={() =>
                            handleRadioClick(field, field.value, true)
                          }
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: "18px" }}>Yes</Typography>
                      }
                    />
                  </RadioGroup>
                )}
              />
              {/* eGFR Field */}
            </Stack>
            <Stack direction={"row"} spacing={2} mt={1} alignItems="center">
              <Typography variant="subtitle1">eGFR</Typography>
              <InputBase
                {...control.register("egfr", {
                  valueAsNumber: true,
                })}
                placeholder=""
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 15,
                }}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                disabled={isReadOnly}
                sx={{
                  backgroundColor: `${isReadOnly ? "#c8c8c8" : "#fff"}`,
                  minWidth: "20px",
                  width: "150px",
                  fontSize: "16px",
                  borderRadius: "40px",
                  padding: "5px 10px",
                  marginLeft: "10px",
                }}
              />
            </Stack>
          </FormControl>
        </Grid>

        {/* Pregnant Section */}
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              sx={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#000",
                "&.Mui-focused": { color: "#000" },
              }}
            >
              Pregnant
            </FormLabel>
            <Controller
              name="is_pregnant"
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field} value={field.value || ""}>
                  <FormControlLabel
                    value="NO"
                    control={
                      <Radio
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
                        disabled={isReadOnly}
                        onClick={() =>
                          handleRadioClick(field, field.value, "NO")
                        }
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "18px" }}>No</Typography>
                    }
                  />
                  <FormControlLabel
                    value="YES"
                    control={
                      <Radio
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
                        disabled={isReadOnly}
                        onClick={() =>
                          handleRadioClick(field, field.value, "YES")
                        }
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "18px" }}>Yes</Typography>
                    }
                  />
                  <FormControlLabel
                    value="UNSURE"
                    control={
                      <Radio
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
                        disabled={isReadOnly}
                        onClick={() =>
                          handleRadioClick(field, field.value, "UNSURE")
                        }
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "18px" }}>Unsure</Typography>
                    }
                  />
                  <FormControlLabel
                    value="NA"
                    control={
                      <Radio
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
                        disabled={isReadOnly}
                        onClick={() =>
                          handleRadioClick(field, field.value, "NA")
                        }
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "18px" }}>
                        Not Applicable
                      </Typography>
                    }
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
        </Grid>
      </Stack>
    </Box>
  );
};

export default PatientStatusRadiology;
