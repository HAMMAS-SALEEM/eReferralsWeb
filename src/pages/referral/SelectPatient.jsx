import { useState } from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PatientListModal from "../../components/referral/patient/PatientListModal";
import RequestLogo from "../../assets/icons/RequestLogo";
import SearchIcon from "@mui/icons-material/Search";

const SelectPatient = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onNext = () => {
    navigate("/add-referral/select-referral-type");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "48px",
        }}
      >
        <RequestLogo />
        <Button
          variant="greenGradient"
          size="extraLarge"
          sx={{
            boxShadow: "0px 0px 33.5px 0px rgba(0, 0, 0, 0.10)",
          }}
          className="search-btn"
          onClick={handleOpenModal}
          disableRipple
          endIcon={<SearchIcon />}
        >
          Search Patient
        </Button>
      </Box>

      <PatientListModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNext={onNext}
      />
    </Box>
  );
};

export default SelectPatient;
