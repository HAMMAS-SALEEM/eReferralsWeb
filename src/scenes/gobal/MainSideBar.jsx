import { useContext, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";

// Images and Icons
import BuildingIcon from "../../assets/icons/BuildingIcon";
import paper2Ic from "../../assets/icons/paper2_ic.svg";
// import brandName from "../../assets/icons/brand_name.svg";
import brandName from "../../assets/images/eRequestLogo.svg";
import {
  DarkModeOutlined,
  LightModeOutlined,
  Logout,
} from "@mui/icons-material";
import DoubleArrow from "../../assets/icons/DoubleArrow";
import ReferralIcon from "../../assets/icons/ReferralIcon";
import UsersIcon from "../../assets/icons/UsersIcon";
import AnalyticsIcon from "../../assets/icons/AnalyticsIcon";
import ProfileIcons from "../../assets/icons/ProfileIcons";
import SettingsIcon from "../../assets/icons/SettingsIcon";
import DoubleArrowClose from "../../assets/icons/DoubleArrowClose";
import DashboardIcon from "../../assets/icons/DashboardIcon";
import MainContext from "../../context/MainContext";
import { logout } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

const MainSideBar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const mode = theme.palette.mode;
  const colorMode = useContext(ColorModeContext);

  const handleLogout = () => {
    dispatch(logout());
    // window.location.href = '/login'
  };

  const { collapsed, handleToggleCollapse } = useContext(MainContext);

  const Item = ({ title, to, icon, selected, isDisabled }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
      <Link to={!isDisabled ? to : "#"}>
        <MenuItem
          active={selected === title}
          style={{ color: colors.grey[100] }}
          onClick={() => setSelected(title)}
          icon={icon}
        >
          <Typography sx={{ fontWeight: 600, fontSize: "20px" }}>
            {title}
          </Typography>
        </MenuItem>
      </Link>
    );
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.grey[400]} !important`,
        },
        "& .ps-sidebar-root": {
          border: "none",
        },
        "& .ps-sidebar-container": {
          background: "transparent",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner0item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .ps-menu-button:hover": {
          backgroundColor:
            mode === "light" ? `#ffffff90 !important` : "#00000090 !important",
        },
        mr: "14px",
        // Added CSS for sticky sidebar
        position: "sticky", // Makes the sidebar sticky
        top: 0, // Adjusts the top position for sticky
        height: "100vh", // Ensures the sidebar spans the full height of the viewport
        zIndex: 1000, // Ensures it stays on top of other content if necessary
        // mr: "14px",
      }}
    >
      <Sidebar collapsed={collapsed} style={{ height: "100%" }}>
        <Menu iconShape="square" style={{ height: "100%" }}>
          <Box
            sx={{
              marginBottom: "14px",
              paddingLeft: "22px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              width: collapsed ? "80px" : "250px",
              transition: "width 0.2s ease",
              height: "50px",
            }}
          >
            <img src={paper2Ic} width="32" height="40" alt="logo" />
            {collapsed ? (
              ""
            ) : (
              <img
                src={brandName}
                alt="logo"
                style={{
                  transition: "opacity 0.3s",
                  opacity: collapsed ? 0 : 1,
                }}
              />
            )}
          </Box>
          <Stack
            sx={{
              padding: " 12px 0",
              gap: "12px",
              background: `${
                mode === "light" ? colors.grey[800] : "#000000B2"
              }`,
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          >
            <Box onClick={() => handleToggleCollapse(!collapsed)}>
              <Item
                title="Close"
                icon={
                  collapsed ? (
                    <DoubleArrow mode={mode} />
                  ) : (
                    <DoubleArrowClose mode={mode} />
                  )
                }
              />
            </Box>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<DashboardIcon mode={mode} />}
              selected={selected}
              setSelected={setSelected}
            />
          </Stack>

          <Stack
            sx={{
              justifyContent: "space-between",
              height: "calc(100vh - (88px + 136px + 16px))",
              background: `${
                mode === "light" ? colors.grey[800] : "#000000B2"
              }`,
              borderRadius: "8px",
              padding: "12px 0",
            }}
          >
            <Box>
              <Item
                title="Requests"
                to="/referrals"
                icon={<ReferralIcon mode={mode} />}
                selected={selected}
                setSelected={setSelected}
              />
              {/* <Item
                title="Referrals"
                to="/referrals"
                icon={<ReferralIcon mode={mode} />}
                selected={selected}
                setSelected={setSelected}
              /> */}

              <Box>
                <Item
                  title="Service providers"
                  to="/serviceProvider"
                  icon={<BuildingIcon mode={mode} />}
                  selected={selected}
                  setSelected={setSelected}
                  // isDisabled
                />
              </Box>

              {/* <Tooltip title="This feature is coming soon" placement="right">
                <Box>
                  <Item
                    title="Business users"
                    to="/businessUsers"
                    icon={<UsersIcon mode={mode} />}
                    selected={selected}
                    setSelected={setSelected}
                    isDisabled
                  />
                </Box>
              </Tooltip> */}
              <Tooltip title="This feature is coming soon" placement="right">
                <Box>
                  <Item
                    title="Analytics"
                    to="/analytics"
                    icon={<AnalyticsIcon mode={mode} />}
                    selected={selected}
                    setSelected={setSelected}
                    isDisabled
                  />
                </Box>
              </Tooltip>
            </Box>
            <Box>
              {/* <Box onClick={colorMode.toggleColorMode}> */}
              <Box>
                <Item
                  title="Mode"
                  icon={
                    theme.palette.mode === "dark" ? (
                      <DarkModeOutlined sx={{ fontSize: "28px" }} />
                    ) : (
                      <LightModeOutlined sx={{ fontSize: "28px" }} />
                    )
                  }
                  selected={selected}
                  setSelected={setSelected}
                />
              </Box>

              <Item
                title="Profile"
                to="/profile"
                icon={<ProfileIcons mode={mode} />}
                selected={selected}
                setSelected={setSelected}
              />

              <Box>
                <Item
                  title="Settings"
                  to="/settings"
                  icon={<SettingsIcon mode={mode} />}
                  selected={selected}
                  setSelected={setSelected}
                  isDisabled
                />
              </Box>

              <MenuItem
                title="Logout"
                style={{ color: colors.grey[100] }}
                onClick={handleLogout}
                icon={<Logout mode={mode} sx={{ fontSize: "28px" }} />}
              >
                <Typography sx={{ fontWeight: 600, fontSize: "20px" }}>
                  Logout
                </Typography>
              </MenuItem>
            </Box>
          </Stack>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MainSideBar;
