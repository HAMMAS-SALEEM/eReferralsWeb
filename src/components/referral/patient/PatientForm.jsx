import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Stack,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";

import CheckboxIcon from "../../../assets/icons/CheckboxIcon.svg";
import CheckedIconBlack from "../../../assets/icons/CheckedIconBlack.svg";
import "react-datepicker/dist/react-datepicker.css";
import "./PatientForm.css";
import CustomDatePicker from "../../ui/CustomDatePicker/CustomDatePicker";

// Styled Input
const CustomInputBase = styled(InputBase)(({ theme }) => ({
  borderRadius: 40,
  backgroundColor: "#fff",
  fontSize: 16,
  lineHeight: "24px",
  "& .MuiInputBase-input": {
    padding: "2px 10px",
  },
}));

const Label = styled(InputLabel)(({ theme }) => ({
  marginLeft: 10,
  color: "#9A9A9A",
  fontFamily: "Albert Sans",
  fontSize: "14px",
  lineHeight: "24px",
}));

const CustomFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 90,
    backgroundColor: "#fff",
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

const PatientForm = ({
  onSubmit,
  initialValues = {},
  isEditing = false,
  loading = false,
  apiErrors = {},
}) => {
  const [firstName, setFirstName] = useState(initialValues.first_name || "");
  const [surname, setSurname] = useState(initialValues.last_name || "");
  const [birthDate, setBirthDate] = useState(
    initialValues.birth_date ? dayjs(initialValues.birth_date).toDate() : null
  );
  const [gender, setGender] = useState(initialValues.gender || "U");
  const [address, setAddress] = useState(initialValues.address_1 || "");
  const [suburb, setSuburb] = useState(initialValues.city || "");
  const [state, setState] = useState(initialValues.state || "");
  const [postcode, setPostcode] = useState(initialValues.postcode || "");
  const [email, setEmail] = useState(initialValues.email || "");
  const [phoneNumber, setPhoneNumber] = useState(initialValues.phone || "");
  const [medicareNumber, setMedicareNumber] = useState(
    initialValues.medicare_no || ""
  );
  const [medicareExpireDate, setMedicareExpireDate] = useState(
    initialValues.medicare_expiry_date &&
      dayjs(initialValues.medicare_expiry_date, "MM/YYYY").isValid()
      ? dayjs(initialValues.medicare_expiry_date, "MM/YYYY").toDate()
      : null
  );

  const [consentGiven1, setConsentGiven1] = useState(false);
  const [consentGiven2, setConsentGiven2] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [formErrors, setFormErrors] = useState({});

  // Manual Validation
  const validateForm = () => {
    const errors = {};

    // Check required fields
    if (!firstName.trim()) errors.first_name = "First name is required";
    if (!surname.trim()) errors.last_name = "Surname is required";
    if (!birthDate) errors.birth_date = "Birth date is required";
    // if (!gender) errors.gender = "Gender is required";
    // if (!address.trim()) errors.address_1 = "Address is required";
    // if (!suburb.trim()) errors.city = "Suburb is required";
    // if (!state.trim()) errors.state = "State is required";
    // if (!postcode.trim()) errors.postcode = "Postcode is required";
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address";
    }
    if (!phoneNumber.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^(\+?61|0)[2-478]\d{8}$/.test(phoneNumber)) {
      errors.phone = "Please enter a valid Australian phone number";
    }

    // Medicare Expiry Date (Optional, but format must be validated if filled)
    if (
      medicareExpireDate &&
      !/^(0[1-9]|1[0-2])\/[0-9]{4}$/.test(
        dayjs(medicareExpireDate).format("MM/YYYY")
      )
    ) {
      errors.medicare_expiry_date = "Invalid Medicare expiry date format";
    }

    //Consent check already passed on HandleSubmit
    // if (!consentGiven1 || !consentGiven2) {
    //   errors.gives_consent = "Patient consent is required";
    //   toast.error("Please confirm patient full consent.");
    // }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!isEditing && (!consentGiven1 || !consentGiven2)) {
      toast.error("Please confirm patient full consent.");
      return;
    }

    // Validate form before submitting
    if (!validateForm()) return;

    const patientData = {
      first_name: firstName,
      last_name: surname,
      birth_date: birthDate ? dayjs(birthDate).format("YYYY-MM-DD") : null,
      gender,
      address_1: address,
      city: suburb,
      state,
      postcode,
      email,
      phone: phoneNumber,
      medicare_no: medicareNumber,
      medicare_expiry_date: medicareExpireDate
        ? dayjs(medicareExpireDate).format("MM/YYYY")
        : null,
      gives_consent:
        isEditing || (consentGiven1 && consentGiven2) ? true : false, //If editing, consent is already given
    };

    onSubmit(patientData);
  };

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container columnSpacing={4} rowSpacing={1}>
          {/* First Name */}
          <Grid item xs={12} sm={6}>
            <Label>
              First Name{" "}
              <Typography fontSize="14px" component="span" color="error">
                *
              </Typography>
            </Label>
            <CustomInputBase
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={loading}
              error={!!formErrors.first_name || !!apiErrors.first_name}
              endAdornment={
                <InputAdornment position="end">
                  <EditIcon
                    sx={{
                      color: "#000",
                      fontSize: "20px",
                      marginRight: "10px",
                    }}
                  />
                </InputAdornment>
              }
            />
            {(formErrors.first_name || apiErrors.first_name) && (
              <Typography color="error">
                {formErrors.first_name || apiErrors.first_name[0]}
              </Typography>
            )}
          </Grid>

          {/* Surname */}
          <Grid item xs={12} sm={6}>
            <Label>
              Surname
              <Typography fontSize="14px" component="span" color="error">
                *
              </Typography>
            </Label>
            <CustomInputBase
              fullWidth
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              disabled={loading}
              error={!!formErrors.last_name || !!apiErrors.last_name}
              endAdornment={
                <InputAdornment position="end">
                  <EditIcon
                    sx={{
                      color: "#000",
                      fontSize: "20px",
                      marginRight: "10px",
                    }}
                  />
                </InputAdornment>
              }
            />
            {(formErrors.last_name || apiErrors.last_name) && (
              <Typography color="error">
                {formErrors.last_name || apiErrors.last_name[0]}
              </Typography>
            )}
          </Grid>

          {/* Date of Birth */}
          <Grid item xs={12} sm={6}>
            <Label>
              Date of Birth{" "}
              <Typography fontSize="14px" component="span" color="error">
                *
              </Typography>
            </Label>
            <CustomDatePicker
              selectedDate={birthDate}
              onDateChange={setBirthDate}
              widthFull={true}
              icon={"edit"}
              isBirthDate={true}
              dateFormat="dd/MM/yyyy"
            />
          </Grid>

          {/* Gender */}
          <Grid item xs={12} sm={6}>
            <Label>Gender</Label>
            <CustomFormControl
              fullWidth
              error={!!formErrors.gender || !!apiErrors.gender}
            >
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                displayEmpty
              >
                <MenuItem value="F">Female</MenuItem>
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="O">Other</MenuItem>
                <MenuItem value="U">Unknown</MenuItem>
              </Select>
            </CustomFormControl>
            {(formErrors.gender || apiErrors.gender) && (
              <Typography color="error">
                {formErrors.gender || apiErrors.gender[0]}
              </Typography>
            )}
          </Grid>

          {/* Address */}
          <Grid item xs={12} sm={6}>
            <Label>Address</Label>
            <CustomInputBase
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={loading}
              error={!!formErrors.address_1 || !!apiErrors.address_1}
              endAdornment={
                <InputAdornment position="end">
                  <EditIcon
                    sx={{
                      color: "#000",
                      fontSize: "20px",
                      marginRight: "10px",
                    }}
                  />
                </InputAdornment>
              }
            />
            {(formErrors.address_1 || apiErrors.address_1) && (
              <Typography color="error">
                {formErrors.address_1 || apiErrors.address_1[0]}
              </Typography>
            )}
          </Grid>

          {/* Suburb */}
          <Grid item xs={12} sm={6}>
            <Label>Suburb</Label>
            <CustomInputBase
              fullWidth
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              disabled={loading}
              error={!!formErrors.city || !!apiErrors.city}
              endAdornment={
                <InputAdornment position="end">
                  <EditIcon
                    sx={{
                      color: "#000",
                      fontSize: "20px",
                      marginRight: "10px",
                    }}
                  />
                </InputAdornment>
              }
            />
            {(formErrors.city || apiErrors.city) && (
              <Typography color="error">
                {formErrors.city || apiErrors.city[0]}
              </Typography>
            )}
          </Grid>

          {/* State */}
          <Grid item xs={12} sm={6}>
            <Label>State</Label>
            <CustomFormControl
              fullWidth
              error={!!formErrors.state || !!apiErrors.state}
            >
              <Select
                value={state}
                onChange={(e) => setState(e.target.value)}
                displayEmpty
              >
                <MenuItem value="NSW">New South Wales</MenuItem>
                <MenuItem value="VIC">Victoria</MenuItem>
                <MenuItem value="QLD">Queensland</MenuItem>
                <MenuItem value="WA">Western Australia</MenuItem>
                <MenuItem value="SA">South Australia</MenuItem>
                <MenuItem value="TAS">Tasmania</MenuItem>
                <MenuItem value="ACT">Australian Capital Territory</MenuItem>
                <MenuItem value="NT">Northern Territory</MenuItem>
              </Select>
            </CustomFormControl>
            {(formErrors.state || apiErrors.state) && (
              <Typography color="error">
                {formErrors.state || apiErrors.state[0]}
              </Typography>
            )}
          </Grid>

          {/* Postcode */}
          <Grid item xs={12} sm={6}>
            <Label>Postcode</Label>
            <CustomInputBase
              type="text" // Change type to text to avoid the spinner
              fullWidth
              value={postcode}
              onChange={(e) => {
                // Ensure only numeric input
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setPostcode(value);
                }
              }}
              disabled={loading}
              error={!!formErrors.postcode || !!apiErrors.postcode}
              inputProps={{
                inputMode: "numeric", // Ensure numeric keyboard on mobile devices
                pattern: "\\d*", // Ensure only numeric input
              }}
              endAdornment={
                <InputAdornment position="end">
                  <EditIcon
                    sx={{
                      color: "#000",
                      fontSize: "20px",
                      marginRight: "10px",
                    }}
                  />
                </InputAdornment>
              }
            />

            {(formErrors.postcode || apiErrors.postcode) && (
              <Typography color="error">
                {formErrors.postcode || apiErrors.postcode[0]}
              </Typography>
            )}
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <Label>
              Email{" "}
              <Typography fontSize="14px" component="span" color="error">
                *
              </Typography>
            </Label>
            <CustomInputBase
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              error={!!formErrors.email || !!apiErrors.email}
              endAdornment={
                <InputAdornment position="end">
                  <EditIcon
                    sx={{
                      color: "#000",
                      fontSize: "20px",
                      marginRight: "10px",
                    }}
                  />
                </InputAdornment>
              }
            />
            {(formErrors.email || apiErrors.email) && (
              <Typography color="error">
                {formErrors.email || apiErrors.email[0]}
              </Typography>
            )}
          </Grid>

          {/* Phone Number */}
          <Grid item xs={12} sm={6}>
            <Label>
              Phone Number
              <Typography fontSize="14px" component="span" color="error">
                *
              </Typography>
            </Label>
            <CustomInputBase
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={loading}
              error={!!formErrors.phone || !!apiErrors.phone}
              endAdornment={
                <InputAdornment position="end">
                  <EditIcon
                    sx={{
                      color: "#000",
                      fontSize: "20px",
                      marginRight: "10px",
                    }}
                  />
                </InputAdornment>
              }
            />
            {(formErrors.phone || apiErrors.phone) && (
              <Typography color="error">
                {formErrors.phone || apiErrors.phone[0]}
              </Typography>
            )}
          </Grid>

          {/* Medicare Number */}
          <Grid item xs={12} sm={6}>
            <Label>Medicare Number</Label>
            <CustomInputBase
              type="text" // Change type to text to avoid the spinner
              fullWidth
              value={medicareNumber}
              onChange={(e) => {
                // Ensure only numeric input
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setMedicareNumber(value);
                }
              }}
              disabled={loading}
              error={!!apiErrors.medicare_no}
              inputProps={{
                inputMode: "numeric", // Ensure numeric keyboard on mobile devices
                pattern: "\\d*", // Ensure only numeric input
              }}
              endAdornment={
                <InputAdornment position="end">
                  <EditIcon
                    sx={{
                      color: "#000",
                      fontSize: "20px",
                      marginRight: "10px",
                    }}
                  />
                </InputAdornment>
              }
            />
            {apiErrors.medicare_no && (
              <Typography color="error">{apiErrors.medicare_no[0]}</Typography>
            )}
          </Grid>

          {/* Medicare Expiry Date */}
          <Grid item xs={12} sm={6}>
            <Label>Medicare Expiry Date</Label>
            {/* <CustomDatePicker selectedDate={medicareExpireDate} onDateChange={setMedicareExpireDate} /> */}
            <CustomDatePicker
              selectedDate={medicareExpireDate}
              onDateChange={setMedicareExpireDate}
              showMonthYearPicker
              dateFormat="MM/yyyy"
              widthFull={true}
              icon={"edit"}
              isExpiryDate={true}
              minDate={new Date()}
            />
          </Grid>
        </Grid>

        {/* Consent Checkbox */}
        <Stack
          direction="row"
          justifyContent={isEditing ? "flex-end" : "space-between"}
          alignItems={"flex-start"}
          sx={{ mt: 3 }}
        >
          {!isEditing && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={consentGiven1}
                    onChange={(e) => setConsentGiven1(e.target.checked)}
                    color="primary"
                    disabled={loading}
                    icon={<img src={CheckboxIcon} alt="unchecked" />}
                    checkedIcon={<img src={CheckedIconBlack} alt="checked" />}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#000",
                      fontWeight: 300,
                      lineHeight: "16px",
                    }}
                  >
                    I confirm that the patient has consented to the use and
                    storage of their details on the eRequests platform.
                  </Typography>
                }
              />
              <FormControlLabel
                sx={{
                  alignItems: "flex-start", // Aligns the checkbox and label at the start
                }}
                control={
                  <Checkbox
                    checked={consentGiven2}
                    onChange={(e) => setConsentGiven2(e.target.checked)}
                    color="primary"
                    disabled={loading}
                    icon={<img src={CheckboxIcon} alt="unchecked" />}
                    checkedIcon={<img src={CheckedIconBlack} alt="checked" />}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#000",
                      fontWeight: 300,
                      lineHeight: "16px",
                    }}
                  >
                    <strong>For Pathology Requests</strong> - Offer to Assign
                    and Reference to Section 20A: Medicare Agreement (Section
                    20A of the Health Insurance Act 1973). I confirm that the
                    patient has offered to assign their right to benefits to the
                    approved pathology practitioner who will render the
                    requested pathology service(s) and any eligible pathologist
                    determinable service(s) established as necessary by the
                    practitioner.
                  </Typography>
                }
              />
            </Box>
          )}

          {/* Submit Button */}
          <Box>
            <Button
              variant="greenGradient"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              size="medium"
              sx={{
                fontWeight: 600,
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
                minWidth: "fit-content",
              }}
            >
              {isEditing ? "Save Changes" : "Add Patient"}
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{ color: "#fff", marginLeft: 2 }}
                />
              )}
            </Button>
          </Box>
        </Stack>
      </LocalizationProvider>
    </Box>
  );
};

export default PatientForm;
