import React from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import UncheckedBox from "../../../assets/icons/UncheckedBox.svg";
import CheckedBox from "../../../assets/icons/CheckedBox.svg";
import DisabledCheckbox from "../../../assets/icons/DisabledCheckBox.svg";
import DisabledCheckedbox from "../../../assets/icons/DisabledCheckedBox.svg";
const HospitalStatus = ({ mode }) => {
  const { control } = useFormContext();
  const isReadOnly = mode === "view";

  return (
    <Box
      sx={{
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Hospital Status
      </Typography>
      <FormControl component="fieldset">
        <Controller
          name="hospital_status"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              onChange={(e) => field.onChange(e.target.value)}
              value={field.value}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <FormControlLabel
                  value="DOES_NOT_APPLY"
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
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "18px" }}>
                      Does not apply
                    </Typography>
                  }
                />
                <Typography
                  component="legend"
                  sx={{ fontSize: "18px", color: "black", mb:1 }}
                >
                  Was or will the patient be, at the time of the service or
                  when the specimen is obtained:
                </Typography>
                <FormControlLabel
                  value="PRIVATE_PATIENT_IN_PRIVATE_HOSPITAL"
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
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "18px" }}>
                      A private patient in a private hospital or approved day
                      hospital facility
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="PRIVATE_PATIENT_IN_RECOGNISED_HOSPITAL"
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
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "18px" }}>
                      A private patient in a recognised hospital
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="PUBLIC_PATIENT_IN_RECOGNISED_HOSPITAL"
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
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "18px" }}>
                      A public patient in a recognised hospital
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="OUTPATIENT_OF_RECOGNISED_HOSPITAL"
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
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "18px" }}>
                      An outpatient of a recognised hospital
                    </Typography>
                  }
                />
              </Box>
            </RadioGroup>
          )}
        />
      </FormControl>
    </Box>
  );
};

export default HospitalStatus;
