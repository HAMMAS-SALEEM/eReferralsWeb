import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  CircularProgress,
  Box,
  Stack,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReferralService from "../../../services/ReferralService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SuccessCheckMark from "../../../assets/icons/success-check.svg";
import CheckMark from "../../../assets/icons/checkmark.gif";
import { resetReferral } from "../../../store/slices/referralSlice1";
import { useDispatch } from "react-redux";
import CustomDatePicker from '../../../components/ui/CustomDatePicker/CustomDatePicker';
import ExpandDownIcon from "../../../assets/icons/ExpandDownIcon.svg";
import GradientCircularProgress from "../../GradientCircularProgress";

// Extend dayjs with necessary plugins
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);

const ConfirmationModal = ({
  open,
  onClose,
  referralId,
  additionalRecipients,
  selectedProviderData,
  patientData,
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const updateReferralMutation = useMutation({
    mutationFn: (updatedData) =>
      ReferralService.partialUpdateReferral(referralId, updatedData),
    onError: (error) => {
      toast.error(error.response.data.detail[0]);
    },
  });

  const sendReferralMutation = useMutation({
    mutationFn: () =>
      ReferralService.sendReferral(referralId, {
        to_emails: additionalRecipients,
        requested_completion_date: selectedDate
          ? dayjs(selectedDate).format("YYYY-MM-DDTHH:mm:ss[Z]")
          : null,
        to_service: selectedProviderData?.id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["referral", referralId]);
      dispatch(resetReferral());
      setIsSuccess(true);
    },
    onError: (error) => {
      console.error("Failed to send Request:", error);
    },
  });

  const handleConfirm = async () => {
    try {
      sendReferralMutation.mutate();
    } catch (error) {
      console.error("Failed to confirm Request:", error);
    }
  };

  const handleModalClose = () => {
    onClose();
    if (isSuccess) {
      navigate("/referrals");
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleModalClose}
        fullWidth
        maxWidth="sm"
        BackdropProps={{
          sx: {
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
          
        }}
        PaperProps={{
          sx: {
            borderRadius: "30px",
            backgroundColor: "#E9E9E9",
            boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.2)",
            width: isSuccess ? "521px" : "624px",
            height: isSuccess ? "auto" : "517px",
            padding: "20px 20px",
            transition: "width 0.3s, height 0.3s",
overflow:"visible"
            
          },
        }}
      >
        {!isSuccess && (
          <Stack
            direction={"row"}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              sx={{
                fontFamily: "Albert Sans",
                fontWeight: 600,
                fontSize: "30px",
                lineHeight: "normal",
                color: "#000",
                ml: 4.5,
              }}
            >
              Send Confirmation
            </Typography>
            <IconButton onClick={handleModalClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        )}

        <DialogContent style={{overflow:"visible"}}>
          {!isSuccess ? (
            <>
              <Typography sx={{ mb: 2, ml: 2 }}>
                Please confirm that you are sending the Request to:
              </Typography>

              <List sx={{ ml: 0, mt: -2 }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={patientData.first_name}
                    secondary={patientData.email}
                    primaryTypographyProps={{
                      sx: { fontWeight: 600 },
                    }}
                  />
                </ListItem>
                {selectedProviderData?.organisation.ereferrals_email ||
                  selectedProviderData?.organisation.email ? (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={selectedProviderData?.organisation.name}
                      secondary={
                        selectedProviderData?.organisation.ereferrals_email
                          ? selectedProviderData?.organisation.ereferrals_email
                          : selectedProviderData?.organisation.email
                      }
                      primaryTypographyProps={{
                        sx: { fontWeight: 600 },
                      }}
                    />
                  </ListItem>
                ) : null}
                {additionalRecipients?.map((recipient, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={recipient.name}
                      secondary={recipient.email}
                      primaryTypographyProps={{
                        sx: { fontWeight: 600 },
                      }}
                    />
                  </ListItem>
                ))}
              </List>

              <Stack direction="row">
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Requested completion date (Optional)
                </Typography>
              </Stack>
              <CustomDatePicker
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                // className="confirmationModal"
                padding10={true}
                textCenter={true}
                iconWidth="24px"
                iconHeight="24px"
                isExpiryDate={true}
              />
            </>
          ) : (
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems="center"
              spacing={1}
            >
              <Typography sx={{ fontSize: "30px", fontWeight: 600 }}>
                Request Sent Successfully
              </Typography>

              <Box
                component="img"
                src={CheckMark}
                alt="Success Check"
                sx={{
                  width: "60px",
                  height: "60px",
                }}
              />
            </Stack>
          )}
        </DialogContent>

        {!isSuccess && (
          <DialogActions>
            <Button
              onClick={handleConfirm}
              variant="greenGradient"
              disabled={sendReferralMutation.isPending || updateReferralMutation.isPending}
              endIcon={
                (sendReferralMutation.isPending || updateReferralMutation.isPending) ?
                  <GradientCircularProgress size={20} /> :
                  null
              }
            >
              Confirm
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default ConfirmationModal;
