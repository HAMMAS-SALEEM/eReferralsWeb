// ServiceProviderList.js

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  InputAdornment,
  InputBase,
  Grid,
  Stack,
  Switch,
  Typography,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ServiceProviderCard from "./ServiceProviderCard";
import GradientCircularProgress from "../../GradientCircularProgress";
import ByHdaLogo from "../../../assets/images/by-hda-logo.svg";
import ServiceProviderFilters from "./ServiceProviderFilters";
import { Balcony } from "@mui/icons-material";
import zIndex from "@mui/material/styles/zIndex";
import { set } from "react-hook-form";

const CompactSwitch = styled(Switch)(({ theme }) => ({
  padding: 0,
  width: 50,
  height: 33,
  display: "flex",
  alignItems: "center",
  "& .MuiSwitch-switchBase": {
    padding: "5px",
    transition: "transform 0.3s ease",
    "&.Mui-checked": {
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundImage: "linear-gradient(to bottom, #143056, #418FD2)",
        opacity: 1,
        transition: "background 0.3s ease, border 0.3s ease",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 23,
    height: 23,
    borderRadius: "50%",
    backgroundColor: "#fff",
    border: "2px solid transparent",
    backgroundClip: "padding-box",
    position: "relative",
    transition: "border 0.3s ease",
  },
  "& .MuiSwitch-track": {
    borderRadius: 120,
    backgroundColor: "#EFEFEF",
    border: "1px solid #000",
    opacity: 1,
    transition: "background-color 0.3s ease, border 0.3s ease",
  },
}));

const ServiceProviderList = ({
  services = [], // Provide a default empty array
  isLoading,
  isFetching,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
  debouncedCustomPostcode,
  selectedProximityFilter,
  setSelectedProximityFilter,
  searchQuery,
  setSearchQuery,
  selectedProviderId,
  onServiceProviderSelect,
  debouncedSearch,
  favourites,
  setFavourites,
  selectedBillingOption,
  setSelectedBillingOption,
  onlyProvidersWithEmail,
  setOnlyProvidersWithEmail,
  customPostcode,
  setCustomPostcode,
  ServiceProviderPage,
  serviceProviderType,
  setServiceProviderType,
}) => {
  const [isPostcodeMode, setIsPostcodeMode] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Create refs for the scrollable div and the observer
  const scrollableRef = useRef();
  const observerRef = useRef();

  const hasServices = services && services.length > 0;

  const handleProviderSelect = (provider) => {
    onServiceProviderSelect(provider);
  };

  // IntersectionObserver callback
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage, isFetchingNextPage]
  );

  // Set up the IntersectionObserver
  useEffect(() => {
    const options = {
      root: scrollableRef.current,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleObserver]);

  useEffect(() => {
    if (isPostcodeMode) {
      setSelectedProximityFilter("near_postcode");
    } else if (selectedProximityFilter === "near_postcode") {
      setSelectedProximityFilter(null);
    }
  }, [isPostcodeMode, setSelectedProximityFilter, selectedProximityFilter]);

  useEffect(() => {
    if (isPostcodeMode) {
      setSearchQuery("");
      setInputValue("");
    } else {
      setCustomPostcode("");
      setInputValue("");
    }
  }, [isPostcodeMode, setSearchQuery, setCustomPostcode]);

  // Filter services based on 'onlyProvidersWithEmail'
  const filteredServices = onlyProvidersWithEmail
    ? services.filter(
        (service) =>
          service?.organisation?.email ||
          service?.organisation?.ereferrals_email
      )
    : services;

  return (
    <Box
      sx={{
        height: "800px",
        background: ServiceProviderPage ? "" : "#fff",
        borderRadius: 7.5,
        position: "relative",
        zIndex: 100,
      }}
    >
      {/* Search Bar */}
      <Stack
        direction={"row"}
        spacing={2}
        sx={{
          pr: 2,
          pl: 2,
          pb: 2,
          borderRadius: "5px",
          boxShadow: "0px 3px 3px -1px rgba(0, 0, 0, 0.2)",
          zIndex: 100, // Light black shadow only on the bottom
        }}
      >
        <Stack spacing={2}>
          <Box>
            <InputBase
              placeholder={
                isPostcodeMode
                  ? "Search by Postcode..."
                  : "Search by Keyword..."
              }
              value={inputValue}
              onChange={(e) => {
                const value = e.target.value;
                setInputValue(value);
                if (isPostcodeMode) {
                  setSearchQuery("");
                  setCustomPostcode(value);
                } else {
                  setCustomPostcode("");
                  setSearchQuery(value);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (isPostcodeMode) {
                    setSearchQuery("");
                    setCustomPostcode(inputValue);
                  } else {
                    setCustomPostcode("");
                    setSearchQuery(inputValue);
                  }
                }
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="search"
                    onClick={() => {
                      if (isPostcodeMode) {
                        setSearchQuery("");
                        setCustomPostcode(inputValue);
                      } else {
                        setCustomPostcode("");
                        setSearchQuery(inputValue);
                      }
                    }}
                    edge="end"
                    sx={{
                      // background: "#f5f5f5",
                      mr: "-20px",
                      "&:hover": {
                        background: "#e0e0e0",
                      },
                    }}
                  >
                    <SearchIcon sx={{ color: "#888" }} />
                  </IconButton>
                </InputAdornment>
              }
              sx={{
                fontFamily: "Albert Sans",
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "24px",
                borderRadius: "59px",
                border: "1px solid #000",
                background: "#FFF",
                padding: "0px 20px",
                display: "flex",
                alignItems: "center",
                width: "23vw",
                overflow: "hidden",
              }}
            />
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <CompactSwitch
                checked={isPostcodeMode}
                onChange={(e) => setIsPostcodeMode(e.target.checked)}
                color="default"
                inputProps={{
                  "aria-label": "Switch between search and postcode",
                }}
              />
              <Typography
                sx={{
                  ml: 1,
                  width: "40%",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                Search by Postcode
              </Typography>
            </Box>
            <img src={ByHdaLogo} alt="Logo" />
          </Stack>
        </Stack>

        {/* Filters */}
        <Stack sx={{ flex: 1 }}>
          <ServiceProviderFilters
            selectedProximityFilter={selectedProximityFilter}
            setSelectedProximityFilter={setSelectedProximityFilter}
            onlyProvidersWithEmail={onlyProvidersWithEmail}
            setOnlyProvidersWithEmail={setOnlyProvidersWithEmail}
            selectedBillingOption={selectedBillingOption}
            setSelectedBillingOption={setSelectedBillingOption}
            favourites={favourites}
            setFavourites={setFavourites}
            ServiceProviderPage={ServiceProviderPage}
            serviceProviderType={serviceProviderType}
            setServiceProviderType={setServiceProviderType}
          />
        </Stack>
      </Stack>

      {/* Service Providers List */}
      <Box
        ref={scrollableRef}
        sx={{
          position: "relative",
          minHeight: "200px",
          height: ServiceProviderPage ? "100vh" : "630px",
          overflowY: "auto",
          p: 2,
          zIndex: -1,
          boxShadow: "inset 0px -4px 8px -2px rgba(0, 0, 0, 0.2)",
          /* Scrollbar styling */
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#D3D3D3",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background:
              "linear-gradient(90deg, #2D6465 -12.67%, #3A806B -12.67%, #67DE7F 112.91%)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background:
              "linear-gradient(90deg, #2D6465 -12.67%, #3A806B -12.67%, #67DE7F 112.91%)",
          },
        }}
      >
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100px"
          >
            <GradientCircularProgress />
          </Box>
        ) : hasServices ? (
          <Grid container spacing={2}>
            {/* {filteredServices.some((service) => service.email) ? null : (
              <Grid item xs={12}>
                {/* <Typography>
                  Found {filteredServices.length} services.
                </Typography> 
              </Grid>
            )} */}
            {filteredServices.map((service) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                xxl={4}
                key={service.id}
              >
                <ServiceProviderCard
                  service={service}
                  isSelected={service.id === selectedProviderId}
                  onSelect={() => handleProviderSelect(service)}
                  serviceProviderPage={ServiceProviderPage}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              width: "100%",
              minHeight: 180,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 4,
              opacity: 0.7,
            }}
          >
            <Box sx={{ fontSize: 48, mb: 1 }}>
              {/* You can replace this emoji with an SVG or image if you have one */}
              <span role="img" aria-label="search">
                🔍
              </span>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              No providers match your filters
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                textAlign: "center",
                maxWidth: 320,
              }}
            >
              Try adjusting your search or filter options to find more providers.
            </Typography>
          </Box>
        )}

        {/* Loader for fetching next page */}
        {isFetchingNextPage && (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <GradientCircularProgress />
          </Box>
        )}

        <div ref={observerRef} />
      </Box>
    </Box>
  );
};

export default ServiceProviderList;
