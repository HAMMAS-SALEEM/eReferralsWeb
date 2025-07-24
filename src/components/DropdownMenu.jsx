// DropdownMenu.jsx
import React, { useRef, useState, useEffect } from "react";
import { Button, Menu, MenuItem, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowDown from "../assets/icons/ArrowDown.svg";

// Styled Button Component
const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  justifyContent: "flex-start",
  padding: "8px 12px",
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "inherit",
  },
}));

const StyledIcon = styled("img")(({ theme }) => ({
  width: "14px",
  height: "14px",
  marginLeft: "8px",
}));

const DropdownMenu = ({
  options,
  value,
  onChange,
  placeholder,
  width = "200px",
  ariaLabel,
}) => {
  const buttonRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuWidth, setMenuWidth] = useState(null); // State to hold button width
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    handleCloseMenu();
  };

  // Effect to set the menu width to match the button width when menu opens
  useEffect(() => {
    if (open && buttonRef.current) {
      const buttonWidth = buttonRef.current.offsetWidth;
      setMenuWidth(buttonWidth);
    }
  }, [open]);

  return (
    <Box sx={{ width }}>
      {/* Uncomment if label is needed */}
      {/* <Typography
        variant="subtitle1"
        sx={{ mb: 1, color: "#163458", fontWeight: 600 }}
      >
        {label}
      </Typography> */}
      <StyledButton
        ref={buttonRef} // Attach ref to the button
        aria-controls={open ? "dropdown-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleOpenMenu}
        aria-label={ariaLabel}
        disableRipple // Disable ripple effect for cleaner look
      >
        <Typography
          variant="body1"
          color={value ? "textPrimary" : "textSecondary"}
          sx={{
            color: "#000",
            padding: 0,
            lineHeight: 1,
            fontSize: "14px",
            flexGrow: 1, // Ensure the text takes available space
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {value ? value : placeholder}
        </Typography>
        <StyledIcon src={ArrowDown} alt="Dropdown Arrow" />
      </StyledButton>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            width: menuWidth, // Set the menu width to match the button
            maxHeight: 300,
            backgroundColor: "rgba(0, 0, 0, 1)", // Set background color
            overflowY: "auto",
            zIndex: 1300, // Ensure it's above other elements
            // Scrollbar styles for WebKit browsers
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderRadius: "4px",
              transition: "background-color 0.3s",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            },
            // Scrollbar styles for Firefox
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255, 255, 255, 0.3) transparent",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === value}
            onClick={() => handleSelect(option.value)}
            sx={{
              color: "#FFF", // White text for better contrast
              "&.Mui-selected": {
                backgroundColor: "rgba(255, 255, 255, 0.1)", // Light highlight for selected item
              },
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.15)", // Slightly darker on hover
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default DropdownMenu;
