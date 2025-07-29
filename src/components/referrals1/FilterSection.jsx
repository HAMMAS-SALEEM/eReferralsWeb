import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import CheckboxIcon from "../../assets/icons/CheckboxTransparent.svg";
import CheckedIconBlack from "../../assets/icons/CheckedIconBlack.svg";
// import CheckedboxTransparent from "../../assets/icons/CheckedboxTransparent.svg";
import { Circle } from "@mui/icons-material";
import DropdownMenu from "../DropdownMenu";
import { styled } from "@mui/material/styles";

const StyledLabel = styled(Typography)(({ theme }) => ({
  color: "#000",
  fontWeight: 500,
}));

const StyledChip = styled(Chip)(({ theme, chipWidth }) => ({
  width: 200, // Dynamic width based on the widest Chip
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative", // To position the icon absolutely
  borderRadius: "20px",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  color: "#FFF",
  fontSize: "14px",
  maxHeight: "20px",
  padding: "0", // Remove default padding
  "& .MuiChip-icon": {
    position: "absolute",
    left: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "8px !important",
  },
  "& .MuiChip-label": {
    textAlign: "center",
    width: "100%", // Make label take full width for centering
    marginLeft: "0", // Remove any default margin
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

// Reusable StyledCheckbox Component with ref forwarding
const StyledCheckbox = React.forwardRef(
  (
    {
      checked,
      onChange,
      name,
      label,
      chipProps, // Optional: Props for Chip label
      chipWidth, // Pass dynamic width
    },
    ref
  ) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={onChange}
            name={name}
            icon={
              <img
                src={CheckboxIcon}
                style={{ height: "12px", width: "12px" }}
                alt="Checkbox Icon"
              />
            }
            checkedIcon={
              <img
                src={CheckedIconBlack}
                style={{ height: "12px", width: "12px" }}
                alt="Checkbox Icon"
              />
            }
          />
        }
        label={
          chipProps ? (
            <StyledChip
              ref={ref}
              chipWidth={chipWidth}
              icon={chipProps.icon}
              label={chipProps.label}
            />
          ) : (
            <StyledLabel>{label}</StyledLabel>
          )
        }
      />
    );
  }
);

const FilterSection = ({
  referralScope,
  selectedType,
  selectedStatuses,
  isArchived,
  dobFilter,
  creationDateRange,
  handleReferralScopeChange,
  handleTypeChange, // Function to handle referral type changes
  handleStatusChange,
  setIsArchived,
  handleDobFilterChange,
  handleCreationDateRangeChange,
}) => {
  const handleReferralTypeChange = (type) => {
    if (selectedType === type) {
      // If the same type is selected, allow deselection (set null)
      handleTypeChange(null);
    } else {
      // Otherwise, set the selected type and deselect the other
      handleTypeChange(type);
    }
  };

  // Define options for dropdowns
  const days = Array.from({ length: 31 }, (_, i) => ({
    value: i + 1,
    label: i + 1,
  }));

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].map((month, index) => ({
    value: index + 1,
    label: month,
  }));

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => ({
    value: currentYear - i,
    label: currentYear - i,
  }));

  // State to hold maximum chip width
  const [maxChipWidth, setMaxChipWidth] = useState(0);

  // Refs for all Chips
  const chipRefs = useRef([]);

  // Status labels with name, label, and color
  const statusLabels = [
    { name: "draft", label: "Unfinished Draft", color: "red" },
    { name: "sent", label: "Request Sent", color: "#83BCFF" },
    { name: "booked", label: "Investigation Booked", color: "#FFF383" },
    { name: "completed", label: "Test Completed", color: "#42FF00" },
    { name: "results", label: "Results Available", color: "#ff03c8ff" },
  ];

  // Effect to calculate maximum chip width after rendering
  useEffect(() => {
    if (chipRefs.current.length === 0) return;

    const widths = chipRefs.current.map((ref) => {
      return ref ? ref.offsetWidth : 0;
    });

    const maxWidth = Math.max(...widths, 0);
    setMaxChipWidth(maxWidth);
  }, [selectedStatuses]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: { xs: "8px", sm: "10px", md: "14px" }, // Responsive padding
        backgroundColor: "rgba(255, 255, 255, 0.70)",
        borderRadius: "8px",
        marginBottom: "20px",
        gap: { xs: "8px", sm: "12px", md: "16px" }, // Responsive gap
        maxHeight: { xs: "auto", md: "164px" }, // Adjust maxHeight on smaller screens
        transition: "max-height 0.3s ease", // Smooth transition
        // flexWrap: "wrap", // Wrap items on smaller screens
      }}
    >
      {/* Referral Scope */}
      <FormControl component="fieldset">
        <Stack spacing={1}>
          <Typography
            sx={{
              color: "#163458",
              fontSize: "18px",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Requests
          </Typography>
          <Stack spacing={1}>
            <StyledCheckbox
              checked={referralScope === "clinic"}
              onChange={() => handleReferralScopeChange("clinic")}
              name="clinic"
              label="Entire Clinic"
            />
            <StyledCheckbox
              checked={referralScope === "mine"}
              onChange={() => handleReferralScopeChange("mine")}
              name="mine"
              label="Only Mine"
            />
          </Stack>
        </Stack>
      </FormControl>
      <Divider orientation="vertical" flexItem opacity={1} />

      {/* Referral Type */}
      <FormControl component="fieldset">
        <Stack spacing={1}>
          <Typography
            variant="h6"
            sx={{ color: "#163458", fontSize: "18px", fontWeight: 600, minWidth: "115px" }}
          >
            Request Type
          </Typography>
          <Stack spacing={1}>
            <StyledCheckbox
              checked={selectedType === "radiology"}
              onChange={() => handleReferralTypeChange("radiology")}
              name="radiology"
              label="Radiology"
            />
            <StyledCheckbox
              checked={selectedType === "pathology"}
              onChange={() => handleReferralTypeChange("pathology")}
              name="pathology"
              label="Pathology"
            />
          </Stack>
        </Stack>
      </FormControl>
      <Divider orientation="vertical" flexItem opacity={1} />

      {/* Status */}
      <FormControl component="fieldset">
        <Stack spacing={1}>
          <Typography
            variant="h6"
            sx={{
              color: "#163458",
              fontSize: "18px",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Status
          </Typography>
          <Stack direction="row" spacing={0}>
            <Stack spacing={1}>
              {statusLabels.slice(0, 2).map((status, index) => (
                <StyledCheckbox
                  key={status.name}
                  ref={(el) => (chipRefs.current[index] = el)}
                  checked={selectedStatuses[status.name]}
                  onChange={handleStatusChange}
                  name={status.name}
                  chipProps={{
                    label: status.label,
                    icon: (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          filter: `drop-shadow(0px 0px 10px ${status.color})`,
                        }}
                      >
                        <Circle
                          sx={{
                            fill: status.color,
                            width: "8px",
                          }}
                        />
                      </Box>
                    ),
                  }}
                  chipWidth={maxChipWidth > 0 ? `${maxChipWidth}px` : undefined}
                />
              ))}
            </Stack>
            <Stack spacing={1}>
              {statusLabels.slice(2).map((status, index) => (
                <StyledCheckbox
                  key={status.name}
                  ref={(el) => (chipRefs.current[index + 2] = el)}
                  checked={selectedStatuses[status.name]}
                  onChange={handleStatusChange}
                  name={status.name}
                  chipProps={{
                    label: status.label,
                    icon: (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          filter: `drop-shadow(0px 0px 10px ${status.color})`,
                        }}
                      >
                        <Circle
                          sx={{
                            fill: status.color,
                            width: "8px",
                          }}
                        />
                      </Box>
                    ),
                  }}
                  chipWidth={maxChipWidth > 0 ? `${maxChipWidth}px` : undefined}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </FormControl>
      <Divider orientation="vertical" flexItem opacity={1} />

      {/* Archived Filter */}
      <FormControl component="fieldset">
        <Stack spacing={1}>
          <Typography
            variant="h6"
            sx={{
              color: "#163458",
              fontSize: "18px",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Archived
          </Typography>
          <StyledCheckbox
            checked={isArchived}
            onChange={() => setIsArchived(!isArchived)}
            name="archived"
            label="Visible"
          />
        </Stack>
      </FormControl>
      <Divider orientation="vertical" flexItem opacity={1} />

      {/* Patient DOB Filter */}
      <FormControl component="fieldset">
        <Stack spacing={1}>
          <Typography
            variant="h6"
            sx={{
              color: "#163458",
              fontSize: "18px",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Patient DOB
          </Typography>
          <Stack direction="row" spacing={0}>
            {/* Day */}
            <DropdownMenu
              label="Day"
              options={days}
              value={dobFilter.day}
              onChange={(val) =>
                handleDobFilterChange({ target: { name: "day", value: val } })
              }
              placeholder="Day"
              width={60} // Adjusted width
              ariaLabel="Day"
            />

            {/* Month */}
            <DropdownMenu
              label="Month"
              options={months}
              value={dobFilter.month}
              onChange={(val) =>
                handleDobFilterChange({ target: { name: "month", value: val } })
              }
              placeholder="Month"
              width={75}
              ariaLabel="Month"
            />

            {/* Year */}
            <DropdownMenu
              label="Year"
              options={years}
              value={dobFilter.year}
              onChange={(val) =>
                handleDobFilterChange({ target: { name: "year", value: val } })
              }
              placeholder="Year"
              width={75} // Changed from 100 to 85 for consistency
              ariaLabel="Year"
            />
          </Stack>
        </Stack>
      </FormControl>
      <Divider orientation="vertical" flexItem opacity={1} />

      {/* Creation Date Range Filter */}
      <FormControl component="fieldset">
        <Stack spacing={1}>
          <Typography
            variant="h6"
            sx={{
              color: "#163458",
              fontSize: "18px",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Creation Date
          </Typography>
          <Stack spacing={1}>
            {/* From */}
            <Stack
              direction="row"
              alignItems="end"
              spacing={1}
              justifyContent={"flex-end"}
            >
              <Typography
                variant="body2"
                gutterBottom
                sx={{
                  lineHeight: "30px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                From
              </Typography>
              <Stack direction="row" spacing={0}>
                <DropdownMenu
                  label="Day"
                  options={days}
                  value={creationDateRange.from.day}
                  onChange={(val) =>
                    handleCreationDateRangeChange({
                      target: { name: "day_from", value: val },
                    })
                  }
                  placeholder="Day"
                  width={60} // Consistent width
                  ariaLabel="Day From"
                />

                <DropdownMenu
                  label="Month"
                  options={months}
                  value={creationDateRange.from.month}
                  onChange={(val) =>
                    handleCreationDateRangeChange({
                      target: { name: "month_from", value: val },
                    })
                  }
                  placeholder="Month"
                  width={75} // Consistent width
                  ariaLabel="Month From"
                />

                <DropdownMenu
                  label="Year"
                  options={years}
                  value={creationDateRange.from.year}
                  onChange={(val) =>
                    handleCreationDateRangeChange({
                      target: { name: "year_from", value: val },
                    })
                  }
                  placeholder="Year"
                  width={75} // Consistent width
                  ariaLabel="Year From"
                />
              </Stack>
            </Stack>

            {/* To */}
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent={"flex-end"}
              spacing={1}
            >
              <Typography
                variant="body2"
                gutterBottom
                sx={{
                  lineHeight: "30px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                To
              </Typography>
              <Stack
                direction="row"
                spacing={0}
              >
                <DropdownMenu
                  label="Day"
                  options={days}
                  value={creationDateRange.to.day}
                  onChange={(val) =>
                    handleCreationDateRangeChange({
                      target: { name: "day_to", value: val },
                    })
                  }
                  placeholder="Day"
                  width={60} // Consistent width
                  ariaLabel="Day To"
                />

                <DropdownMenu
                  label="Month"
                  options={months}
                  value={creationDateRange.to.month}
                  onChange={(val) =>
                    handleCreationDateRangeChange({
                      target: { name: "month_to", value: val },
                    })
                  }
                  placeholder="Month"
                  width={75} // Consistent width
                  ariaLabel="Month To"
                />

                <DropdownMenu
                  label="Year"
                  options={years}
                  value={creationDateRange.to.year}
                  onChange={(val) =>
                    handleCreationDateRangeChange({
                      target: { name: "year_to", value: val },
                    })
                  }
                  placeholder="Year"
                  width={75} // Changed from 100 to 85 for consistency
                  ariaLabel="Year To"
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </FormControl>
    </Box>
  );
};

export default FilterSection;
