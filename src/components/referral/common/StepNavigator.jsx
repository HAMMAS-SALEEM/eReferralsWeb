import React from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import ArrowRight from "../../../assets/icons/ArrowRight.svg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"; // Correct import
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

const StepNavigator = ({
  title,
  onBack,
  onNext,
  disableNext,
  disableBack,
  type,
  mode,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack && !disableBack) {
      onBack();
    } else if (!disableBack) {
      navigate(-1);
    }
  };

  const handleNext = () => {
    if (onNext && !disableNext) {
      onNext();
    }
  };

  return (
    <Stack direction={"row"} spacing={3} alignItems={"center"}>
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <Tooltip
          title={
            disableBack
              ? "Draft already Saved, Create a new Draft to change Request Type."
              : ""
          }
          placement="right"
        >
          <Box>
            <IconButton
              onClick={handleBack}
              disabled={disableBack}
              sx={{
                width: "32px",
                height: "32px",
                backgroundImage: `url(${ArrowRight})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                transform: "rotate(180deg)", // Rotate the arrow to point backward
                opacity: disableBack ? 0.5 : 1, // Apply 50% opacity when disabled
              }}
            />
          </Box>
        </Tooltip>
        <Tooltip
          title={
            disableNext && mode == "view" ? "No Next Step available in View Mode." : disableNext ? "Fill all the required fields before proceeding." : ""
          }
          placement="right"
        >
          <Box>
            <IconButton
              onClick={handleNext}
              disabled={disableNext}
              sx={{
                width: "32px",
                height: "32px",
                backgroundImage: `url(${ArrowRight})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                opacity: disableNext ? 0.5 : 1, // Apply 50% opacity when disabled
              }}
            />
          </Box>
        </Tooltip>
      </Stack>

      <Stack direction={"row"} alignItems={"center"}>
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          {title}
        </Typography>

        {type && (
          <Stack direction={"row"} alignItems={"center"} sx={{ ml: 1 }}>
            <ArrowForwardIosIcon fontSize="14px" />
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, textTransform: "capitalize" }}
            >
              {type}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default StepNavigator;
