import {
  Box,
  Button,
  Checkbox,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import FlexBox from "../../components/FlexBox";
import brandName from "../../assets/icons/login_logo.svg";
import colorGradient from "../../assets/login_gradient.png";

import {
  KeyboardArrowRight,
  LocalPhoneOutlined,
  MailOutline,
  PermIdentityOutlined,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import { useState } from "react";

const StyledLoginInput = styled.input`
  border-radius: 42px;
  background: #fff;
  display: flex;
  width: 100%;
  height: 26px;
  padding: 16.5px 46px;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border: none;
  font-size: 18px;
  height: 47px;
`;

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  "&.Mui-checked": {
    color: theme.palette.mode === "dark" ? "#85e599" : "#102645",
  },
}));

const Signup = () => {
  const [selected, setSelected] = useState("Practitioners");

  const handleSelect = (option) => {
    setSelected(option);
  };

  return (
    <FlexBox
      sx={{
        height: "100svh",
        background: "#f2f2f2",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        // gap: '16px',
      }}
    >
      <img src={brandName} alt="logo" />
      <img
        src={colorGradient}
        alt="colorGradient"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "100vh",
          width: "100vw",
        }}
      />
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: "500",
          color: "#17355D",
          zIndex: 2,
        }}
      >
        Sign up for
      </Typography>
      <Typography
        sx={{
          fontSize: "36px",
          lineHeight: "36px",
          fontWeight: "500",
          color: "#17355D",
          zIndex: 3,
          mb: "16px",
        }}
      >
        BETA VERSION
      </Typography>
      <FlexBox
        sx={{
          border: "2px solid black",
          padding: "3px",
          borderRadius: "50px",
          zIndex: 5,
          gap: "16px",
          margin: "8px 0 30px",
        }}
      >
        <Box
          sx={{
            padding: "10px",
            width: "250px",
            fontWeight: 600,
            textAlign: "center",
            borderRadius: "50px",
            background:
              selected === "Practitioners" &&
              "linear-gradient(90deg, #418fd1  -0.31%,  #153259 99.69%)",
            color: selected === "Practitioners" ? "white" : "black",
          }}
          onClick={() => handleSelect("Practitioners")}
        >
          For Practitioners
        </Box>
        <Box
          sx={{
            padding: "10px",
            width: "250px",
            fontWeight: 600,
            textAlign: "center",
            borderRadius: "50px",
            background:
              selected === "Patients" &&
              "linear-gradient(90deg, #418fd1  -0.31%,  #153259 99.69%)",
            color: selected === "Patients" ? "white" : "black",
          }}
          onClick={() => handleSelect("Patients")}
        >
          For Patients
        </Box>
      </FlexBox>

      <FlexBox
        sx={{
          flexDirection: "column",
          width: "640px",
          gap: "25px",
          zIndex: 3,
        }}
      >
        <Box sx={{ position: "relative" }}>
          <StyledLoginInput
            type="text"
            name="fullName"
            placeholder="Enter your full name"
          />
          <PermIdentityOutlined
            sx={{ position: "absolute", left: "18px", top: "14px" }}
          />
        </Box>
        <FlexBox sx={{ gap: "12px", width: "100%" }}>
          <Box sx={{ position: "relative", width: "100%" }}>
            <StyledLoginInput
              type="text"
              name="phoneNumber"
              placeholder="Enter your phone number"
            />
            <LocalPhoneOutlined
              sx={{ position: "absolute", left: "18px", top: "14px" }}
            />
          </Box>

          <Box sx={{ position: "relative", width: "100%" }}>
            <StyledLoginInput
              type="email"
              name="email"
              placeholder="Enter your email address"
            />
            <MailOutline
              sx={{ position: "absolute", left: "18px", top: "14px" }}
            />
          </Box>
        </FlexBox>
        <FlexBox gap="5px" sx={{ alignItems: "center", margin: "0 auto" }}>
          <StyledCheckbox required />
          <Typography sx={{ fontSize: "14spx" }}>
            I agree with the storage & processing of my personal data
          </Typography>
        </FlexBox>

        <FlexBox gap="11px" justifyContent="center">
          <Link
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Terms
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              alignSelf: "center",
              width: "2px",
              height: "50%",
              backgroundColor: "currentColor",
            }}
          />

          <Link
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Privacy
          </Link>
        </FlexBox>
        <Box sx={{ margin: "0 auto" }}>
          <Button
            className="main-btn-2"
            type="submit"
            sx={{
              textTransform: "capitalize",
            }}
          >
            Get Starting <KeyboardArrowRight />
          </Button>
        </Box>
      </FlexBox>
    </FlexBox>
  );
};

export default Signup;
