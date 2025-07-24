import {
  Checkbox,
  TableCell,
  TableRow,
  TableSortLabel,
  Stack,
  Typography,
} from "@mui/material";
import SortIcon from "../../assets/icons/SortIcon.svg";
import DoubleCheck from "../../assets/icons/DoubleCheck.svg";

const headCells = [
  { id: "type", label: "Request Type", sortable: true },
  { id: "created_date", label: "Date Created", sortable: true },
  { id: "created_by", label: "Created By", sortable: true },
  { id: "patient", label: "Patient", sortable: true },
  { id: "birth_date", label: "DOB", sortable: true },
  { id: "to_service", label: "Provider", sortable: true },
  { id: "status", label: "Status", sortable: true },
  { id: "options", label: "Options", sortable: false },
];

const ReferralTableHead = ({
  toggleSelectAll,
  selectedRowIds,
  rowsLength,
  order,
  orderBy,
  onRequestSort,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableRow
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1%",
        paddingLeft: "16px",
        paddingRight: "16px",
        "& .MuiTableCell-root": {
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          borderBottom: "none",
        },
        background: "transparent",
      }}
    >
      {/* Checkbox for selecting all referrals */}
      <TableCell
        padding="checkbox"
        align="center"
        sx={{
          width: '50px',
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Checkbox
          indeterminate={
            selectedRowIds.length > 0 && selectedRowIds.length < rowsLength
          }
          checked={rowsLength > 0 && selectedRowIds.length === rowsLength}
          onChange={() => {
            toggleSelectAll();
          }}
          inputProps={{
            "aria-label": "select all referrals",
          }}
          icon={<img style={{ width: 22, height: 22 }} src={DoubleCheck} alt="DoubleCheck" />}
        />
      </TableCell>

      {headCells.map((headCell) => (
        <TableCell
          key={headCell.id}
          align= {headCell.sortable ? "left" : "right"}
          sx={ headCell.sortable ? {
            width: '10%',
            paddingLeft: "8px",
            paddingRight: "8px",
          } : {
            width: '5%',
            paddingLeft: "8px",
            paddingRight: "8px",
          }}
        >
          {headCell.sortable ? (
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              IconComponent={() => (
                <img
                  src={SortIcon}
                  alt="Sort"
                  style={{ width: 22, height: 22, marginLeft: "6px" }}
                />
              )}
            >
              <Stack direction="row" alignItems="center" spacing={0.5
              }>
                <Typography
                  sx={{
                    color: "rgba(0, 0, 0, 0.50)",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "24px",
                    paddingLeft: "8px",
                  }}
                >
                  {headCell.label}
                </Typography>
              </Stack>
            </TableSortLabel>
          ) : (
            <Typography
              sx={{
                color: "rgba(0, 0, 0, 0.50)",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "24px",
              }}
            >
              {headCell.label}
            </Typography>
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default ReferralTableHead;
