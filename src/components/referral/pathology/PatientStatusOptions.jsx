import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  InputBase,
  Stack,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import UncheckedBox from "../../../assets/icons/UncheckedBox.svg";
import CheckedBox from "../../../assets/icons/CheckedBox.svg";
import DisabledCheckbox from "../../../assets/icons/DisabledCheckBox.svg";
import DisabledCheckedbox from "../../../assets/icons/DisabledCheckedBox.svg";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

dayjs.extend(customParseFormat);
const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 90,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiInputBase-input": {
    padding: "2px 10px",
  },
  "& .MuiSvgIcon-root": {
    color: "#000",
  },
}));

const formatDateToAustralian = (dateString) => {
  if (!dateString) return "N/A";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

const PatientStatusOptions = ({ mode }) => {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useFormContext();
  const isReadOnly = mode === "view";

  // Watch to observe the form values
  const isFasting = watch("is_fasting");
  const isNotFasting = watch("is_not_fasting");
  const isPregnant = watch("is_pregnant");
  const isOnHormoneTherapy = watch("is_on_hormone_therapy");
  const lnmp = watch("lnmp");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h5" gutterBottom>
          Patient Status
        </Typography>
        <Grid container spacing={2}>
          {/* Fasting Checkbox */}
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Controller
                  name="is_fasting"
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
              label={<Typography sx={{ fontSize: "18px" }}>Fasting</Typography>}
            />
          </Grid>

          {/* Not-fasting Checkbox */}
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Controller
                  name="is_not_fasting"
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
                <Typography sx={{ fontSize: "18px" }}>Non-fasting</Typography>
              }
            />
          </Grid>

          {/* Pregnant Checkbox */}
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Controller
                  name="is_pregnant"
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
                <Typography sx={{ fontSize: "18px" }}>Pregnant</Typography>
              }
            />
          </Grid>

          {/* Hormone Therapy Checkbox */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Controller
                  name="is_on_hormone_therapy"
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
                  Hormone therapy
                </Typography>
              }
            />
          </Grid>

          {/* Gestational Age Input */}
          <Grid item xs={12}>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <InputBase
                {...register("gestional_age", {
                  valueAsNumber: true,
                })}
                // type="number"
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
                // value={watch("gestional_age")}
                sx={{
                  backgroundColor: isReadOnly ? "#c8c8c8" : "#fff",
                  width: "100px",
                  fontSize: "16px",
                  borderRadius: "42px",
                  padding: "0px 10px",
                  marginTop: "8px",
                }}
              />
              <Typography variant="subtitle1">
                Gestational age (weeks)
              </Typography>
            </Stack>
            {errors.gestional_age && (
              <Typography color="error" variant="body2">
                {errors.gestional_age.message}
              </Typography>
            )}
          </Grid>

          {/* LNMP Input */}
          <Grid item xs={12}>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Controller
                name="lnmp"
                control={control}
                render={({ field }) => {
                  const { value, onChange } = field;
                  const dateValue = value ? dayjs(value) : null;
                  return (
                    <CustomDatePicker
                      value={dateValue}
                      onChange={(date) => {
                        const formattedDate = date
                          ? date.format("YYYY-MM-DD")
                          : null;
                        onChange(formattedDate);
                      }}
                      disabled={isReadOnly}
                      format="DD/MM/YYYY" // Australian format
                      views={["day", "month", "year"]}
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          sx: {
                            backgroundColor: isReadOnly ? "#c8c8c8" : "#fff",
                            width: "50%",
                            fontSize: "16px",
                            borderRadius: "42px",
                            padding: "0px 10px",
                            marginTop: "8px",
                          },
                        },
                      }}
                    />
                  );
                }}
              />

              <Typography variant="subtitle1">LNMP</Typography>
            </Stack>
            {errors.lnmp && (
              <Typography color="error" variant="body2">
                {errors.lnmp.message}
              </Typography>
            )}
          </Grid>

          {/* Allergies Input */}
          <Grid item xs={12}>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <InputBase
                multiline
                maxRows={4}
                inputProps={{ maxLength: 35 }}
                {...register("allergies")}
                disabled={isReadOnly}
                sx={{
                  backgroundColor: isReadOnly ? "#c8c8c8" : "#fff",
                  width: "80%",
                  fontSize: "16px",
                  borderRadius: "30px",
                  padding: "5px 10px",
                  marginTop: "8px",
                  alignItems: "flex-start",
                }}
              />
              <Typography variant="subtitle1">Allergies</Typography>
            </Stack>
            {errors.allergies && (
              <Typography color="error" variant="body2">
                {errors.allergies.message}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default PatientStatusOptions;
