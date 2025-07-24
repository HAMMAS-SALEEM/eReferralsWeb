import React from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Divider,
  Typography,
  InputBase,
} from "@mui/material";
import { toast } from "react-toastify";

const ServiceProviderFilter = ({
  favourites,
  setFavourites,
  selectedUsedFilter,
  setSelectedUsedFilter,
  selectedBillingOption,
  setSelectedBillingOption,
  selectedProximityFilter,
  setSelectedProximityFilter,
  postcodes,
  customPostcode,
  setCustomPostcode,
}) => {
  const handleUsedFilterChange = (filter) => {
    if (selectedUsedFilter === filter) {
      setSelectedUsedFilter(null);
    } else {
      setSelectedUsedFilter(filter);
    }
  };

  const handleBillingOptionChange = (option) => {
    if (selectedBillingOption === option) {
      setSelectedBillingOption(null);
    } else {
      setSelectedBillingOption(option);
    }
  };

  const handleProximityFilterChange = (filter) => {
    if (filter === "near_clinic" && !postcodes?.clinic) {
      toast.error("Clinic postcode is not available.");
      return;
    } else if (filter === "near_patient" && !postcodes?.patient) {
      toast.error("Patient postcode is not available.");
      return;
    }

    if (selectedProximityFilter === filter) {
      setSelectedProximityFilter(null);
    } else {
      setSelectedProximityFilter(filter);
    }

    if (filter !== "near_postcode") {
      setCustomPostcode("");
    }
  };

  return (
    <Box
      sx={{
        padding: "8px 44px",
        display: "flex",
        justifyContent: "space-between",
        color: "#FFF",
        borderRadius: "15px",
        background: "rgba(0, 0, 0, 0.70)",
        boxShadow: "0px 0px 11.8px 0px rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(4.5px)",
        width: "100%",
      }}
    >
      <FormControl component="fieldset">
        <Typography
          variant="h6"
          sx={{
            color: "#67DE7F",
            fontFamily: "Albert Sans",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "24px",
            mb: 1,
          }}
        >
          Favourites
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={favourites}
                onChange={(e) => setFavourites(e.target.checked)}
                sx={{
                  color: "#FFF",
                  p: 0,
                }}
              />
            }
            label={
              <Typography
                sx={{
                  color: "#FFF",
                  fontFamily: "Albert Sans",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                My favorites
              </Typography>
            }
          />
        </FormGroup>
      </FormControl>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ borderColor: "#FFF", mx: 2 }}
      />

      <FormControl component="fieldset">
        <Typography
          variant="h6"
          sx={{
            color: "#67DE7F",
            fontFamily: "Albert Sans",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "24px",
            mb: 1,
          }}
        >
          Used
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedUsedFilter === "used_by_doctor"}
                onChange={() => handleUsedFilterChange("used_by_doctor")}
                sx={{ color: "#FFF", p: 0 }}
              />
            }
            label={
              <Typography
                sx={{
                  color: "#FFF",
                  fontFamily: "Albert Sans",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                Used by me
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedUsedFilter === "most_used_by_me"}
                onChange={() => handleUsedFilterChange("most_used_by_me")}
                sx={{ color: "#FFF", p: 0 }}
              />
            }
            label={
              <Typography
                sx={{
                  color: "#FFF",
                  fontFamily: "Albert Sans",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                Most Used by me
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedUsedFilter === "most_used_by_clinic"}
                onChange={() => handleUsedFilterChange("most_used_by_clinic")}
                sx={{ color: "#FFF", p: 0 }}
              />
            }
            label={
              <Typography
                sx={{
                  color: "#FFF",
                  fontFamily: "Albert Sans",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                Most Used by clinic
              </Typography>
            }
          />
        </FormGroup>
      </FormControl>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ borderColor: "#FFF", mx: 2 }}
      />
      <FormControl component="fieldset">
        <Typography
          variant="h6"
          sx={{
            color: "#67DE7F",
            fontFamily: "Albert Sans",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "24px",
            mb: 1,
          }}
        >
          Payment Method
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedBillingOption === "MIXED_BILLING"}
                onChange={() => handleBillingOptionChange("MIXED_BILLING")}
                sx={{ color: "#FFF", p: 0 }}
              />
            }
            label={
              <Typography
                sx={{
                  color: "#FFF",
                  fontFamily: "Albert Sans",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                Mixed Billing
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedBillingOption === "FEES_APPLY"}
                onChange={() => handleBillingOptionChange("FEES_APPLY")}
                sx={{ color: "#FFF", p: 0 }}
              />
            }
            label={
              <Typography
                sx={{
                  color: "#FFF",
                  fontFamily: "Albert Sans",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                Fees Apply
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedBillingOption === "NO_FEE"}
                onChange={() => handleBillingOptionChange("NO_FEE")}
                sx={{ color: "#FFF", p: 0 }}
              />
            }
            label={
              <Typography
                sx={{
                  color: "#FFF",
                  fontFamily: "Albert Sans",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                No Fee
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedBillingOption === "BULK_BILLING_ONLY"}
                onChange={() => handleBillingOptionChange("BULK_BILLING_ONLY")}
                sx={{ color: "#FFF", p: 0 }}
              />
            }
            label={
              <Typography
                sx={{
                  color: "#FFF",
                  fontFamily: "Albert Sans",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                Bulk Billing Only
              </Typography>
            }
          />
        </FormGroup>
      </FormControl>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ borderColor: "#FFF", mx: 2 }}
      />

      {/* Proximity Section */}
      <FormControl component="fieldset">
        <Typography
          variant="h6"
          sx={{
            color: "#67DE7F",
            fontFamily: "Albert Sans",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "24px",
            mb: 1,
          }}
        >
          Proximity
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedProximityFilter === "near_clinic"}
                onChange={() => handleProximityFilterChange("near_clinic")}
                sx={{ color: "#FFF", p: 0 }}
              />
            }
            label={
              <Typography
                sx={{
                  color: "#FFF",
                  fontFamily: "Albert Sans",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                Near the Clinic (10km distance)
              </Typography>
            }
          /> 
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedProximityFilter === "near_patient"}
                onChange={() => handleProximityFilterChange("near_patient")}
                sx={{ color: "#FFF", p: 0 }}
              />
            }
            label={
              <Typography
                sx={{
                  color: "#FFF",
                  fontFamily: "Albert Sans",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                Near the Patient (10km distance)
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedProximityFilter === "near_postcode"}
                onChange={() => handleProximityFilterChange("near_postcode")}
                sx={{ color: "#FFF", p: 0 }}
              />
            }
            label={
              <Box display="flex" alignItems="center">
                <Typography
                  sx={{
                    color: "#FFF",
                    fontFamily: "Albert Sans",
                    fontSize: "12px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    mr: 1,
                  }}
                >
                  Near the postcode
                </Typography>
                {/* Input Field */}
                <InputBase
                  placeholder="Postcode"
                  value={customPostcode}
                  onChange={(e) => setCustomPostcode(e.target.value)}
                  onClick={(e) => e.stopPropagation()} // Prevent checkbox toggle
                  disabled={selectedProximityFilter !== "near_postcode"}
                  sx={{
                    backgroundColor: "#FFF",
                    borderRadius: "4px",
                    padding: "0px 8px",
                    color: "#000",
                    width: "80px",
                    height: "30px",
                  }}
                  inputProps={{
                    maxLength: 4,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                />
              </Box>
            }
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default ServiceProviderFilter;
