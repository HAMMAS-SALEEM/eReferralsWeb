import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import FlexBox from "../../components/FlexBox";
import brandName from "../../assets/icons/login_logo.svg";
import colorGradient from "../../assets/login_gradient.png";

import { KeyboardArrowRight, MailOutline } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const StyledLoginInput = styled.input`
  border-radius: 42px;
  background: #fff;
  display: flex;
  width: 100%;
  height: 26px;
  padding: 16.5px 50px;
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

const ForgetPassword = () => {
  const [formData, setForData] = useState({
    email: "",
  });

  const { email } = formData;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onChange = (e) => {
    setForData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      // console.log('Forget password clicked')
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <FlexBox
      sx={{
        height: "100svh",
        background: "#f2f2f2",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "16px",
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
          fontSize: "36px",
          fontWeight: "500",
          color: "#17355D",
          zIndex: 2,
        }}
      >
        Forget password?
      </Typography>
      <form
        onSubmit={handleForgetPassword}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "471px",
          gap: "25px",
          zIndex: 3,
        }}
      >
        <Box sx={{ position: "relative" }}>
          <StyledLoginInput
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
            required
          />

          <MailOutline
            sx={{ position: "absolute", left: "18px", top: "14px" }}
          />
        </Box>

        <Button
          className="main-btn-3"
          type="submit"
          sx={{
            textTransform: "capitalize",
          }}
        >
          Confirm email <KeyboardArrowRight />
        </Button>

        <Box sx={{ margin: "0 auto", marginTop: "48px" }}>
          <Link
            href="/login"
            sx={{ fontSize: "18px", fontWeight: 600, cursor: "pointer" }}
          >
            Back to Sign in
          </Link>
        </Box>

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
      </form>
    </FlexBox>
  );
};

export default ForgetPassword;
