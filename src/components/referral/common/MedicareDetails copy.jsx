import React from "react";
import {
  Grid,
  TextField,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPatient } from "../../../store/slices/patientSlice1";
import { toggleDoNotSendToMyHealthRecord } from "../../../store/slices/referralSlice1";

const MedicareDetails = () => {
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient);
  const referral = useSelector((state) => state.referral);

  const handlePensionChange = (event) => {
    dispatch(setPatient({ ...patient, has_pension: event.target.checked }));
  };

  const handleHealthCareCardChange = (event) => {
    dispatch(
      setPatient({ ...patient, has_healthcare_card: event.target.checked })
    );
  };

  const handleDvaChange = (event) => {
    dispatch(setPatient({ ...patient, has_dva: event.target.checked }));
  };

  const handleDoNotSendToMyHealthRecordChange = (event) => {
    dispatch(toggleDoNotSendToMyHealthRecord(event.target.checked));
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Medicare Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Medicare Number"
            variant="outlined"
            fullWidth
            value={patient.medicare_no || ""}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Expiry Date"
            variant="outlined"
            fullWidth
            value={patient.medicare_expiry_date || ""}
            disabled
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={patient.has_pension || false}
              onChange={handlePensionChange}
              color="primary"
            />
          }
          label="Pension"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={patient.has_healthcare_card || false}
              onChange={handleHealthCareCardChange}
              color="primary"
            />
          }
          label="Health Care Card"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={patient.has_dva || false}
              onChange={handleDvaChange}
              color="primary"
            />
          }
          label="DVA"
        />
      </Box>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        My Health Record
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={referral.do_not_send_to_my_health_record || false}
            onChange={handleDoNotSendToMyHealthRecordChange}
            color="primary"
          />
        }
        label="Do not send to My Health Record"
      />
    </Box>
  );
};

export default MedicareDetails;
