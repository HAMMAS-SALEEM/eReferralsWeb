import React, { useState, useEffect } from "react";
import { Box, IconButton, InputBase, Paper, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Close";
import { LayersClear } from "@mui/icons-material";
import { cleanDigitSectionValue } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";

const ReferralSearchBar = ({
  searchTerm,
  handleSearchInputChange,
  toggleFilters,
  clearFilters,
  isFilterOpen,
}) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearchInputChange({
        target: { value: formatSearchTerm(inputValue) },
      });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    handleSearchInputChange({ target: { value: "" } });
  };

  // Format date search terms from AU to US format
  const formatSearchTerm = (term) => {
    if (term.includes("/")) {
      const parts = term.split("/");

      // Check for single day-only cases
      if (parts.length === 2 && parts[0].length === 1 && parts[1] === "") {
        // Format: D/ ➔ -0D
        return `-0${parts[0]}`;
      } else if (
        parts.length === 2 &&
        parts[0].length === 2 &&
        parts[1] === ""
      ) {
        // Format: DD/ ➔ -DD
        return `-${parts[0]}`;
      }

      // Check for day/month cases with single and double digit day and month
      if (
        parts.length === 2 &&
        parts[0].length === 1 &&
        parts[1].length === 2
      ) {
        // Format: D/MM ➔ MM-0D
        return `${parts[1]}-0${parts[0]}`;
      } else if (
        parts.length === 2 &&
        parts[0].length === 1 &&
        parts[1].length === 1
      ) {
        // Format: D/M ➔ 0M-0D
        return `0${parts[1]}-0${parts[0]}`;
      } else if (
        parts.length === 2 &&
        parts[0].length === 2 &&
        parts[1].length === 1
      ) {
        // Format: DD/M ➔ 0M-DD
        return `0${parts[1]}-${parts[0]}`;
      } else if (
        parts.length === 2 &&
        parts[0].length === 2 &&
        parts[1].length === 2
      ) {
        // Format: DD/MM ➔ MM-DD
        return `${parts[1]}-${parts[0]}`;
      }

      // Check for month/year format
      if (parts.length === 2 && parts[1].length === 4) {
        // Format: MM/YYYY ➔ YYYY-MM
        return `${parts[1]}-${parts[0]}`;
      }

      // Check for full date format
      if (parts.length === 3) {
        // Format: DD/MM/YYYY ➔ YYYY-MM-DD
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }
    return term; // Return unmodified if not a recognized format
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Paper
        component="form"
        onSubmit={(e) => e.preventDefault()}
        sx={{
          p: "2px 10px",
          display: "flex",
          alignItems: "center",
          borderRadius: "50px",
          width: "487px",
          maxWidth: 600,
          backgroundColor: "#fff",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Requests..."
          inputProps={{
            "aria-label": "search Requests",
            style: {
              color: "rgba(0, 0, 0, 1)",
              fontFamily: "Albert Sans",
              fontSize: "20px",
              fontWeight: 400,
              padding: "9px 0px",
            },
          }}
          value={inputValue}
          onChange={handleInputChange}
        />
        {inputValue ? (
          <IconButton
            onClick={handleClear}
            sx={{ p: "10px" }}
            aria-label="clear search"
          >
            <ClearIcon sx={{ color: "#000", fontSize: "24px", opacity: 0.5 }} />
          </IconButton>
        ) : (
          <IconButton sx={{ p: "10px" }} aria-label="search">
            <SearchIcon
              sx={{ color: "#000", fontSize: "24px", opacity: 0.3 }}
            />
          </IconButton>
        )}
      </Paper>

      <Tooltip title="Filters" position="left">
        <IconButton
          onClick={toggleFilters}
          aria-label="filter"
          sx={{
            ml: 2,
            backgroundColor: isFilterOpen
              ? "rgba(0, 0, 0, 0.5)"
              : "rgba(0, 0, 0, 1)",
            border: isFilterOpen ? "2px solid #4CAF50" : "none",
            boxShadow: isFilterOpen ? "0 0 8px #67DE7F" : "none",
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            mb: 0.5,
          }}
        >
          <FilterListIcon
            sx={{
              color: "#bed0e3",
              width: "30px",
              height: "30px",
              filter: "drop-shadow(0px 0px 9px #67DE7F)",
            }}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Clear Filters" position="left">
        <IconButton onClick={clearFilters}>
          <LayersClear
            sx={{
              color: "#bed0e3",
              width: "30px",
              height: "30px",
              filter: "drop-shadow(0px 0px 9px #67DE7F)",
            }}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ReferralSearchBar;
