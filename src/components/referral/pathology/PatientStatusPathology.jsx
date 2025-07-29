import { useDispatch, useSelector } from "react-redux";
import {
  setLnmp,
  setAllergies,
  setIsFasting,
  setIsNotFasting,
  setIsPregnant,
  setIsOnHormoneTherapy,
  setTestRequired,
  setClinicalNotes,
  setSendResultsToEmails,
  setPaymentMethod,
  setHospitalStatus,
} from "../../../store/slices/referralSlice1";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";

const PatientStatusPathology = () => {
  const dispatch = useDispatch();

  const {
    lnmp,
    allergies,
    is_fasting,
    is_not_fasting,
    is_pregnant,
    is_on_hormone_therapy,
    test_required,
    clinical_notes,
    send_results_to,
    payment_method,
    hospital_status,
  } = useSelector((state) => state.referral.form);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Patient Status
      </Typography>

      <Grid container spacing={2}>
        {/* Fasting Checkbox */}
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={is_fasting}
                onChange={(e) => dispatch(setIsFasting(e.target.checked))}
                color="primary"
              />
            }
            label="Fasting"
          />
        </Grid>

        {/* Not-Fasting Checkbox */}
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={is_not_fasting}
                onChange={(e) => dispatch(setIsNotFasting(e.target.checked))}
                color="primary"
              />
            }
            label="Not Fasting"
          />
        </Grid>

        {/* LNMP Text Input */}
        <Grid item xs={6}>
          <TextField
            label="LNMP"
            variant="outlined"
            fullWidth
            value={lnmp}
            onChange={(e) => dispatch(setLnmp(e.target.value))}
          />
        </Grid>

        {/* Allergies Text Input */}
        <Grid item xs={6}>
          <TextField
            label="Allergies"
            variant="outlined"
            fullWidth
            value={allergies}
            onChange={(e) => dispatch(setAllergies(e.target.value))}
          />
        </Grid>

        {/* Pregnant Checkbox */}
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={is_pregnant}
                onChange={(e) => dispatch(setIsPregnant(e.target.checked))}
                color="primary"
              />
            }
            label="Pregnant"
          />
        </Grid>

        {/* Hormone Therapy Checkbox */}
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={is_on_hormone_therapy}
                onChange={(e) =>
                  dispatch(setIsOnHormoneTherapy(e.target.checked))
                }
                color="primary"
              />
            }
            label="Hormone Therapy"
          />
        </Grid>

        {/* Test Required Multiline Text Input */}
        <Grid item xs={12}>
          <TextField
            label="Test Required"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={test_required}
            onChange={(e) => dispatch(setTestRequired(e.target.value))}
          />
        </Grid>

        {/* Clinical Notes Multiline Text Input */}
        <Grid item xs={12}>
          <TextField
            label="Clinical Notes"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={clinical_notes}
            onChange={(e) => dispatch(setClinicalNotes(e.target.value))}
          />
        </Grid>

        {/* Send a Copy of the Results to Multiline Text Input */}
        <Grid item xs={12}>
          <TextField
            label="Send a Copy of the Results to"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={send_results_to}
            onChange={(e) => dispatch(setSendResultsToEmails(e.target.value))}
          />
        </Grid>

        {/* Payment Method Radio Buttons (styled like checkboxes) */}
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Payment Method</FormLabel>
            <RadioGroup
              aria-label="payment method"
              name="payment-method"
              value={payment_method}
              onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
            >
              <FormControlLabel
                value="BULK_BILL"
                control={<Radio />}
                label="Bulk Bill"
              />
              <FormControlLabel
                value="PRIVATE"
                control={<Radio />}
                label="Private"
              />
              <FormControlLabel
                value="SCHEDULE_FEE"
                control={<Radio />}
                label="Schedule Fee"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* Hospital Status Radio Buttons (styled like checkboxes) */}
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Hospital Status</FormLabel>
            <RadioGroup
              aria-label="hospital status"
              name="hospital-status"
              value={hospital_status}
              onChange={(e) => dispatch(setHospitalStatus(e.target.value))}
            >
              <FormControlLabel
                value="DOES_NOT_APPLY"
                control={<Radio />}
                label="Does not apply"
              />
              <FormControlLabel
                value="PRIVATE_PATIENT_DAY_HOSPITAL"
                control={<Radio />}
                label="A private patient in a private hospital or approved day hospital facility"
              />
              <FormControlLabel
                value="PRIVATE_PATIENT_RECOGNISED_HOSPITAL"
                control={<Radio />}
                label="A private patient in a recognised hospital"
              />
              <FormControlLabel
                value="PUBLIC_PATIENT_RECOGNISED_HOSPITAL"
                control={<Radio />}
                label="A public patient in a recognised hospital"
              />
              <FormControlLabel
                value="OUTPATIENT_RECOGNISED_HOSPITAL"
                control={<Radio />}
                label="An outpatient of a recognised hospital"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientStatusPathology;
