import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Grid,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import LocationIconWhite from "../../../assets/icons/LocationIconWhite.svg";
import useFavouriteServiceProvider from "../../../hooks/useFavouriteServiceProvider";
import StarIconGray from "../../../assets/icons/StarIconGray.svg";
import GradientStarIcon from "../../../assets/icons/GradientStarIcon.svg";
import gmapIcon from "../../../assets/images/gmap.svg";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";

const dayLabels = {
  MONDAY: "Mon",
  TUESDAY: "Tue",
  WEDNESDAY: "Wed",
  THURSDAY: "Thu",
  FRIDAY: "Fri",
  SATURDAY: "Sat",
  SUNDAY: "Sun",
};

const firstColumnDays = ["MONDAY", "TUESDAY"];
const secondColumnDays = ["WEDNESDAY", "THURSDAY"];
const ThirdColumnDays = ["FRIDAY", "SATURDAY", "SUNDAY"];

const formatOpeningHours = (calendar) => {
  const hours = {
    MONDAY: "Closed",
    TUESDAY: "Closed",
    WEDNESDAY: "Closed",
    THURSDAY: "Closed",
    FRIDAY: "Closed",
    SATURDAY: "Closed",
    SUNDAY: "Closed",
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    return minute === "00" ? hour : `${hour}:${minute}`;
  };

  calendar?.open?.forEach((slot) => {
    slot.days.forEach((day) => {
      const fromTime = formatTime(slot.from_time);
      const toTime = formatTime(slot.to_time);
      hours[day] = `${fromTime} – ${toTime}`;
    });
  });

  return hours;
};

const formatBillingOption = (billingOption) => {
  return billingOption
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const SelectedProviderCard = ({ provider, onUnselect }) => {
  const organisation = provider?.organisation || {};
  const openingHours = formatOpeningHours(organisation?.calendar);
  const { isFavourite, isLoading, toggleFavourite } =
    useFavouriteServiceProvider(provider.id, provider.is_favourite);

  const formatAddress = () => {
    const { address_1, address_2, address_3, city, state, postcode } =
      organisation;
    return [address_3, capitalizeWords(city), state, postcode]
      .filter((part) => part)
      .join(", ");
  };

  const formatBilling = (billingOptions) => {
    if (!billingOptions || billingOptions.length === 0) return "N/A";
    return billingOptions
      .map((option) => {
        switch (option) {
          case "MIXED_BILLING":
            return "Mixed Billing";
          case "BULK_BILLING":
            return "Bulk Billing";
          case "PRIVATE":
            return "Private Billing";
          case "NO_BILLING":
            return "No Billing";
          case "FEES_APPLY":
            return "Fees Apply";
          default:
            return option;
        }
      })
      .join(", ");
  };

  const getOrgInitials = (name) => {
    if (!name) return "N/A";
    const words = name.split(" ");
    return words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
  };

  function capitalizeWords(str) {
    if (str === null) return "-";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return (
    <Box
      sx={{
        display: "flex",
        background:
          "linear-gradient(90deg, #2D6465 -12.67%, #3A806B -12.67%, #67DE7F 112.91%)",
        borderRadius: "15px",
        padding: "16px",
        alignItems: "start",
        boxShadow: "0px 0px 15px 0px rgba(0, 0, 0, 0.25)",
        width: "100%",
      }}
    >
      <Grid container columnGap={"1%"}>
        <Box>
          {organisation.latitude && organisation.longitude ? (
            <a
              href={`https://www.google.com/maps?q=${organisation.latitude},${organisation.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={gmapIcon}
                alt="Map Icon"
                style={{
                  borderRadius: "12px",
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  objectFit: "cover",
                  objectPosition: "right",
                }}
              />
            </a>
          ) : (
            <a
              href={`https://www.google.com/maps?q=${encodeURIComponent(
                `${organisation.name}, ${capitalizeWords(organisation.city)}, ${
                  organisation.state
                }, ${organisation.postcode}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={gmapIcon}
                alt="Map Icon"
                style={{
                  borderRadius: "12px",
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  objectFit: "cover",
                  objectPosition: "right",
                }}
              />
            </a>
          )}
        </Box>

        <Stack direction={"row"} alignItems={"start"} sx={{ width: "40%" }}>
          <Stack spacing={1}>
            <Typography
              sx={{
                color: "#FFF",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "24px",
              }}
            >
              {organisation?.name}
            </Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <img src={LocationIconWhite} width={10} />
              <Typography
                sx={{ color: "#fff", fontSize: "10px", lineHeight: "12px" }}
              >
                {formatAddress() || ""}
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              sx={{
                background: "rgba(255, 255, 255, 0.70)",
                borderRadius: "60px",
                padding: "4px 12px",
              }}
              spacing={1}
            >
              <Typography
                sx={{
                  color: "#449470",
                  fontSize: "12px",
                  fontWeight: 600,
                  lineHeight: "15px",
                }}
              >
                eR suggested:
              </Typography>
              <Typography
                sx={{
                  color: "#449470",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "15px",
                }}
              >
                {organisation.ereferrals_email
                  ? organisation.ereferrals_email
                  : organisation.email}
              </Typography>
              <MailOutlineRoundedIcon
                sx={{ fontSize: "14px", color: "#449470" }}
              />
            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <PhoneIcon sx={{ color: "#fff", fontSize: 12 }} />
              <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                {organisation.phone || ""}
              </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <MailOutlineIcon sx={{ color: "#fff", fontSize: 12 }} />
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "12px",
                  textDecoration: "underline",
                }}
              >
                {organisation.email}
              </Typography>
            </Stack>
            {organisation.website && (
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <LanguageIcon sx={{ color: "#fff", fontSize: 12 }} />
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "12px",
                    textDecoration: "underline",
                  }}
                >
                  {organisation.website}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>

        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            gap: "5px",
          }}
        >
          <Box
            sx={{
              border: "1px solid #fff",
              padding: "2.5px 8px",
              borderRadius: "10px",
              minHeight: "70px",
              // minWidth: "230px",
              // maxWidth: "50%",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: "11px",
                textDecoration: "italic",
                fontWeight: 400,
                lineHeight: "15px",
              }}
            >
              {provider?.description
                ? `${provider.description}`
                : "No description available"}
            </Typography>
          </Box>
          <Grid sx={{ display: "flex", gap: "5px" }}>
            <Grid sx={{display:"flex", width:"100%"}}>
              <Box
                sx={{
                  border: "1px solid #E8E8E8",
                  borderRadius: "10px",
                  padding: "2.5px 8px",
                  minWidth: "350px",
                  maxHeight: "100px",
                  width: "100%",
                }}
              >
                <Typography
                  variant="small"
                  sx={{ color: "White", fontWeight: 700 }}
                >
                  Opening Hours
                </Typography>
                <Grid sx={{display: "flex", gap:"5%"}}>
                  {" "}
                  {/* Adjust rowSpacing here */}
                  <Grid item  xs={4} rowSpacing={0}>
                    {firstColumnDays.map((dayKey) => (
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "10px",
                          maxWidth: "90px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          color: "White",
                        }}
                        key={dayKey}
                      >
                        <strong>{dayLabels[dayKey]}</strong>{" "}
                        {openingHours[dayKey]}
                      </Typography>
                    ))}
                  </Grid>
                  <Grid item xs={4}>
                    {secondColumnDays.map((dayKey) => (
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "10px",
                          maxWidth: "90px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          color: "White",
                        }}
                        key={dayKey}
                      >
                        <strong>{dayLabels[dayKey]}</strong>{" "}
                        {openingHours[dayKey]}
                      </Typography>
                    ))}
                  </Grid>
                  <Grid item xs={4}>
                    {ThirdColumnDays.map((dayKey) => (
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "10px",
                          maxWidth: "90px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          color: "White",
                        }}
                        key={dayKey}
                      >
                        <strong>{dayLabels[dayKey]}</strong>{" "}
                        {openingHours[dayKey]}
                      </Typography>
                    ))}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid sx={{display:"flex", width:"50%"}}>
              <Box
                sx={{
                  border: "1px solid #E8E8E8",
                  borderRadius: "10px",
                  padding: "6px 8px",
                  width: "100%", // Full width within the Grid item
                  minWidth: "100px", // Minimum width to prevent shrinking
                  // maxWidth: "200px", // Maximum width to prevent overflowing
                  // maxWidth: "50%", // Restrict max width for Opening Hours section
                  height: "100px",
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ color: "White" }}
                  fontWeight="bold"
                >
                  Billing
                </Typography>
                {organisation?.billing_options ? (
                  organisation.billing_options.map((billingOption, idx) => (
                    <Typography
                      key={idx}
                      sx={{ color: "White", fontSize: "12px" }}
                    >
                      {formatBillingOption(billingOption)}
                    </Typography>
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ color: "White", fontSize: "12px" }}
                  >
                    N/A
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          justifyContent: "start",
        }}
      >
        <Box>
          <IconButton onClick={toggleFavourite} sx={{ color: "#fff", mr: 1 }}>
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              <img src={isFavourite ? GradientStarIcon : StarIconGray} />
            )}
          </IconButton>
        </Box>
        <Button
          sx={{
            background:
              "linear-gradient(90deg, #D32F2F -0.31%, #FF5A5A 99.69%)", // Red gradient
            color: "#FFF",
            textTransform: "none",
            borderRadius: "60px",
            padding: "10px 13px",
            fontSize: "14px",
            fontWeight: 600,
          }}
          onClick={onUnselect}
        >
          Remove
        </Button>
      </Stack>
    </Box>
  );
};

export default SelectedProviderCard;
