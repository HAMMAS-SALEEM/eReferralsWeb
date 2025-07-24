import {
  Card,
  Grid,
  Avatar,
  Typography,
  Button,
  Stack,
  Box,
  IconButton,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  Language as LanguageIcon,
  LocationOnRounded as LocationOnRoundedIcon,
  MailOutlineRounded as MailOutlineRoundedIcon,
} from "@mui/icons-material";

import gmapIcon from "../../../assets/images/gmap.svg";
import StarIconGray from "../../../assets/icons/StarIconGray.svg";
import GradientStarIcon from "../../../assets/icons/GradientStarIcon.svg";
import React, { memo, useState } from "react";
import { toast } from "react-toastify";
import ServiceProviderService from "../../../services/ServiceProviderService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import GradientCircularProgress from "../../GradientCircularProgress";
import useFavouriteServiceProvider from "../../../hooks/useFavouriteServiceProvider";

const formatBillingOption = (billingOption) => {
  return billingOption
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

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

function capitalizeWords(str) {
  if (str === null) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

const formatDomain = (url) => {
  if (!url) return "";
  try {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "http://" + url;
    }

    const parsedUrl = new URL(url);
    let domain = parsedUrl.hostname;

    // if (!domain.startsWith("www.")) {
    //   domain = "www." + domain;
    // }

    // if (!domain.endsWith(".com")) {
    //   domain = domain.replace(/\.[a-z]+$/, ".com");
    // }

    return domain;
  } catch (error) {
    console.error("Invalid URL", error);
    return "";
  }
};

const ContactInfoItem = ({ icon: IconComponent, text }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={0.625}
    sx={{
      backgroundColor: "#E0E0E0",
      borderRadius: "24px",
      minHeight: "20px",
      fontWeight: 400,
    }}
  >
    <IconComponent sx={{ fontSize: "14px", ml: "5px !important" }} />
    <Typography
      variant="small"
      onMouseEnter={(e) => {
        e.currentTarget.scrollTo({ left: 9999, behavior: "smooth" });
      }}
      onMouseLeave={(e) => {
        e.currentTarget.scrollTo({ left: 0, behavior: "smooth" });
      }}
      onTouchStart={(e) => {
        e.currentTarget.scrollTo({ left: 9999, behavior: "smooth" });
      }}
      onTouchEnd={(e) => {
        e.currentTarget.scrollTo({ left: 0, behavior: "smooth" });
      }}
      sx={{
        maxWidth: "calc(100% - 10px)", // Adjusts width to leave space for other elements
        whiteSpace: "nowrap",
        fontWeight: 400,
        overflowX: "auto", // Initially hide overflow
        position: "relative",
        scrollbarWidth: "none", // Hide scrollbar in Firefox
        "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in Chrome/Safari
        lineHeight: "20px",
      }}
    >
      {text}
    </Typography>
  </Stack>
);

const dayLabels = {
  MONDAY: "Mon",
  TUESDAY: "Tue",
  WEDNESDAY: "Wed",
  THURSDAY: "Thu",
  FRIDAY: "Fri",
  SATURDAY: "Sat",
  SUNDAY: "Sun",
};

const firstColumnDays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY"];
const secondColumnDays = ["FRIDAY", "SATURDAY", "SUNDAY"];

const ServiceProviderCard = memo(
  ({ service, isSelected, onSelect, serviceProviderPage }) => {
    const openingHours = formatOpeningHours(service?.organisation?.calendar);
    const latitude = service?.organisation?.geocode?.latitude;
    const longitude = service?.organisation?.geocode?.longitude;

    const { isFavourite, isLoading, toggleFavourite } =
      useFavouriteServiceProvider(service.id, service.is_favourite);

    return (
      <Card
        sx={{
          p: 1.5,
          borderRadius: "15px",
          border: isSelected ? "2px solid #1abc9c" : "none",
          boxShadow: "0px 0px 15px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Header Section */}
        {/* Header Section */}
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            flexWrap: "nowrap",
          }}
        >
          {/* Left Side with Image and Title */}
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flex: 1,
              minWidth: 0,
            }}
          >
            <Box>
              {latitude && longitude ? (
                <a
                  href={`https://www.google.com/maps?q=${latitude},${longitude}`}
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
                    `${service?.organisation?.name}, ${capitalizeWords(
                      service?.organisation?.city
                    )}, ${service?.organisation?.state}, ${
                      service?.organisation?.postcode
                    }`
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

            <Stack direction="column" spacing={0} sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                onMouseEnter={(e) => {
                  e.currentTarget.scrollTo({ left: 9999, behavior: "smooth" });
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.scrollTo({ left: 0, behavior: "smooth" });
                }}
                onTouchStart={(e) => {
                  e.currentTarget.scrollTo({ left: 9999, behavior: "smooth" });
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.scrollTo({ left: 0, behavior: "smooth" });
                }}
                sx={{
                  maxWidth: "calc(100% - 10px)", // Adjusts width to leave space for other elements
                  whiteSpace: "nowrap",
                  fontWeight: 600,
                  overflowX: "auto", // Initially hide overflow
                  position: "relative",
                  scrollbarWidth: "none", // Hide scrollbar in Firefox
                  "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in Chrome/Safari

                  // Optional gradient fade effect on the right
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    right: 0,
                    width: "30px",
                    height: "100%",
                    background: "linear-gradient(to right, transparent, white)",
                    pointerEvents: "none",
                  },

                  "&:hover::after": {
                    background: "none", // Remove gradient on hover
                  },
                }}
              >
                {service?.organisation?.name}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <LocationOnRoundedIcon sx={{ fontSize: "14px" }} />
                <Typography
                  variant="small"
                  onMouseEnter={(e) => {
                    e.currentTarget.scrollTo({
                      left: 9999,
                      behavior: "smooth",
                    });
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.scrollTo({ left: 0, behavior: "smooth" });
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.scrollTo({
                      left: 9999,
                      behavior: "smooth",
                    });
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.scrollTo({ left: 0, behavior: "smooth" });
                  }}
                  sx={{
                    maxWidth: "calc(100% - 10px)", // Adjusts width to leave space for other elements
                    whiteSpace: "nowrap",
                    fontWeight: 400,
                    overflowX: "auto", // Initially hide overflow
                    position: "relative",
                    scrollbarWidth: "none", // Hide scrollbar in Firefox
                    "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in Chrome/Safari
                  }}
                >
                  {service?.organisation?.address_3},{" "}
                  {capitalizeWords(service?.organisation?.city)},{" "}
                  {service?.organisation?.state},{" "}
                  {service?.organisation?.postcode}
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          {/* Right Side with Favourite and Select Buttons */}
          <Grid item sx={{ display: "flex", alignItems: "start" }}>
            <Stack direction="row" spacing={1}>
              <IconButton onClick={toggleFavourite} sx={{ padding: 0 }}>
                <img
                  src={isFavourite ? GradientStarIcon : StarIconGray}
                  alt="Favourite Icon"
                />
              </IconButton>
              {!serviceProviderPage ? (
                <Button variant="blueGradient" size="small" onClick={onSelect}>
                  Select
                </Button>
              ) : null}
            </Stack>
          </Grid>
        </Grid>
        {/* Contact Section */}
        <Grid item xs={12} mt={1}>
          <Stack direction="row" spacing={1}>
            {/* Contact Information Section */}
            <Stack
              direction="column"
              spacing={1.5}
              sx={{
                flex: 6, // Allow this section to shrink as needed
                maxWidth: "100%", // Restrict max width for Contact section
                overflow: "hidden", // Ensure it doesn’t overflow outside the card
              }}
            >
              {
                <Box
                  onMouseEnter={(e) => {
                    e.currentTarget.scrollTo({
                      left: 9999,
                      behavior: "smooth",
                    });
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.scrollTo({ left: 0, behavior: "smooth" });
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.scrollTo({
                      left: 9999,
                      behavior: "smooth",
                    });
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.scrollTo({ left: 0, behavior: "smooth" });
                  }}
                  mt={0.5}
                  sx={{
                    borderRadius: "60px",
                    background:
                      "linear-gradient(91deg, #3E89D9 0%, #57C96E 100%)",
                    padding: "0px 12px",
                    whiteSpace: "nowrap",
                    fontWeight: 400,
                    overflowX: "auto",
                    position: "relative",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={0.3}
                  >
                    <Stack direction="row" alignItems="center" spacing={0.3}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "12px",
                          color: "#fff",
                        }}
                        variant="small"
                      >
                        eR Suggested:
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 400,
                          fontSize: "12px",
                          color: "#fff",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {service?.organisation?.ereferrals_email
                          ? service?.organisation?.ereferrals_email
                          : service?.organisation?.email}
                      </Typography>
                    </Stack>
                    <MailOutlineRoundedIcon
                      sx={{ fontSize: "14px", color: "#fff" }}
                    />
                  </Stack>
                </Box>
              }
              {
                <ContactInfoItem
                  icon={PhoneIcon}
                  text={service?.organisation?.phone}
                />
              }
              {
                <ContactInfoItem
                  icon={EmailIcon}
                  text={service?.organisation?.email}
                />
              }
              {
                <ContactInfoItem
                  icon={LanguageIcon}
                  text={formatDomain(service?.organisation?.website)}
                />
              }
            </Stack>

            {/* Opening Hours and Billing Section */}
            <Box
              sx={{
                flex: 1, // Allow this section to take the remaining width
                border: "1px solid #E8E8E8",
                borderRadius: "10px",
                padding: "2.5px 8px",
                minWidth: "220px",
                maxWidth: "300px", // Restrict max width for Opening Hours section
              }}
            >
              <Typography
                variant="small"
                sx={{ color: "#0B3558", fontWeight: 700 }}
              >
                Opening Hours
              </Typography>
              <Grid container rowSpacing={1} columnSpacing={1.5}>
                {" "}
                {/* Adjust rowSpacing here */}
                <Grid item xs={6} rowSpacing={3}>
                  {firstColumnDays.map((dayKey) => (
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "10px",
                        maxWidth: "90px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      key={dayKey}
                    >
                      <strong>{dayLabels[dayKey]}</strong>{" "}
                      {openingHours[dayKey]}
                    </Typography>
                  ))}
                </Grid>
                <Grid item xs={6}>
                  {secondColumnDays.map((dayKey) => (
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "10px",
                        maxWidth: "90px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
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
          </Stack>
        </Grid>
        {/* Additional Information Section */}
        <Grid mt={1} sx={{ width: "100%", display: "flex", gap: "1%" }}>
          <Grid item sx={{ flexGrow: 5 }}>
            <Box
              sx={{
                border: "1px solid #E8E8E8",
                borderRadius: "10px",
                padding: "6px 10px",
                minHeight: "70px",
                maxHeight: "70px", // Fixed height for the Box
                width: "100%", // Fills the container
                boxSizing: "border-box",
                overflowY: "auto", // Enables vertical scrolling only
                scrollbarWidth: "none", // Hide scrollbar in Firefox
              }}
            >
              <Typography
                sx={{
                  color: "#000",
                  fontSize: "12px",
                  fontFamily: "Albert Sans",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                  textOverflow: "ellipsis",
                  width: "100%",
                }}
              >
                {service?.description || "No description available."}
              </Typography>
            </Box>
          </Grid>

          <Box
            sx={{
              border: "1px solid #E8E8E8",
              borderRadius: "10px",
              padding: "6px 8px",
              width: "100%", // Full width within the Grid item
              minWidth: "100px", // Minimum width to prevent shrinking
              maxWidth: "200px", // Maximum width to prevent overflowing
              height: "70px",
              boxSizing: "border-box",
              flex: 1,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Billing
            </Typography>
            {service?.organisation?.billing_options ? (
              service.organisation.billing_options.map((billingOption, idx) => (
                <Typography
                  key={idx}
                  sx={{ lineHeight: "1.3", fontSize: "12px" }}
                >
                  {formatBillingOption(billingOption)}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" sx={{ fontSize: "12px" }}>
                No Billing Information Available
              </Typography>
            )}
          </Box>
        </Grid>
      </Card>
    );
  }
);

export default ServiceProviderCard;
