// ReferralTable.js
import { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TableRow,
  TableCell,
  TableHead,
  Typography,
} from "@mui/material";
import ReferralRow from "../../components/referrals1/ReferralRow";
import ReferralTableHead from "./ReferralTableHead";
import GradientCircularProgress from "../../components/GradientCircularProgress";

// Step 4: Implement comparator functions
function descendingComparator(a, b, orderBy) {
  let valueA;
  let valueB;
  switch (orderBy) {
    case "type":
      valueA = a.type || "";
      valueB = b.type || "";
      break;
    case "created_date":
      valueA = a.created_date || "";
      valueB = b.created_date || "";
      break;
    case "created_by":
      valueA = a.created_by || "";
      valueB = b.created_by || "";
      break;
    case "patient":
      valueA = a.patient_data
        ? `${a.patient_data.first_name} ${a.patient_data.last_name}`
        : "";
      valueB = b.patient_data
        ? `${b.patient_data.first_name} ${b.patient_data.last_name}`
        : "";
      break;
    case "birth_date":
      valueA = a.patient_data?.birth_date || "";
      valueB = b.patient_data?.birth_date || "";
      break;
    case "to_service":
      valueA = a.to_service_data?.name || "";
      valueB = b.to_service_data?.name || "";
      break;
    case "status":
      valueA = a.status || "";
      valueB = b.status || "";
      break;
    default:
      valueA = a[orderBy] || "";
      valueB = b[orderBy] || "";
      break;
  }

  if (valueB < valueA) return -1;
  if (valueB > valueA) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  if (!Array.isArray(array)) return array;
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const orderResult = comparator(a[0], b[0]);
    if (orderResult !== 0) return orderResult;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const ReferralTable = ({
  rows,
  toggleRowSelection,
  isRowSelected,
  selectedRowIds,
  isLoading,
  order,
  orderBy,
  handleRequestSort,
  setSelectedRowIds,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isFilterOpen,
}) => {
  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [topShadow, setTopShadow] = useState(false);
  const [bottomShadow, setBottomShadow] = useState(false);
  // Create a ref for the TableContainer
  const tableContainerRef = useRef(null);

  const toggleRowExpansion = (id) => {
    setExpandedRowIds((prevExpandedRowIds) =>
      prevExpandedRowIds.includes(id)
        ? prevExpandedRowIds.filter((rowId) => rowId !== id)
        : [...prevExpandedRowIds, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRowIds.length === rows.length) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(rows.map((referral) => referral.id));
    }
  };

  const sortedRows =
    order && orderBy ? stableSort(rows, getComparator(order, orderBy)) : rows;

  useEffect(() => {
    const handleScroll = () => {
      if (tableContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          tableContainerRef.current;
        // Set bottom shadow if not at the bottom
        if (scrollTop + clientHeight < scrollHeight) {
          setBottomShadow(true);
        } else {
          setBottomShadow(false);
        }
        // Set top shadow if not at the top
        if (scrollTop > 0) {
          setTopShadow(true);
        } else {
          setTopShadow(false);
          setBottomShadow(false);
        }

        if (scrollTop + clientHeight >= scrollHeight - 500) {
          // Near the bottom
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }
      }
    };

    const container = tableContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {}, [rows, sortedRows]);

  return (
    <div style={{ position: "relative" }}>
      {/* Top shadow */}
      {topShadow && (
        <div
          style={{
            position: "absolute",
            top: topShadow ? 40 : 45,
            left: 0,
            right: 0,
            height: "10px",
            borderRadius: "0px 0px 5px 5px",
            zIndex: 10, // Ensure it's above the table
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent)", // Blueish shadow

            opacity: topShadow ? 1 : 0, // Set opacity based on scroll
            transition: "opacity 0.5s ease", // Smooth transition with delay
          }}
        ></div>
      )}

      {/* Bottom shadow */}
      {bottomShadow && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50px",
            borderRadius: "0 0 5px 5px",
            zIndex: 1, // Ensure it's above the table
            background:
              "linear-gradient(to top, rgba(0, 123, 255, 0.5), transparent)", // Blueish shadow
            opacity: bottomShadow ? 1 : 0, // Set opacity based on scroll
            transition: "opacity 0.5s ease", // Smooth transition with delay
          }}
        ></div>
      )}
      <TableContainer
        ref={tableContainerRef}
        component={Paper}
        sx={{
          position: "sticky", // Sticky positioning to keep it in place
          top: 0, // Sticks to the top of the viewport
          background: "#E9E9E9",
          borderRadius: "8px 6px",
          width: "100%",
          height: isFilterOpen
            ? "calc(100vh - (88px + 136px + 16px))"
            : "calc(100vh - 88px)", // Adjusts min height based on filter state
          // maxHeight: isFilterOpen ? "calc(100vh - (88px + 136px + 16px))" : "calc(100vh - 88px)", // Adjusts max height based on filter state
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
          transition: "height 0.3s ease", // Smooth transition
          // transition: "min-height 0.3s ease", // Smooth transition
        }}
      >
        <Table
          aria-label="referrals table"
          sx={{
            borderCollapse: "separate",
            borderSpacing: "0 10px",
            border: "none",
            paddingInline: "10px",
          }}
        >
          <TableHead
            sx={{
              position: "sticky",
              top: 0,
              backgroundColor: "#E9E9E9",
              zIndex: 1, // Ensure the header stays above the body
            }}
          >
            <ReferralTableHead
              toggleSelectAll={toggleSelectAll}
              selectedRowIds={selectedRowIds}
              rowsLength={rows.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
          </TableHead>

          <TableBody>
            {isLoading && !isFetchingNextPage ? (
              // Initial loading state
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <GradientCircularProgress />
                </TableCell>
              </TableRow>
            ) : sortedRows.length > 0 ? (
              sortedRows.map((referral) => (
                <ReferralRow
                  key={referral.id}
                  referral={referral}
                  isRowSelected={isRowSelected(referral.id)}
                  toggleRowSelection={toggleRowSelection}
                  toggleRowExpansion={toggleRowExpansion}
                  expandedRowIds={expandedRowIds}
                  isExpanded={expandedRowIds.includes(referral.id)}
                />
              ))
            ) : (
              // No data state
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography
                    sx={{
                      fontSize: "24px",
                      fontWeight: 700,
                    }}
                  >
                    No Request Found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {isFetchingNextPage && (
              // Loading more data indicator
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <GradientCircularProgress />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReferralTable;
