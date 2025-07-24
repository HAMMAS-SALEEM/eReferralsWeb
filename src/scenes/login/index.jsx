import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Link,
  Typography,
} from "@mui/material";
import FlexBox from "../../components/FlexBox";
import brandName from "../../assets/icons/login_logo.svg";
import colorGradient from "../../assets/login_gradient.png";
import { KeyboardArrowRight, LockOutlined, Person } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../store/slices/authSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword((v) => !v);


  const {
    loading: isLoading,
    token,
    error,
  } = useSelector((state) => state.auth);

  // State variables for input fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const onLogin = (e) => {
    e.preventDefault();
    const values = { username, password };
    dispatch(login(values));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (token) {
      navigate("/referrals");
    }
  }, [navigate, token]);

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
        Sign in
      </Typography>
      <form
        onSubmit={onLogin}
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
            name="username"
            id="username"
            value={username}
            onChange={onChange}
            placeholder="User name"
            required
          />

          <Person sx={{ position: "absolute", left: "18px", top: "14px" }} />
        </Box>
        <Box sx={{ position: "relative" }}>
          <StyledLoginInput
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            required
            style={{ paddingRight: "50px" }} // Make space for icon
          />
          <LockOutlined
            sx={{ position: "absolute", left: "18px", top: "14px" }}
          />
          <Box
            sx={{
              position: "absolute",
              right: "18px",
              top: "13px",
              cursor: "pointer",
              zIndex: 2,
              color: "#bdbdbd",
            }}
            onClick={handleTogglePassword}
            tabIndex={0}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </Box>
        </Box>
        <Button
          className="main-btn-3"
          type="submit"
          sx={{
            textTransform: "capitalize",
            width: "50%",
            margin: "0 auto",
            fontSize: "19px",
            fontWeight: 600,
            borderRadius: "32px",
            py: 1.2,
            background:
              "linear-gradient(271deg, #2D6465 -11.45%, #3A806B -11.45%, #67DE7F 123.02%)",
            boxShadow: "0 2px 8px rgba(86, 227, 144, 0.09)",
            position: "relative",
            overflow: "hidden",
            transition:
              "transform 0.2s cubic-bezier(.4,1.2,.6,1), box-shadow 0.2s cubic-bezier(.4,1.2,.6,1), filter 0.2s",
            transform: "scale(1)",
            "&:hover": {
              transform: "scale(1.07)",
              boxShadow: "0 8px 32px rgba(44,180,111,0.29)",
              filter: "brightness(1.08)",
              background:
                "linear-gradient(271deg, #36a67c 5%, #61da7a 105%)",
              "&::before": {
                left: "120%",
              },
            },
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-75%",
              width: "50%",
              height: "100%",
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.10) 100%)",
              transform: "skewX(-25deg)",
              transition: "left 0.5s cubic-bezier(.4,1.2,.6,1)",
              pointerEvents: "none",
            },
          }}
          disabled={!username || !password}
        >
          {isLoading ? (
            <CircularProgress sx={{ color: "#fff", my: "4px" }} size={24} />
          ) : (
            <>
              Sign in <KeyboardArrowRight />
            </>
          )}
        </Button>

        <Box sx={{ margin: "0 auto", marginTop: "24px" }}>
          <Link
            href="https://app.erequests.com.au/auth/forgot-password"
            sx={{ fontSize: "18px", fontWeight: 600, cursor: "pointer" }}
            target="_blank"
          >
            Password Reset
          </Link>
        </Box>
      </form>
    </FlexBox>
  );
};

export default Login;
