// Referrals.js
import { useState, useEffect } from "react";
import { Box, Button, Collapse, Stack } from "@mui/material";
import { useReferrals } from "../hooks/useReferrals";
import FilterSection from "../components/referrals1/FilterSection";
import ReferralTable from "../components/referrals1/ReferralTable";
import ReferralSearchBar from "../components/referrals1/ReferralSearchBar";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import AddPostIcon from "../assets/icons/AddPostIcon";
import SelectedRowsActions from "../components/referrals1/SelectedRowsActions";

const Referrals = () => {
  const [order, setOrder] = useState(null);
  const [orderBy, setOrderBy] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    let isAsc = orderBy === property && order === "asc";
    if (orderBy === null) {
      isAsc = false;
    }
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const initialDobFilter = {
    day: "",
    month: "",
    year: "",
  };

  const initialCreationDateRange = {
    from: {
      day: "",
      month: "",
      year: "",
    },
    to: {
      day: "",
      month: "",
      year: "",
    },
  };

  const initialSelectedStatuses = {
    draft: true,
    sent: true,
    booked: true,
    completed: false,
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [isArchived, setIsArchived] = useState(false);
  const [referralScope, setReferralScope] = useState("mine");
  const [dobFilter, setDobFilter] = useState(initialDobFilter);
  const [creationDateRange, setCreationDateRange] = useState(
    initialCreationDateRange
  );
  const [selectedStatuses, setSelectedStatuses] = useState(
    initialSelectedStatuses
  );

  // Debounce search term changes
  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    handler();

    return () => {
      handler.cancel();
    };
  }, [searchTerm]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value); // Update search term
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedType(null);
    setIsArchived(false);
    setReferralScope("mine");
    setDobFilter(initialDobFilter);
    setCreationDateRange(initialCreationDateRange);
    setSelectedStatuses(initialSelectedStatuses);
  };

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  // Use the useInfiniteQuery hook
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useReferrals(50, {
      statuses: Object.keys(selectedStatuses).filter(
        (key) => selectedStatuses[key]
      ),
      type: selectedType,
      includeArchived: isArchived,
      order: "-created_date",
      fromMe:
        referralScope === "mine"
          ? true
          : referralScope === "clinic"
          ? false
          : undefined,
      dob:
        dobFilter.day && dobFilter.month && dobFilter.year
          ? `${dobFilter.year}-${dobFilter.month
              .toString()
              .padStart(2, "0")}-${dobFilter.day.toString().padStart(2, "0")}`
          : null,
      createdDateRange: {
        from:
          creationDateRange.from.day &&
          creationDateRange.from.month &&
          creationDateRange.from.year
            ? `${creationDateRange.from.year}-${creationDateRange.from.month
                .toString()
                .padStart(2, "0")}-${creationDateRange.from.day
                .toString()
                .padStart(2, "0")}`
            : null,
        to:
          creationDateRange.to.day &&
          creationDateRange.to.month &&
          creationDateRange.to.year
            ? `${creationDateRange.to.year}-${creationDateRange.to.month
                .toString()
                .padStart(2, "0")}-${creationDateRange.to.day
                .toString()
                .padStart(2, "0")}`
            : null,
      },
      searchTerm: debouncedSearchTerm || null, // Pass debounced search term
    });

  // Combine all pages of data
  const allRows = data ? data.pages.flatMap((page) => page.results) : [];

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleReferralScopeChange = (scope) => {
    setReferralScope((prevScope) => (prevScope === scope ? null : scope));
  };

  const handleDobFilterChange = (event) => {
    const { name, value } = event.target;
    setDobFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreationDateRangeChange = (event) => {
    const { name, value } = event.target;
    const [field, range] = name.split("_");
    setCreationDateRange((prevState) => ({
      ...prevState,
      [range]: {
        ...prevState[range],
        [field]: value,
      },
    }));
  };

  const toggleRowSelection = (id) => {
    setSelectedRowIds((prevSelectedRowIds) => {
      if (prevSelectedRowIds.includes(id)) {
        return prevSelectedRowIds.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRowIds, id];
      }
    });
  };

  const clearSelection = () => {
    setSelectedRowIds([]);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        mb={2}
        sx={{ position: "relative" }}
      >
        <Button
          startIcon={<AddPostIcon />}
          sx={{
            background:
              "linear-gradient(271deg, #2D6465 -11.45%, #3A806B -11.45%, #67DE7F 123.02%)",
            borderRadius: "50px",
            fontSize: "18px",
            color: "#fff",
            padding: "11px 22px",
            lineHeight: "16px",
            textTransform: "capitalize",
            fontWeight: 500,
            boxShadow: "0 4px 18px rgba(44,180,111,0.21)",
            position: "relative",
            overflow: "hidden",
            transition:
              "transform 0.2s cubic-bezier(.4,1.2,.6,1), box-shadow 0.2s cubic-bezier(.4,1.2,.6,1), filter 0.2s",
            transform: "scale(1)",
            "&:hover": {
              transform: "scale(1.07)",
              boxShadow: "0 8px 32px rgba(44,180,111,0.29)",
              filter: "brightness(1.08)",
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
          onClick={() => navigate("/add-referral")}
        >
          New Request
        </Button>

        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <ReferralSearchBar
            searchTerm={searchTerm} // Pass search term to child
            handleSearchInputChange={handleSearchInputChange} // Pass handler
            toggleFilters={toggleFilters}
            clearFilters={handleResetFilters}
            isFilterOpen={filtersOpen}
          />
        </Box>
      </Stack>

      <Collapse in={filtersOpen}>
        <FilterSection
          referralScope={referralScope}
          selectedType={selectedType}
          selectedStatuses={selectedStatuses}
          isArchived={isArchived}
          dobFilter={dobFilter}
          creationDateRange={creationDateRange}
          handleReferralScopeChange={handleReferralScopeChange}
          handleTypeChange={handleTypeChange}
          handleStatusChange={(event) =>
            setSelectedStatuses({
              ...selectedStatuses,
              [event.target.name]: event.target.checked,
            })
          }
          setIsArchived={setIsArchived}
          handleDobFilterChange={handleDobFilterChange}
          handleCreationDateRangeChange={handleCreationDateRangeChange}
        />
      </Collapse>

      <Collapse in={selectedRowIds.length > 0}>
        <SelectedRowsActions
          selectedRowIds={selectedRowIds}
          selectedRows={allRows.filter((row) =>
            selectedRowIds.includes(row.id)
          )}
          clearSelection={clearSelection}
        />
      </Collapse>

      <ReferralTable
        rows={allRows}
        toggleRowSelection={toggleRowSelection}
        isRowSelected={(id) => selectedRowIds.includes(id)}
        setSelectedRowIds={setSelectedRowIds}
        selectedRowIds={selectedRowIds}
        isLoading={isLoading}
        order={order}
        orderBy={orderBy}
        handleRequestSort={handleRequestSort}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isFilterOpen={filtersOpen}
      />
    </Box>
  );
};

export default Referrals;
