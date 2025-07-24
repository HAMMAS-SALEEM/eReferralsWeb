import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReferral } from "../store/slices/referralSlice1";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useReferral, useReferralHistory } from "../hooks/useReferrals";
import FileReferral from "./referral/FileReferral";
import PathologyReferral from "./referral/PathologyReferral";
import RadiologyReferral from "./referral/RadiologyReferral";
import { Box } from "@mui/material";
import GradientCircularProgress from "../components/GradientCircularProgress";

const ViewReferral = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: referralData, isLoading, isError } = useReferral(id);
  const { data: historyData, isLoading: isHistoryLoading } =
    useReferralHistory(id);
  const patient = referralData?.patient_data;

  const practitionerProfile = useSelector((state) => state.profile.data);
  const practitionerLoading = useSelector((state) => state.profile.loading);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load Request data.");
      navigate("/referrals");
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (referralData) {
      dispatch(setReferral(referralData));
    } else if (referralData === null) {
      toast.error("No data received from API.");
    }
  }, [referralData, dispatch]);

  if (isLoading || isHistoryLoading) {
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

  return (
    <div>
      {referralData?.file ? (
        <FileReferral
          mode="view"
          patient={patient}
          practitionerProfile={practitionerProfile}
          practitionerLoading={practitionerLoading}
          referral={referralData}
          method={"file"}
          history={historyData}
        />
      ) : referralData?.type === "PATHOLOGY" ? (
        <PathologyReferral
          mode="view"
          patient={patient}
          practitionerProfile={practitionerProfile}
          practitionerLoading={practitionerLoading}
          referral={referralData}
          history={historyData}
        />
      ) : referralData?.type === "RADIOLOGY" ? (
        <RadiologyReferral
          mode="view"
          patient={patient}
          practitionerProfile={practitionerProfile}
          practitionerLoading={practitionerLoading}
          referral={referralData}
          history={historyData}
        />
      ) : (
        <p>Invalid Request type. Please try again.</p>
      )}
    </div>
  );
};

export default ViewReferral;
