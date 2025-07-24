import React from "react";
import {
  Box,
  Stack,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import RoundCheckBox from "../../../assets/icons/RoundCheckBox.svg";
import RoundCheckedBox from "../../../assets/icons/RoundCheckedBox.svg";

const ServiceProviderFilters = ({
  selectedProximityFilter,
  setSelectedProximityFilter,
  onlyProvidersWithEmail,
  setOnlyProvidersWithEmail,
  selectedBillingOption,
  setSelectedBillingOption,
  favourites,
  setFavourites,
  ServiceProviderPage,
  serviceProviderType,
  setServiceProviderType,
}) => {
  const handleProximityChange = (value) => {
    if (selectedProximityFilter === value) {
      setSelectedProximityFilter(null);
    } else {
      setSelectedProximityFilter(value);
    }
  };

  const handlePaymentMethodChange = (value) => {
    if (selectedBillingOption === value) {
      setSelectedBillingOption(null);
    } else {
      setSelectedBillingOption(value);
    }
  };

  const handleServiceProviderTypeChange = (type) => {
    setServiceProviderType((prevType) => (prevType === type ? "" : type));
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"flex-start"}
      justifyContent={"space-between"}
      sx={{
        backgroundColor: ServiceProviderPage ? "white" : "#f4f4f4",
        borderRadius: 5,
        padding: "18px 30px 10px 30px",
      }}
    >
      {/* Filters Title as first item in the bar, with divider */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          pr: 4,
          mr: 2,
          borderRight: "2px solid #e0e0e0",
          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 700,
            lineHeight: "24px",
            color: "#343434",
            fontFamily: "Albert Sans",
            letterSpacing: 0.5,
            opacity: 0.85,
          }}
        >
          Filters
        </Typography>
      </Box>

      {/* Favourites Section - second */}
      <Box>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "24px",
            color: "#343434",
          }}
        >
          Favourites
        </Typography>
        <Stack spacing={-1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={favourites}
                onChange={() => setFavourites(!favourites)}
                icon={<img src={RoundCheckBox} alt="unchecked" />}
                checkedIcon={<img src={RoundCheckedBox} alt="checked" />}
                sx={{ padding: "9px 6px 9px 0px" }}
              />
            }
            label={
              <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
                My favorites
              </Typography>
            }
          />
        </Stack>
      </Box>

      {/* Proximity/Service Provider Section - third */}
      {!ServiceProviderPage ? (
        <Box>
          <Typography
            sx={{
              color: "#343434",
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "24px",
            }}
          >
            Proximity
          </Typography>
          <Stack spacing={-1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedProximityFilter === "near_clinic"}
                  onChange={() => handleProximityChange("near_clinic")}
                  icon={<img src={RoundCheckBox} alt="unchecked" />}
                  checkedIcon={<img src={RoundCheckedBox} alt="checked" />}
                  sx={{ padding: "9px 6px 9px 0px" }}
                />
              }
              label={
                <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
                  Near the Clinic (10km distance)
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedProximityFilter === "near_patient"}
                  onChange={() => handleProximityChange("near_patient")}
                  icon={<img src={RoundCheckBox} alt="unchecked" />}
                  checkedIcon={<img src={RoundCheckedBox} alt="checked" />}
                  sx={{ padding: "9px 6px 9px 0px" }}
                />
              }
              label={
                <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
                  Near the Patient (10km distance)
                </Typography>
              }
            />
          </Stack>
        </Box>
      ) : (
        <Box>
          <Typography
            sx={{
              color: "#343434",
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "24px",
            }}
          >
            Service Provider
          </Typography>
          <Stack spacing={-1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={serviceProviderType === "PATHOLOGY"}
                  onChange={() => handleServiceProviderTypeChange("PATHOLOGY")}
                  icon={<img src={RoundCheckBox} alt="unchecked" />}
                  checkedIcon={<img src={RoundCheckedBox} alt="checked" />}
                  sx={{ padding: "9px 6px 9px 0px" }}
                />
              }
              label={
                <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
                  Pathology
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={serviceProviderType === "RADIOLOGY"}
                  onChange={() => handleServiceProviderTypeChange("RADIOLOGY")}
                  icon={<img src={RoundCheckBox} alt="unchecked" />}
                  checkedIcon={<img src={RoundCheckedBox} alt="checked" />}
                  sx={{ padding: "9px 6px 9px 0px" }}
                />
              }
              label={
                <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
                  Radiology
                </Typography>
              }
            />
          </Stack>
        </Box>
      )}

      {/* Payment Method Section - fourth */}
      <Box>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "24px",
            color: "#343434",
          }}
        >
          Payment method
        </Typography>
        <Stack spacing={-1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedBillingOption === "MIXED_BILLING"}
                onChange={() => handlePaymentMethodChange("MIXED_BILLING")}
                icon={<img src={RoundCheckBox} alt="unchecked" />}
                checkedIcon={<img src={RoundCheckedBox} alt="checked" />}
                sx={{ padding: "9px 6px 9px 0px" }}
              />
            }
            label={
              <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
                Mixed Billing
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedBillingOption === "BULK_BILLING_ONLY"}
                onChange={() => handlePaymentMethodChange("BULK_BILLING_ONLY")}
                icon={<img src={RoundCheckBox} alt="unchecked" />}
                checkedIcon={<img src={RoundCheckedBox} alt="checked" />}
                sx={{ padding: "9px 6px 9px 0px" }}
              />
            }
            label={
              <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
                Bulk Billing Only
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedBillingOption === "FEES_APPLY"}
                onChange={() => handlePaymentMethodChange("FEES_APPLY")}
                icon={<img src={RoundCheckBox} alt="unchecked" />}
                checkedIcon={<img src={RoundCheckedBox} alt="checked" />}
                sx={{ padding: "9px 6px 9px 0px" }}
              />
            }
            label={
              <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
                Fees Apply
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedBillingOption === "NO_FEE"}
                onChange={() => handlePaymentMethodChange("NO_FEE")}
                icon={<img src={RoundCheckBox} alt="unchecked" />}
                checkedIcon={<img src={RoundCheckedBox} alt="checked" />}
                sx={{ padding: "9px 6px 9px 0px" }}
              />
            }
            label={
              <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
                No Fee
              </Typography>
            }
          />
        </Stack>
      </Box>

      {/* By Email Section - last, always checked by default */}
      <Box>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "24px",
            color: "#343434",
          }}
        >
          By email
        </Typography>
        <Stack spacing={-1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={true}
                disabled
                icon={<img src={RoundCheckBox} alt="unchecked" />}
                checkedIcon={<img src={RoundCheckedBox} alt="checked" />}
                sx={{ padding: "9px 6px 9px 0px" }}
              />
            }
            label={
              <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
                Show Only Providers with Email
              </Typography>
            }
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export default ServiceProviderFilters;
