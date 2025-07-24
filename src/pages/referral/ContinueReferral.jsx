import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReferralService from "../../services/ReferralService";
import PatientService from "../../services/PatientService";
import FileReferral from "./FileReferral";
import PathologyReferral from "./PathologyReferral";
import RadiologyReferral from "./RadiologyReferral";
import { useSelector, useDispatch } from "react-redux";
import { setPatient, clearPatient } from "../../store/slices/patientSlice1";
import GradientCircularProgress from "../../components/GradientCircularProgress";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ContinueReferral = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const practitionerProfile = useSelector((state) => state.profile.data);
  const practitionerLoading = useSelector((state) => state.profile.loading);
  const patientFromRedux = useSelector((state) => state.patient);

  const {
    data: rawReferralData,
    isLoading: referralLoading,
    isError: referralError,
  } = useQuery({
    queryKey: ["referral", id],
    queryFn: async () => {
      try {
        const response = await ReferralService.getReferralById(id);
        return response;
      } catch (error) {
        console.error("Error fetching Request data:", error);
        throw error;
      }
    },
    onError: () => {
      toast.error("Failed to load Request data.");
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  // Check if rawReferralData is wrapped in `data` property and extract it
  const referralData = rawReferralData?.data || rawReferralData;
  const patientId = referralData?.patient;

  const {
    data: patientData,
    isLoading: patientLoading,
    isError: patientError,
  } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: async () => {
      try {
        const response = await PatientService.getPatientById(patientId);
        return response?.data || response;
      } catch (error) {
        throw error;
      }
    },
    enabled: !!patientId,
    onError: () => {
      toast.error("Failed to load patient data.");
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  useEffect(() => {
    if (patientData) {
      dispatch(setPatient(patientData));
    }
  }, [patientData, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearPatient());
    };
  }, [dispatch]);

  if (referralLoading || patientLoading) {
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

  if (referralError || !referralData) {
    return <div>Error loading Request data. Please try again later.</div>;
  }

  if (patientError) {
    return <div>Error loading patient data. Please try again later.</div>;
  }

  const patient = patientFromRedux;

  return (
    <div>
      {referralData?.file ? (
        <FileReferral
          mode="edit"
          method="file"
          referral={referralData}
          patient={patient}
          practitionerProfile={practitionerProfile}
          practitionerLoading={practitionerLoading}
          continueDraft={true}
        />
      ) : referralData?.type === "PATHOLOGY" ? (
        <PathologyReferral
          mode="edit"
          referral={referralData}
          patient={patient}
          practitionerProfile={practitionerProfile}
          practitionerLoading={practitionerLoading}
          continueDraft={true}
        />
      ) : referralData?.type === "RADIOLOGY" ? (
        <RadiologyReferral
          mode="edit"
          referral={referralData}
          patient={patient}
          practitionerProfile={practitionerProfile}
          practitionerLoading={practitionerLoading}
          continueDraft={true}
        />
      ) : (
        <p>Please select a valid Request type.</p>
      )}
    </div>
  );
};

export default ContinueReferral;
