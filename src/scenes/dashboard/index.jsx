import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  useTheme,
  Backdrop,
} from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { AccountCircleOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProfile } from "../../store/thunks/fetchProfile";
import "../../index.css";
import YourAnalytics from "../../assets/images/your-analytics.svg";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { logout } from "../../store/slices/authSlice";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profileData = useSelector((state) => state.profile.data);

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(fetchProfile()).unwrap();

      if (result.status !== 200) {
        dispatch(logout());
        window.location.href = "/login";
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  const referrals = [
    {
      name: "Jack McKenzie",
      referralCode: "M847473",
      timestamp: "4 minutes ago",
    },
    {
      name: "Sarah Foster",
      referralCode: "D828383",
      timestamp: "10 minutes ago",
    },
    { name: "You sent", referralCode: "F547271", timestamp: "yesterday" },
    { name: "Jack McKenzie", referralCode: "M847473", timestamp: "22/09/2024" },
  ];

  const activities = [
    {
      name: "You sent",
      referralCode: "M847473",
      timestamp: "4 minutes ago",
    },
    {
      name: "You sent",
      referralCode: "D828383",
      timestamp: "4 minutes ago",
    },
    { name: "You sent", referralCode: "F547271", timestamp: "4 minutes ago" },
    { name: "You sent", referralCode: "M847473", timestamp: "4 minutes ago" },
  ];

  const data = {
    labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
    datasets: [
      {
        label: "Created",
        data: [15, 20, 35, 45, 30, 25, 20],
        borderColor: "rgba(118, 179, 252, 0.8)",
        backgroundColor: "rgba(118, 179, 252, 0.1)",
        fill: false,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "white",
        pointBorderColor: "rgba(118, 179, 252, 1)",
        pointBorderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Completed",
        data: [10, 15, 25, 40, 25, 20, 15],
        borderColor: "rgba(0, 193, 167, 0.8)",
        backgroundColor: "rgba(0, 193, 167, 0.1)",
        fill: false,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "white",
        pointBorderColor: "rgba(0, 193, 167, 1)",
        pointBorderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Sent",
        data: [5, 10, 20, 35, 20, 15, 10],
        borderColor: "rgba(126, 104, 255, 0.8)",
        backgroundColor: "rgba(126, 104, 255, 0.1)",
        fill: false,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "white",
        pointBorderColor: "rgba(126, 104, 255, 1)",
        pointBorderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px 36px",
        fontSize: "18px",
        fontWeight: 600,
        backgroundColor: colors.grey[700],
        gap: "3%",
        width: "100%",
      }}
    >
      <Stack
        direction="row"
        sx={{
          mb: "16px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center", gap: "27px" }}>
          <Avatar sx={{ width: "60px", height: "60px" }} />
          <Stack>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "700",
                lineHeight: "24px",
              }}
            >
              {profileData?.data?.doctor?.first_name}{" "}
              {profileData?.data?.doctor?.last_name}
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                lineHeight: "24px",
              }}
            >
              {profileData?.data?.doctor?.email}
            </Typography>
          </Stack>
        </Stack>

        <Button
          variant="contained"
          sx={{
            display: "inline-flex",
            height: "50px",
            padding: "4px 25px",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
            borderRadius: "60px",
            backgroundColor: "#000",
            color: "#fff",
            fontSize: "18px",
            fontWeight: 600,
            textTransform: "capitalize",
          }}
          onClick={() => navigate("/profile")}
        >
          Profile <AccountCircleOutlined sx={{ fontSize: 28 }} />
        </Button>
      </Stack>

      <Stack direction="row" sx={{ alignItems: "center", gap: "26px" }}>
        {/* Notifications Section */}
        <Box
          sx={{
            mt: "72px",
            width: "589px",
            background: "#E1E1E1",
            padding: "15px 17px",
            borderRadius: "6px",
            position: "relative",
          }}
        >
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography
              sx={{
                color: "#000",
                fontSize: "24px",
                fontWeight: 600,
                lineHeight: "24px",
              }}
            >
              Notifications
            </Typography>

            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Typography
                component="span"
                sx={{
                  position: "relative",
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  background:
                    "linear-gradient(90deg, #00285F 0%, #007BE5 100%)",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
              />
              <Typography
                sx={{
                  background:
                    "linear-gradient(180deg, #00285F 0%, #007BE5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                2 new notifications
              </Typography>
            </Stack>
          </Stack>

          <Stack sx={{ gap: "10px", mt: "38px" }}>
            {referrals.map((referral, index) => (
              <Box
                key={index}
                sx={{
                  padding: "12px",
                  borderRadius: "4px",
                  background: "#fff",
                  marginBottom: "8px",
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: 500,
                      color: "rgba(0, 0, 0, 0.50)",
                    }}
                  >
                    REFERRALS
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: 500,
                      color: "rgba(0, 0, 0, 0.50)",
                    }}
                  >
                    {referral.timestamp}
                  </Typography>
                </Stack>
                <Box mt="8px">
                  <Typography
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>{referral.name} </span>
                    completed referral {referral.referralCode}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>

          {/* Backdrop for Notifications */}
          <Backdrop
            open={true}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "6px",
              backdropFilter: "blur(2px)",
              color: "#000",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box sx={{ backgroundColor: "white" }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "24px",
                  textAlign: "center",
                  padding: "4px 20px",
                  borderRadius: "5px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                New Feature Coming Soon...
              </Typography>
            </Box>
          </Backdrop>
        </Box>

        {/* Your Activities Section */}
        <Box
          sx={{
            mt: "72px",
            width: "589px",
            background: "#E1E1E1",
            padding: "15px 17px",
            borderRadius: "6px",
            position: "relative",
          }}
        >
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography
              sx={{
                color: "#000",
                fontSize: "24px",
                fontWeight: 600,
                lineHeight: "24px",
              }}
            >
              Your activities
            </Typography>
          </Stack>

          <Stack sx={{ gap: "10px", mt: "38px" }}>
            {activities.map((referral, index) => (
              <Box
                key={index}
                sx={{
                  padding: "12px",
                  borderRadius: "4px",
                  background: "#fff",
                  marginBottom: "8px",
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: 500,
                      color: "rgba(0, 0, 0, 0.50)",
                    }}
                  >
                    REFERRALS
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: 500,
                      color: "rgba(0, 0, 0, 0.50)",
                    }}
                  >
                    {referral.timestamp}
                  </Typography>
                </Stack>
                <Box mt="8px">
                  <Typography
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>{referral.name} </span>
                    completed referral {referral.referralCode}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>

          {/* Backdrop for Your Activities */}
          <Backdrop
            open={true}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(2px)",
              borderRadius: "6px",
              color: "#000",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box sx={{ backgroundColor: "white" }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "24px",
                  textAlign: "center",
                  padding: "4px 20px",
                  borderRadius: "5px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                New Feature Coming Soon...
              </Typography>
            </Box>
          </Backdrop>
        </Box>
      </Stack>

      <img src={YourAnalytics} />
    </Paper>
  );
};

export default Dashboard;
