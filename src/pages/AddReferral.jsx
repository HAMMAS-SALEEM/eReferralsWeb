import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import theme from "../styles/referralTheme";
import SelectPatient from "./referral/SelectPatient";
import SelectReferralType from "./referral/SelectReferralType";
import CreateReferral from "./CreateReferral";
import SendReferral from "./referral/SendReferral";
import { Box } from "@mui/material";
import ViewReferral from "./ViewReferral";
import ContinueReferral from "./referral/ContinueReferral";

const AddReferral = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#E9E9E9",
          borderRadius: "8px",
          boxShadow: "0px 0px 39px 0px rgba(0, 0, 0, 0.10)",
          width: "100%",
          height: "90vh",
          padding: "20px",
          minHeight: "calc(100vh - 24px)",
          overflowY: "auto",
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
          // scrollbarWidth: "none",
          transition: "max-height 0.3s ease", // Smooth transition
        }}
      >
        <Routes>
          <Route index element={<SelectPatient />} />
          <Route path="select-referral-type" element={<SelectReferralType />} />
          <Route path="create-referral" element={<CreateReferral />} />
          <Route path="view-referral/:id" element={<ViewReferral />} />
          <Route path="send-referral/:id" element={<SendReferral />} />
          <Route path="continue-referral/:id" element={<ContinueReferral />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default AddReferral;
