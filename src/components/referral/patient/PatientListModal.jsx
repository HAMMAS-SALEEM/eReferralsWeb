import {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  Modal,
  Box,
  List,
  ListItem,
  Button,
  Alert,
  Avatar,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import { usePatients } from "../../../hooks/patientHooks";
import AddPatientModal from "./AddPatientModal";
import EditPatientModal from "./EditPatientModal";
import { useDispatch, useSelector } from "react-redux";
import { setPatient } from "../../../store/slices/patientSlice1";
import { Stack, styled } from "@mui/system";
import { setPatientId } from "../../../store/slices/referralSlice1";
import GradientCircularProgress from "../../GradientCircularProgress";
import dayjs from "dayjs";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vh",
  height: "60vh",
  bgcolor: "#E9E9E9",
  borderRadius: "30px",
  boxShadow: "0px 0px 30px 0px rgba(0, 0, 0, 0.40)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const PatientText = styled(Typography)({
  color: "#000",
  fontFamily: '"Albert Sans"',
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "24px",
});

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "60px",
    background: "#FFF",
    backdropFilter: "blur(4px)",
    "& input": {
      padding: "10px 25px",
    },
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    background:
      "linear-gradient(90deg, rgba(0, 0, 0, 0.50) 0.12%, rgba(0, 0, 0, 0.39) 94.92%, rgba(0, 0, 0, 0.00) 100.12%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
});

const CustomList = styled(List)({
  flex: 1,
  overflowY: "auto",
  padding: "30px 20px 0",
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
  msOverflowStyle: "none",
  boxShadow: "inset 0px 0px 10px 0px rgba(0, 0, 0, 0.10)",
});

const stringAvatar = (name) => {
  if (!name) return "";
  const parts = name.split(" ");
  return {
    children: `${parts[0][0]}${parts[1] ? parts[1][0] : ""}`.toUpperCase(),
  };
};

const formatDateForSearch = (searchTerm) => {
  if (!searchTerm.includes("/")) return searchTerm;

  const singleDayRegex = /^(\d{1})\/$/;
  if (singleDayRegex.test(searchTerm)) {
    const [_, day] = searchTerm.match(singleDayRegex);
    return `-0${day}`;
  }

  const doubleDayRegex = /^(\d{2})\/$/;
  if (doubleDayRegex.test(searchTerm)) {
    const [_, day] = searchTerm.match(doubleDayRegex);
    return `-${day}`;
  }

  const singleDayDoubleMonthRegex = /^(\d{1})\/(\d{2})$/;
  if (singleDayDoubleMonthRegex.test(searchTerm)) {
    const [_, day, month] = searchTerm.match(singleDayDoubleMonthRegex);
    return `${month}-0${day}`;
  }

  const singleDaySingleMonthRegex = /^(\d{1})\/(\d{1})$/;
  if (singleDaySingleMonthRegex.test(searchTerm)) {
    const [_, day, month] = searchTerm.match(singleDaySingleMonthRegex);
    return `0${month}-0${day}`;
  }

  const doubleDaySingleMonthRegex = /^(\d{2})\/(\d{1})$/;
  if (doubleDaySingleMonthRegex.test(searchTerm)) {
    const [_, day, month] = searchTerm.match(doubleDaySingleMonthRegex);
    return `0${month}-${day}`;
  }

  const dayMonthRegex = /^(\d{2})\/(\d{2})$/;
  if (dayMonthRegex.test(searchTerm)) {
    const [_, day, month] = searchTerm.match(dayMonthRegex);
    return `${month}-${day}`;
  }

  const monthYearRegex = /^(\d{2})\/(\d{4})$/;
  if (monthYearRegex.test(searchTerm)) {
    const [_, month, year] = searchTerm.match(monthYearRegex);
    return `${year}-${month}`;
  }

  const fullDateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (fullDateRegex.test(searchTerm)) {
    const [_, day, month, year] = searchTerm.match(fullDateRegex);
    return `${year}-${month}-${day}`;
  }

  return searchTerm;
};

const closeButtonSx = {
  minWidth: "120px",
  color: "#2D6465",
  background: "#fff",
  border: "2px solid #67DE7F",
  fontWeight: 600,
  fontSize: "17px",
  borderRadius: "20px",
  transition: "background 0.18s, box-shadow 0.18s, color 0.18s, border 0.18s",
  "&:hover": {
    background: "#eafff2",
    border: "2.5px solid #67DE7F",
    color: "#67DE7F",
    boxShadow: "0 0 10px #67DE7F33",
  },
};

const nextButtonSx = {
  minWidth: "120px",
  fontWeight: 600,
  fontSize: "17px",
  borderRadius: "20px",
  transition: "background 0.18s, box-shadow 0.18s, color 0.18s, border 0.18s",
  "&:hover": {
    filter: "brightness(1.10)",
    boxShadow: "0 0 10px #67DE7F33",
  },
};

const PatientListModal = ({ isOpen, onClose, onNext }) => {
  const dispatch = useDispatch();
  const { patient } = useSelector((state) => state);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [isEditPatientModalOpen, setIsEditPatientModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = usePatients(formatDateForSearch(searchTerm));

  const patients = data?.pages.flatMap((page) => page.data.results) || [];

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        refetch();
      }, 500),
    [refetch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  const handleSelectPatient = (selectedPatient) => {
    if (selectedPatient && selectedPatient.id) {
      dispatch(setPatient(selectedPatient));
      dispatch(setPatientId(selectedPatient.id));
    }
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setIsEditPatientModalOpen(true);
  };

  const observer = useRef();
  const lastPatientElementRef = useCallback(
    (node) => {
      if (isLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const renderContent = () => {
    if (isLoading && patients.length === 0) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <GradientCircularProgress />
        </Box>
      );
    }

    if (isError) return <Alert severity="error">Error loading patients</Alert>;

    if (patients.length === 0)
      return (
        <Typography
          sx={{ flex: 1, fontSize: "24px", fontWeight: 700, mt: "30px" }}
          textAlign={"center"}
        >
          No patients found
        </Typography>
      );

    const selectButtonSx = {
      minWidth: "80px",
      ml: 1,
      color: "#fff",
      background:
        "linear-gradient(90deg, #2D6465 0%, #3A806B 50%, #67DE7F 100%)",
      borderRadius: "20px",
      boxShadow: "0 1px 4px 0 #61da7a22",
      transition: "filter 0.2s, box-shadow 0.2s",
      fontWeight: 600,
      fontSize: "15px",
      "&:hover": {
        filter: "brightness(1.10)",
        boxShadow: "0 2px 10px 0 #67de7f44",
        background:
          "linear-gradient(90deg, #38b483 0%, #67DE7F 100%)",
      },
    };

    const editButtonSx = {
      variant: "blueGradient",
      size: "small",
      sx: {
        fontWeight: 600,
        fontSize: "15px",
        borderRadius: "20px",
        transition: "background 0.2s, box-shadow 0.2s, filter 0.2s",
        boxShadow: "0 1px 4px 0 #418FD122",
        "&:hover": {
          filter: "brightness(1.10)",
          boxShadow: "0 2px 10px 0 #418FD144",
        },
      },
    };

    return (
      <CustomList>
        {patients.map((patientItem, index) => {
          const isLast = patients.length === index + 1;
          const listItemProps = {
            key: patientItem?.id,
            sx: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "4px 0px",
              background:
                patient?.id === patientItem.id
                  ? "linear-gradient(90deg, rgba(45, 100, 101, 0.3) 0%, rgba(58, 128, 107, 0.3) 50%, rgba(103, 222, 127, 0.3) 100%)"
                  : "inherit",
              color: patient?.id === patientItem.id ? "black" : "inherit",
              cursor: "pointer",
              borderRadius: "20px",
              boxShadow:
                patient?.id === patientItem.id
                  ? "0px 0px 31px 0px rgba(0, 0, 0, 0.5)"
                  : "none",
              transition: "background 0.3s ease, box-shadow 0.3s ease",
              "&:hover": patient?.id !== patientItem.id && {
                background: "#FFF",
                boxShadow: "6px 0px 31px 0px rgba(0, 0, 0, 0.25)",
                borderRadius: "20px",
              },
            },
            onClick: () => handleSelectPatient(patientItem),
          };
          if (isLast) listItemProps.ref = lastPatientElementRef;

          return (
            <ListItem {...listItemProps}>
              <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                <Avatar
                  {...stringAvatar(
                    `${patientItem.first_name} ${patientItem.last_name}`
                  )}
                  sx={{
                    background:
                      "linear-gradient(90deg, #153259 -0.31%, #418FD1 99.69%)",
                    color: "#FFF",
                    mr: 2,
                  }}
                />
                <PatientText>
                  {patientItem.first_name} {patientItem.last_name}
                </PatientText>
              </Box>

              <Box sx={{ flex: 1 }}>
                <PatientText>
                  {dayjs(patientItem.birth_date).format("DD/MM/YYYY")}
                </PatientText>
              </Box>

              <Box sx={{ flex: 1 }}>
                <PatientText>{patientItem.phone}</PatientText>
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  {...editButtonSx}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditPatient(patientItem);
                  }}
                >
                  Edit
                </Button>
                <Button
                  sx={selectButtonSx}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPatient(patientItem);
                  }}
                >
                  Select
                </Button>
              </Box>
            </ListItem>
          );
        })}
        {isFetchingNextPage && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <GradientCircularProgress />
          </Box>
        )}
      </CustomList>
    );
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="patient-list-modal-title"
        aria-describedby="patient-list-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "20px",
            }}
          >
            <CustomTextField
              fullWidth
              placeholder="Search by name or date..."
              variant="outlined"
              value={searchTerm}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                    {searchTerm && (
                      <Button
                        onClick={() => {
                          setSearchTerm("");
                          debouncedSearch.cancel();
                          refetch();
                        }}
                        sx={{
                          ml: 1,
                          minWidth: "auto",
                          color: "#000",
                        }}
                      >
                        X
                      </Button>
                    )}
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                const rawInput = e.target.value;
                const formattedSearchTerm = formatDateForSearch(rawInput);
                setSearchTerm(rawInput);
                debouncedSearch(formattedSearchTerm);
              }}
            />
            <Button
              variant="greenGradient"
              color="primary"
              sx={{
                ml: 2,
                minWidth: "178px",
              }}
              onClick={() => setIsAddPatientModalOpen(true)}
            >
              Add Patient +
            </Button>
          </Box>

          {renderContent()}

          <Stack
            direction={"row"}
            spacing={1}
            alignItems={"center"}
            justifyContent={"end"}
            sx={{
              padding: "20px",
              background:
                "linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
            }}
          >
            <Button
              variant="outlined"
              size="medium"
              sx={closeButtonSx}
              onClick={onClose}
            >
              Close
            </Button>

            <Button
              variant="greenGradient"
              size="medium"
              onClick={onNext}
              disabled={!patient?.id}
              sx={nextButtonSx}
            >
              Next
            </Button>
          </Stack>
        </Box>
      </Modal>

      <AddPatientModal
        isOpen={isAddPatientModalOpen}
        onClose={() => setIsAddPatientModalOpen(false)}
        setSearchTerm={setSearchTerm}
        handleSelectPatient={handleSelectPatient}
      />

      {editingPatient && (
        <EditPatientModal
          isOpen={isEditPatientModalOpen}
          onClose={() => setIsEditPatientModalOpen(false)}
          initialValues={editingPatient}
          setSearchTerm={setSearchTerm}
          setDebouncedSearchTerm={() => {}}
          handleSelectPatient={handleSelectPatient}
        />
      )}
    </>
  );
};

export default PatientListModal;
