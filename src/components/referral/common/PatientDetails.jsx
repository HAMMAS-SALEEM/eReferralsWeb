import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import EditPatientModal from "../patient/EditPatientModal";
import PatientListModal from "../patient/PatientListModal";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { setPatient } from "../../../store/slices/patientSlice1";
// import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";

const PatientDetails = ({ layout, patient, mode, method = null }) => {
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const location = useLocation();

  // const  patient  = useSelector((state) => state == true ? useSelector((state)=>state) : location.state.patient)

  // console.log("PatientDetails.jsx: patient: ", patient);

  // useEffect(() => {
  //   if (patient) {
  //     dispatch(setPatient(patient));
  //   }else{
  //     dispatch(setPatient(patient));
  //   }
  // }, [location.state]);

  const getGenderLabel = (gender) => {
    switch (gender) {
      case "M":
        return "Male";
      case "F":
        return "Female";
      case "O":
        return "Other";
      case "U":
        return "Unknown";
      default:
        return "N/A";
    }
  };

  const dispatch = useDispatch();

  const handleSelectPatient = (selectedPatient) => {
    if (selectedPatient) {
      dispatch(setPatient(selectedPatient));
    }
    return;
  };

  const handleOpenChangeModal = () => {
    setIsChangeModalOpen(true);
  };

  const handleCloseChangeModal = () => {
    setIsChangeModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const formatDateToAustralian = (dateString) => {
    if (!dateString) return "N/A";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  // Layout definitions
  const layouts = [
    {
      label: "Name",
      value: patient?.first_name,
      layout1: 3,
      layout2: 6,
      layout3: 4,
    },
    {
      label: "Surname",
      value: patient?.last_name,
      layout1: 3,
      layout2: 6,
      layout3: 4,
    },
    {
      label: "Date of Birth",
      value: formatDateToAustralian(patient?.birth_date), // Format DOB to Australian
      layout1: 2,
      layout2: 6,
      layout3: 2,
    },
    {
      label: "Gender",
      value: getGenderLabel(patient?.gender),
      layout1: 2,
      layout2: 6,
      layout3: 2,
    },
    {
      label: "Address",
      value: patient?.address_1,
      layout1: 3,
      layout2: 6,
      layout3: 4,
    },
    {
      label: "Suburb",
      value: patient?.city,
      layout1: 3,
      layout2: 6,
      layout3: 4,
    },
    {
      label: "State",
      value: patient?.state,
      layout1: 2,
      layout2: 6,
      layout3: 2,
    },
    {
      label: "Postcode",
      value: patient?.postcode,
      layout1: 2,
      layout2: 6,
      layout3: 2,
    },
    {
      label: "E-mail",
      value: patient?.email,
      layout1: 3,
      layout2: 6,
      layout3: 6,
    },
    {
      label: "Phone Number",
      value: patient?.phone,
      layout1: 3,
      layout2: 6,
      layout3: 6,
    },
    // Conditionally add Medicare fields based on the mode
    ...((mode !== "view" && mode !== "edit" && method !== "create") ||
    method == "file"
      ? [
          {
            label: "Medicare Details",
            value: patient?.medicare_no,
            layout1: 2,
            layout2: 6,
            layout3: 2,
          },
          {
            label: "Medicare Expire Date",
            value: patient?.medicare_expiry_date,
            layout1: 2,
            layout2: 6,
            layout3: 2,
          },
        ]
      : []),
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4">Patient Details</Typography>
        {mode !== "view" && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="blueGradient"
              onClick={handleOpenEditModal}
              disabled={!patient}
              size="small"
              endIcon={<EditIcon />}
            >
              Edit Patient Details
            </Button>

            <Button
              variant="greenGradient"
              size="small"
              onClick={handleOpenChangeModal}
              disabled={!patient}
              endIcon={<SearchIcon />}
            >
              Change Patient
            </Button>
          </Box>
        )}
      </Box>

      {patient ? (
        <Grid container rowSpacing={1.5} columnSpacing={1}>
          {layouts.map((item, index) => (
            <Grid
              item
              xs={
                layout === 1
                  ? item.layout1
                  : layout === 2
                  ? item.layout2
                  : item.layout3
              }
              key={index}
            >
              <Box sx={{ flexDirection: "column", borderRadius: "4px" }}>
                <Typography variant="label">{item.label}</Typography>
                <Typography
                  variant="body1"
                  sx={{
                    height: "28px",
                    lineHeight: "28px",
                    pl: "10px",
                    borderRadius: "15px",
                    bgcolor: "#C8C8C8",
                  }}
                >
                  {item.value || "N/A"}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No patient selected</Typography>
      )}

      {/* Modals for editing and changing patients */}
      {patient && mode !== "view" && (
        <>
          <EditPatientModal
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            initialValues={patient}
            setSearchTerm={() => {}} // Dummy function
            handleSelectPatient={handleSelectPatient} // Dummy function
          />
          <PatientListModal
            isOpen={isChangeModalOpen}
            onClose={handleCloseChangeModal}
            onNext={() => setIsChangeModalOpen(false)}
            setSearchTerm={() => {}} // Dummy function
            handleSelectPatient={handleSelectPatient} // Dummy function
          />
        </>
      )}
    </Box>
  );
};

export default PatientDetails;
