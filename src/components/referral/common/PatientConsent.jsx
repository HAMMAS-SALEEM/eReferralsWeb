import React from "react";
import { Checkbox, FormControlLabel, Typography, Box } from "@mui/material";
import { Margin, MarginTwoTone } from "@mui/icons-material";

//this is not used at moment, we have coded on Addpatient

const PatientConsent = ({ patientConsent, setPatientConsent }) => {
  const handleConsentChange = (event) => {
    setPatientConsent(event.target.checked);
  };

  return (
    <Box sx={{display:"flex", justifyContent:"start", alignItems:"start"}}>
      <FormControlLabel
      sx={{display:"flex", justifyContent:"start", alignItems:"start"}}
        control={
          <Checkbox
            checked={!!patientConsent} // Ensure controlled component by setting an initial value
            onChange={handleConsentChange}
            color="primary"
            sx={{marginTop:"-5px"}}
          />
        }
        label={
          <Typography variant="body1">
            Offer to Assign and Reference to Section 20A An example of a Section
            20A offer to Assign is as follows: Medicare Agreement (Section 20A
            of the Health Insurance act 1973) I offer to assign my right to
            benefits to the approved pathology practitioner who will render the
            requested pathology services and any eligible pathologist
            determinable services established as necessary by the practitioner.
          </Typography>
        }
      />
    </Box>
  );
};

export default PatientConsent;
