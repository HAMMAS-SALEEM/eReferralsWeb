import React, { useState, useCallback, useEffect } from "react";
import { Paper, Typography, Box, Collapse, Stack } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import ServiceProviderService from "../../services/ServiceProviderService";
import ServiceProviderList from "../../components/referral/send/ServiceProviderList";
import SelectedProviderCard from "../../components/referral/send/SelectedProviderCard";
import { toast } from "react-toastify";
import { debounce } from "lodash";

const ServiceProviderListPage = () => {
  const [selectedProviderData, setSelectedProviderData] = useState(null);
  const [servicesExpanded, setServicesExpanded] = useState(true);
  const [selectedProximityFilter, setSelectedProximityFilter] = useState(null);
  const [favourites, setFavourites] = useState(false);
  const [selectedBillingOption, setSelectedBillingOption] = useState(null);
  const [onlyProvidersWithEmail, setOnlyProvidersWithEmail] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [customPostcode, setCustomPostcode] = useState("");
  const [serviceProviderType, setServiceProviderType] = useState("");

  const debouncedSearch = useCallback(
    debounce((query) => setSearchQuery(query), 300),
    []
  );

  // Infinite query setup for service providers
  const {
    data: services,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "services",
      searchQuery,
      serviceProviderType,
      selectedBillingOption,
      favourites,
      customPostcode,
    ],
    queryFn: ({ pageParam = 0 }) => {
      const params = {
        postcode: customPostcode,
        limit: 50,
        offset: pageParam,
      };

      if (serviceProviderType) {
        params.type = serviceProviderType;
      }

      if (searchQuery) {
        params.search = searchQuery;
      }

      if (favourites) {
        params.favourite = true;
      }

      if (selectedBillingOption) {
        params.organisation__billing_options = selectedBillingOption;
      }

      return ServiceProviderService.getServiceProviders(params).then(
        (response) => ({
          results: response.data.results,
          nextPage:
            response.data.results.length === 50 ? pageParam + 50 : undefined,
        })
      );
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    refetchOnWindowFocus: false,
  });

  // Error handling
  if (services?.error) {
    toast.error("Failed to load service providers.");
  }

  const handleProviderSelect = (provider) => {
    setSelectedProviderData(provider);
  };

  const handleUnselectProvider = () => {
    setSelectedProviderData(null);
  };

  // console.log("serviceProviderType", serviceProviderType);

  return (
    <Paper
      elevation={3}
      sx={{
        // padding: "20px 0px",
        backgroundColor: "#E1E1E1",
        borderRadius: "5px",
        width: "100%",
        height: "97.5vh",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: "0",
          height: "0",
        },
      }}
    >
      {/* Page Header */}
      <Typography variant="h4" sx={{ fontWeight: 600, m: 2 }}>
        Service Providers
      </Typography>

      {/* Selected Provider Card */}
      {/* {selectedProviderData && (
        <Collapse in={true} timeout={500} unmountOnExit sx={{ p: 2, borderRadius: "10px" }}>
          <SelectedProviderCard
            provider={selectedProviderData}
            onUnselect={handleUnselectProvider}
          />
        </Collapse>
      )} */}

      {/* Service Provider List */}
      <Box sx={{ mt: 2 }}>
        <ServiceProviderList
          services={services?.pages?.flatMap((page) => page.results) || []}
          isLoading={isLoading}
          isFetching={isFetching}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          selectedProximityFilter={selectedProximityFilter}
          setSelectedProximityFilter={setSelectedProximityFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onServiceProviderSelect={handleProviderSelect}
          debouncedSearch={debouncedSearch}
          selectedProviderId={selectedProviderData?.id}
          favourites={favourites}
          setFavourites={setFavourites}
          selectedBillingOption={selectedBillingOption}
          setSelectedBillingOption={setSelectedBillingOption}
          onlyProvidersWithEmail={onlyProvidersWithEmail}
          setOnlyProvidersWithEmail={setOnlyProvidersWithEmail}
          customPostcode={customPostcode}
          setCustomPostcode={setCustomPostcode}
          ServiceProviderPage={true}
          serviceProviderType={serviceProviderType}
          setServiceProviderType={setServiceProviderType}
        />
      </Box>
    </Paper>
  );
};

export default ServiceProviderListPage;
