import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import ReferralService from "../../services/ReferralService";
import ServiceProviderService from "../../services/ServiceProviderService";
import {
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Stack,
  Collapse,
  Chip,
} from "@mui/material";
import ServiceProviderList from "../../components/referral/send/ServiceProviderList";
import SelectedProviderCard from "../../components/referral/send/SelectedProviderCard";
import ConfirmationModal from "../../components/referral/send/ConfirmationModal";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import AdditionalRecipients from "../../components/referral/send/AdditionalRecipients";
import PatientConsent from "../../components/referral/common/PatientConsent";
import GradientCircularProgress from "../../components/GradientCircularProgress";
import PrintConfirmationModal from "../../components/referral/send/PrintConfirmationModal";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import WhiteCheckIcon from "../../assets/icons/WhiteCheckIcon.svg";
import ExpandDownIcon from "../../assets/icons/ExpandDownIcon.svg";
import StepNavigator from "../../components/referral/common/StepNavigator";
import Print from "../../assets/icons/print.svg";
import { useNavigate } from "react-router-dom";
import sendIcon from "../../assets/icons/send-icon-tr.svg";
import { CheckBox } from "@mui/icons-material";
import PatientService from "../../services/PatientService";
import { set } from "lodash";

const SendReferral = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customPostcode, setCustomPostcode] = useState("");
  const [debouncedCustomPostcode, setDebouncedCustomPostcode] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [additionalRecipients, setAdditionalRecipients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [patientConsent, setPatientConsent] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState(null);
  const [selectedProviderData, setSelectedProviderData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(true);
  const [providerCardExpanded, setProviderCardExpanded] = useState(false);
  const [selectedReferralType, setSelectedReferralType] = useState("");
  const [postcodes, setPostcodes] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [favourites, setFavourites] = useState(false);
  const [selectedBillingOption, setSelectedBillingOption] = useState(null);
  const [selectedProximityFilter, setSelectedProximityFilter] = useState(null);
  const [onlyProvidersWithEmail, setOnlyProvidersWithEmail] = useState(true);

  const debouncedSearch = useCallback(
    debounce((query) => setSearchQuery(query), 300),
    []
  );

  const handleBack = () => {
    navigate(`/add-referral/continue-referral/${id}`);
  };

  const handleClose = () => {
    navigate("/referrals");
  };

  // Example function to handle next action (could be form submission or other logic)
  const handleNext = () => {
    // Add your logic here for the next step, e.g., form validation or submission
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCustomPostcode(customPostcode);
    }, 500); // Debounce time of 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [customPostcode]);

  const {
    data: referralData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["referral", id],
    queryFn: () => ReferralService.getReferralById(id),
  });

  const patientId = referralData?.data?.patient;

  // Fetch patient data using the patient ID
  const {
    data: patientData,
    isLoading: patientLoading,
    isError: patientError,
  } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: async () => {
      const response = await PatientService.getPatientById(patientId);
      return response.data;
    },
    enabled: !!patientId,
    onError: () => {
      toast.error("Failed to load patient data.");
    },
  });

  const adjustedSelectedProximityFilter =
    selectedProximityFilter === "near_postcode" && !debouncedCustomPostcode
      ? null
      : selectedProximityFilter;

  const adjustedDebouncedCustomPostcode =
    selectedProximityFilter === "near_postcode" && debouncedCustomPostcode
      ? debouncedCustomPostcode
      : null;

  const {
    data: services,
    isLoading: isServicesLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    keepPreviousData: true,
    enabled: true,
    queryKey: [
      "services",
      selectedReferralType,
      selectedBillingOption,
      adjustedSelectedProximityFilter,
      postcodes,
      adjustedDebouncedCustomPostcode,
      searchQuery,
      favourites,
    ],
    queryFn: ({ pageParam = 0 }) => {
      const params = {
        type: selectedReferralType,
        limit: 50,
        offset: pageParam,
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      if (favourites) {
        params.favourite = true;
      }

      if (selectedBillingOption) {
        params.organisation__billing_options = selectedBillingOption;
      }

      // Adjusted proximity filters
      if (adjustedSelectedProximityFilter === "near_clinic") {
        params.postcode = postcodes?.clinic;
      } else if (adjustedSelectedProximityFilter === "near_patient") {
        params.postcode = postcodes?.patient;
      } else if (adjustedSelectedProximityFilter === "near_postcode") {
        if (debouncedCustomPostcode) {
          params.postcode = debouncedCustomPostcode;
        }
      }

      return ServiceProviderService.getServiceProviders(params).then(
        (response) => {
          const hasMorePages = response.data.results.length === 50;
          return {
            results: response.data.results,
            nextPage: hasMorePages ? pageParam + 50 : undefined,
          };
        }
      );
    },
    getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (referralData) {
      setRecipients([]);
      setSelectedReferralType(referralData?.data?.type);
      const clinicPostcode =
        referralData?.data?.from_organisation_data?.postcode;
      const patientPostcode = referralData?.data?.patient_data?.postcode;

      // Check if 'to_service_data' is available
      if (referralData?.data?.to_service_data) {
        setSelectedProviderData(referralData?.data?.to_service_data);
        setSelectedProviderId(referralData?.data?.to_service_data.id);
        setProviderCardExpanded(true);
      }

      setPostcodes({
        clinic: clinicPostcode,
        patient: patientPostcode,
      });

      const patientEmail = referralData.data?.patient_data?.email;
      if (patientEmail) {
        setRecipients([
          {
            email: patientEmail,
            name: `${referralData.data.patient_data.first_name} ${referralData.data.patient_data.last_name}`,
          },
        ]);
      }
    }
  }, [referralData]);

  const handleServiceProviderSelect = (provider) => {
    const newRecipientEmail = provider?.organisation?.ereferrals_email
      ? provider?.organisation?.ereferrals_email
      : provider?.organisation?.email;
    const newRecipientName = provider?.organisation?.name;
    if (!newRecipientEmail) {
      toast.error(
        `Provider "${newRecipientName}" does not have an email address.`
      );
      return;
    }

    // Update the selected provider's data and ID
    setSelectedProviderData(provider);
    setSelectedProviderId(provider.id);
    setProviderCardExpanded(true);

    setRecipients([
      ...recipients.filter(
        (recipient) => recipient.email !== newRecipientEmail
      ),
      { email: newRecipientEmail, name: newRecipientName },
    ]);
  };

  const handleUnselectProvider = () => {
    // Get the email of the provider being unselected
    const unselectedProviderEmail = selectedProviderData?.organisation
      ?.ereferrals_email
      ? selectedProviderData?.organisation?.ereferrals_email
      : selectedProviderData?.organisation?.email;

    // Remove the provider's email from the recipients list
    setRecipients(
      recipients.filter(
        (recipient) => recipient.email !== unselectedProviderEmail
      )
    );

    // Update the state to reflect that no provider is selected
    setSelectedProviderData(null);
    setSelectedProviderId(null);
    setProviderCardExpanded(false);
  };

  const handlePrintClick = () => {
    setPrintModalOpen(true);
  };

  const handleSendClick = () => {
    if (!referralData) {
      toast.error("Request data not available.");
      return;
    }

    if (!recipients.length && !additionalRecipients.length) {
      toast.error(
        "Please add at least one recipient before sending the Request."
      );
      return;
    }

    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const finalRecipients = [...recipients, ...additionalRecipients];

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <GradientCircularProgress size={40} thickness={5} variant="blue" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">Failed to load Request.</Typography>
      </Box>
    );
  }

  const patient = patientData || {};
  return (
    <Box>
      {referralData?.data?.status.toLowerCase() === "draft" && (
        <Stack spacing={3} mb={2}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <StepNavigator
              title={"Send Request"}
              onBack={handleBack}
              onNext={handleNext}
              disableNext={true}
              type={`(${referralData?.data?.type.toLowerCase() ?? ""} - #${id ?? ""
                })`}
            />
          </Stack>
        </Stack>
      )}

      <Typography sx={{ fontSize: "30px", fontWeight: 600, mb: 3, mt: 4 }}>
        Send to
      </Typography>

      <Box
        sx={{
          p: 2,
          backgroundColor: "#fff",
          borderRadius: "16px",
          mb: 2,
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "start",
            gap: "2%",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 600,
              marginTop: "1vh",
              marginRight: "10px",
            }}
          >
            Patient
          </Typography>

          {/* Always visible fields (First Row) */}
          <Grid container spacing={2}>
            <Grid item xs={2.8}>
              <Typography
                sx={{ fontSize: "14px", fontWeight: 400, lineHeight: "24px" }}
              >
                Name
              </Typography>
              <Typography
                sx={{ fontSize: "14px", fontWeight: 700, lineHeight: "24px" }}
              >
                {patient?.first_name || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={2.8}>
              <Typography
                sx={{ fontSize: "14px", fontWeight: 400, lineHeight: "24px" }}
              >
                Surname
              </Typography>
              <Typography
                sx={{ fontSize: "14px", fontWeight: 700, lineHeight: "24px" }}
              >
                {patient?.last_name || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={2.8}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                Date of Birth
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "24px",
                }}
              >
                {patient?.birth_date
                  ? new Date(patient.birth_date).toLocaleDateString()
                  : "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={2.8}>
              <Typography
                sx={{ fontSize: "14px", fontWeight: 400, lineHeight: "24px" }}
              >
                E-mail
              </Typography>
              <Typography
                sx={{ fontSize: "14px", fontWeight: 700, lineHeight: "24px" }}
              >
                {patient?.email || "N/A"}
              </Typography>
            </Grid>
          </Grid>

          <Box display="flex" alignItems="center">
            <IconButton onClick={() => setExpanded(!expanded)}>
              <img
                src={ExpandDownIcon}
                style={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            </IconButton>
            <Chip
              sx={{
                borderRadius: "60px",
                background:
                  "linear-gradient(90deg, #2D6465 -12.67%, #3A806B -12.67%, #67DE7F 112.91%)",
                padding: "6px 13px",
                color: "#fff",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "24px",
                pointerEvents: "none",
              }}
              label="Selected"
              icon={<img src={WhiteCheckIcon} />}
            />
          </Box>
        </Grid>
        {/* Expandable fields (Second and Third Rows) */}
        <Collapse in={expanded}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "start",
              gap: "2%",
            }}
          >
            <Grid>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: 600,
                  marginTop: "1vh",
                  marginRight: "10px",
                }}
              >
                Details
              </Typography>
            </Grid>
            <Grid
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              {/* Second Row */}
              <Grid container spacing={2} sx={{ mt: 0 }}>
                <Grid item xs={2.8}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                  >
                    Gender
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "24px",
                    }}
                  >
                    {patient?.gender || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={2.8}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                  >
                    Medicare Number
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "24px",
                    }}
                  >
                    {patient?.medicare_no || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={2.8}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                  >
                    Medicare Exp Date
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "24px",
                    }}
                  >
                    {patient?.medicare_expiry_date
                      ? new Date(
                        patient.medicare_expiry_date
                      ).toLocaleDateString()
                      : "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={2.8}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                  >
                    Phone Number
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "24px",
                    }}
                  >
                    {patient?.phone || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
              {/* Third Row */}
              <Grid container spacing={2} sx={{ mt: 0 }}>
                <Grid item xs={2.8}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                  >
                    Address
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "24px",
                    }}
                  >
                    {patient?.address_1 || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={2.8}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                  >
                    Suburb
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "24px",
                    }}
                  >
                    {patient?.city || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={2.8}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                  >
                    State
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "24px",
                    }}
                  >
                    {patient?.state || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={2.8}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                  >
                    Postcode
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "24px",
                    }}
                  >
                    {patient?.postcode || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* THIS BOX IS ONLY TO GET ACCURATE SPACING TO KEEP ITEMS IN column */}
            <Box
              display="flex"
              alignItems="center"
              sx={{ visibility: "hidden" }}
            >
              <IconButton onClick={() => setExpanded(!expanded)}>
                <img
                  src={ExpandDownIcon}
                  style={{
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                />
              </IconButton>
              <Chip
                sx={{
                  borderRadius: "60px",
                  background:
                    "linear-gradient(90deg, #2D6465 -12.67%, #3A806B -12.67%, #67DE7F 112.91%)",
                  padding: "6px 13px",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  pointerEvents: "none",
                }}
                label="Selected"
                icon={<img src={WhiteCheckIcon} />}
              />
            </Box>
          </Grid>
        </Collapse>
      </Box>

      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          mb: 2,
        }}
      >
        <Stack direction={"row"} justifyContent="space-between" sx={{ p: 2 }}>
          <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
            <Typography
              sx={{ fontSize: "24px", fontWeight: 600, lineHeight: "24px" }}
            >
              Service Provider
            </Typography>
            <ChevronRightIcon
              sx={{
                width: "30px",
                height: "30px",
                fontSize: "40px",
                color: "#000",
              }}
              fontSize="large"
            />
            <Typography
              variant="h6"
              sx={{
                fontSize: "24px",
                fontWeight: 600,
                lineHeight: "24px",
                textTransform: "capitalize",
              }}
            >
              {referralData?.data?.type.toLowerCase()}
            </Typography>
          </Stack>

          <Box display="flex" alignItems="center">
            <IconButton onClick={() => setServicesExpanded(!servicesExpanded)}>
              <img
                src={ExpandDownIcon}
                style={{
                  transform: servicesExpanded
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            </IconButton>
            {selectedProviderId ? (
              <Chip
                sx={{
                  borderRadius: "60px",
                  background:
                    "linear-gradient(90deg, #2D6465 -12.67%, #3A806B -12.67%, #67DE7F 112.91%)",
                  padding: "6px 13px",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  pointerEvents: "none",
                }}
                label="Selected"
                icon={<img src={WhiteCheckIcon} />}
              />
            ) : (
              <Button
                variant="blueGradient"
                onClick={() => setServicesExpanded(!servicesExpanded)}
                startIcon={null}
              >
                Add
              </Button>
            )}
          </Box>
        </Stack>

        {selectedProviderData && (
          <Collapse
            in={providerCardExpanded}
            timeout={500}
            unmountOnExit
            sx={{ p: 2, borderRadius: "50px" }}
          >
            <Box sx={{ p: 2, borderRadius: "50px" }}>
              <SelectedProviderCard
                provider={selectedProviderData}
                onUnselect={handleUnselectProvider}
              />
            </Box>
          </Collapse>
        )}

        <Collapse in={servicesExpanded} timeout="auto" unmountOnExit>
          <ServiceProviderList
            services={services?.pages?.flatMap((page) => page.results) || []}
            isLoading={isServicesLoading}
            isFetching={isFetching}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            debouncedCustomPostcode={debouncedCustomPostcode}
            selectedProximityFilter={selectedProximityFilter}
            setSelectedProximityFilter={setSelectedProximityFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onServiceProviderSelect={handleServiceProviderSelect}
            debouncedSearch={debouncedSearch}
            selectedProviderId={selectedProviderId}
            favourites={favourites}
            setFavourites={setFavourites}
            selectedBillingOption={selectedBillingOption}
            setSelectedBillingOption={setSelectedBillingOption}
            onlyProvidersWithEmail={onlyProvidersWithEmail}
            setOnlyProvidersWithEmail={setOnlyProvidersWithEmail}
            customPostcode={customPostcode}
            setCustomPostcode={setCustomPostcode}
          />
        </Collapse>
      </Box>

      {/* Additional Recipients */}
      <Box
        sx={{
          p: 3,
          backgroundColor: "#fff",
          borderRadius: "16px",
          mb: 4,
        }}
      >
        <AdditionalRecipients
          recipients={additionalRecipients}
          setRecipients={setAdditionalRecipients}
        />
      </Box>

      {/* Action Buttons */}
      <Box display="flex" gap={"1%"} justifyContent="flex-end" sx={{ mt: 3 }}>
        <Button
          variant="blueGradient"
          size="medium"
          sx={{
            minWidth: "120px",
          }}
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          onClick={handlePrintClick}
          sx={{
            background:
              "linear-gradient(90deg, #333333 -0.31%, #000000 99.69%)", // Black gradient
            color: "#FFF",
            fontWeight: 600,
            borderRadius: "43px", // Rounded corners
            padding: "2.5px 8px", // Adjust padding as needed
            // background: "#1976d2", // Primary color
            width: "10%",
            textTransform: "none",
            // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          Print
          <img src={Print} style={{ marginLeft: "8px" }} />
        </Button>

        <Button
          variant="greenGradient"
          onClick={handleSendClick}
          sx={{ width: "10%", paddingLeft: "40px", paddingTop: "8px" }} // Adjust padding as needed}}
        >
          Send
          <img
            src={sendIcon}
            style={{ position: "relative", top: "-3px", left: "0px" }}
          />
        </Button>
      </Box>

      {/* Pass the referralId to the PrintConfirmationModal */}
      <PrintConfirmationModal
        open={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
        referralData={referralData?.data}
        additionalRecipients={additionalRecipients}
      />

      <ConfirmationModal
        open={modalOpen}
        onClose={handleCloseModal}
        referralId={id}
        additionalRecipients={additionalRecipients}
        patientConsent={patientConsent}
        selectedProviderData={selectedProviderData}
        patientData={referralData.data?.patient_data}
      />
    </Box>
  );
};

export default SendReferral;
