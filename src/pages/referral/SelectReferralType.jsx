import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import PatientDetails from "../../components/referral/common/PatientDetails";
import { setType } from "../../store/slices/referralSlice1";
import { useNavigate } from "react-router-dom";
import CreateRefBg from "./../../assets/images/CreateRefBg.jpeg";
import FileRefBg from "./../../assets/images/UploadRefBg.jpeg";
import StepNavigator from "../../components/referral/common/StepNavigator";
import { Stack } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const SelectReferralType = () => {
  const [referralMethod, setReferralMethod] = useState("");
  const referralType = useSelector((state) => state.referral.type);
  const { patient } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectReferralType = (type) => {
    dispatch(setType(type));
    setReferralMethod("");
  };

  const handleReferralMethodSelection = (method) => {
    setReferralMethod(method);
  };

  const handleNext = () => {
    if (referralMethod === "FILE_REFERRAL") {
      navigate("/add-referral/create-referral?method=file");
    } else if (referralMethod === "CREATE_REFERRAL") {
      navigate("/add-referral/create-referral?method=create");
    }
  };

  const handleBack = () => {
    navigate("/add-referral");
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100%" }}>
      <Stack spacing={3}>
        <StepNavigator
          title="New Request"
          onBack={handleBack}
          onNext={handleNext}
          disableNext={!referralType || !referralMethod} // Disable Next if conditions aren't met
          disableBack={false} // Keep back button enabled
        />

        <PatientDetails layout={1} patient={patient} />
      </Stack>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Select Request Type
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Button
            color={referralType === "PATHOLOGY" ? "secondary" : "inherit"}
            onClick={() => handleSelectReferralType("PATHOLOGY")}
            sx={{
              padding: "10px 25px",
              borderRadius: "60px",
              textTransform: "none",
              border:
                referralType === "PATHOLOGY"
                  ? "2px solid linear-gradient(90deg, #153259 -0.31%, #418FD1 99.69%)"
                  : "2px solid #000",
              color: referralType === "PATHOLOGY" ? "#fff" : "#000",
              textAlign: "center",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "24px",
              background:
                referralType === "PATHOLOGY"
                  ? "linear-gradient(90deg, #153259 -0.31%, #418FD1 99.69%)"
                  : "inherit",
            }}
          >
            Pathology
          </Button>

          <Button
            color={referralType === "RADIOLOGY" ? "primary" : "inherit"}
            onClick={() => handleSelectReferralType("RADIOLOGY")}
            sx={{
              padding: "10px 25px",
              borderRadius: "60px",
              textTransform: "none",
              border:
                referralType === "RADIOLOGY"
                  ? "2px solid linear-gradient(90deg, #153259 -0.31%, #418FD1 99.69%)"
                  : "2px solid #000",
              color: referralType === "RADIOLOGY" ? "#fff" : "#000",
              textAlign: "center",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "24px",
              background:
                referralType === "RADIOLOGY"
                  ? "linear-gradient(90deg, #153259 -0.31%, #418FD1 99.69%)"
                  : "inherit",
            }}
          >
            Radiology
          </Button>
        </Box>
      </Box>

      {referralType && (
        <>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              mt: 5,
              mb: 3,
            }}
          >
            Select an Option
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 0 }}>
            <Box
              sx={{
                position: "relative",
                width: "35vh",
                height: "28vh",
                borderRadius: "30px",
                background: `linear-gradient(0deg, rgba(255, 255, 255, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%), url(${CreateRefBg}) lightgray 50% / cover no-repeat`,
                boxShadow: "0px 0px 30px 0px rgba(0, 0, 0, 0.20)",
                padding: "16px",
                ":hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => handleReferralMethodSelection("CREATE_REFERRAL")}
            >
              <Button
                sx={{
                  position: "absolute",
                  bottom: "16px",
                  right: "16px",
                  padding: "10px 25px",
                  borderRadius: "60px",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  textTransform: "none",
                  borderColor:
                    referralMethod === "CREATE_REFERRAL"
                      ? "transparent"
                      : "#000",
                  background:
                    referralMethod === "CREATE_REFERRAL"
                      ? "linear-gradient(90deg, #153259 -0.31%, #418FD1 99.69%)"
                      : "rgba(255, 255, 255, 0.20)",
                  color: referralMethod === "CREATE_REFERRAL" ? "#fff" : "#000",
                  textAlign: "center",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "24px",
                  backdropFilter: "blur(4px)",
                }}
              >
                Create Request
              </Button>
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
              <Box
                sx={{
                  position: "relative",
                  width: "35vh",
                  height: "28vh",
                  borderRadius: "30px",
                  background: `linear-gradient(0deg, rgba(255, 255, 255, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%), url(${FileRefBg}) lightgray 50% / cover no-repeat`,
                  boxShadow: "0px 0px 30px 0px rgba(0, 0, 0, 0.20)",
                  padding: "16px",
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleReferralMethodSelection("FILE_REFERRAL")}
              >
                <Button
                  sx={{
                    position: "absolute",
                    bottom: "16px",
                    right: "16px",
                    textTransform: "none",
                    padding: "10px 25px",
                    borderRadius: "60px",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor:
                      referralMethod === "FILE_REFERRAL"
                        ? "transparent"
                        : "#000",
                    background:
                      referralMethod === "FILE_REFERRAL"
                        ? "linear-gradient(90deg, #153259 -0.31%, #418FD1 99.69%)"
                        : "rgba(255, 255, 255, 0.20)",
                    color: referralMethod === "FILE_REFERRAL" ? "#fff" : "#000",
                    textAlign: "center",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "24px",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  Upload Request
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      )}

      <Button
        variant="greenGradient"
        size="medium"
        onClick={handleNext}
        disabled={!referralType || !referralMethod}
        sx={{
          position: "absolute",
          bottom: "0",
          right: "0",
        }}
        endIcon={<ArrowForwardIosIcon />}
      >
        Next
      </Button>
    </Box>
  );
};

export default SelectReferralType;
