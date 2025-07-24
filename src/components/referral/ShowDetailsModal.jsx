import React from "react";
import { Box, Typography, Modal, Avatar, Stack } from "@mui/material";
import { FirstPage, FmdGood, PhoneSharp } from "@mui/icons-material";
import dayjs from "dayjs"; // Import dayjs
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/en-au";

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale("en-au");

const ShowDetailsModal = ({
  openShowDetails,
  handleCloseShowDetails,
  referral,
  history,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    right: "25px",
    transform: "translate(0%, -50%)",
    width: 390,
    height: "94vh",
    padding: "8px 16px 20px",
    borderRadius: "4px",
    background: "#e9e9e9",
    boxShadow: "0px 0px 30px 0px rgba(0, 0, 0, 0.20)",
    overflow: "hidden",
    overflowY: "scroll",
  };

  // Destructuring to get the service provider data
  const serviceProvider = referral?.to_service_data?.organisation;

  // Use the history data passed as a prop
  const activities = history || [];

  // Destructuring to get the to_emails data
  const toEmails = referral?.to_emails || [];

  return (
    <Modal
      open={openShowDetails}
      onClose={handleCloseShowDetails}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack
          direction="row"
          sx={{
            mb: "16px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
            Details
          </Typography>
          <Stack
            direction="row"
            className="main-btn-2"
            onClick={handleCloseShowDetails}
          >
            Hide details <FirstPage sx={{ fontSize: "16px" }} />
          </Stack>
        </Stack>

        {/* Provider Information Section */}
        <Box
          sx={{
            mt: "16px",
            padding: "0 12px 16px",
            borderRadius: "6px",
            border: "1px solid #CACACA",
          }}
        >
          <Typography sx={{ mt: "6px", fontSize: "18px", fontWeight: 600 }}>
            Provider chosen
          </Typography>
          {serviceProvider ? (
            <Stack direction="row" sx={{ mt: "16px", gap: "12px" }}>
              <Avatar
                src={serviceProvider?.logo_data?.url || ""}
                alt={serviceProvider?.name || "Provider Logo"}
                sx={{ height: "60px", width: "60px" }}
              />
              <Stack
                sx={{
                  color: "#000",
                  gap: "4px",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "600",
                    lineHeight: "18px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    maxWidth: "220px",
                  }}
                >
                  {serviceProvider?.name}
                </Typography>
                <Stack
                  direction="row"
                  sx={{ alignItems: "center", gap: "1px" }}
                >
                  <FmdGood sx={{ fontSize: "14px" }} />
                  <Typography
                    sx={{
                      fontSize: "10px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      maxWidth: "200px",
                    }}
                  >
                    {serviceProvider?.address_1 || serviceProvider?.address_3},{" "}
                    {serviceProvider?.city}, {serviceProvider?.state}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    gap: "2px",
                    background: "#e8e8e892",
                    color: "#449470",
                    padding: "2.5px 8px",
                    borderRadius: "25px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      lineHeight: "12px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      maxWidth: "180px",
                      color: "#449470",
                    }}
                  >
                    Phone: {serviceProvider?.phone || "N/A"}
                  </Typography>
                  <PhoneSharp sx={{ fontSize: "14px" }} />
                </Stack>
              </Stack>
            </Stack>
          ) : (
            <Typography
              sx={{
                mt: "12px",
                fontSize: "14px",
                color: "rgba(0, 0, 0, 0.6)",
              }}
            >
              No provider information available
            </Typography>
          )}
        </Box>

        {/* Other Recipients Section */}
        <Box
          sx={{
            mt: "16px",
            padding: "0 12px 16px",
            borderRadius: "6px",
            border: "1px solid #CACACA",
          }}
        >
          <Typography sx={{ mt: "6px", fontSize: "18px", fontWeight: 600 }}>
            Other Recipients
          </Typography>
          <Stack sx={{ gap: "10px", mt: "12px" }}>
            {toEmails.length > 0 ? (
              toEmails.map((emailEntry, index) => (
                <Box key={index}>
                  <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
                    {emailEntry.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "rgba(0, 0, 0, 0.75)",
                    }}
                  >
                    {emailEntry.email}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography
                sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.5)" }}
              >
                No additional contacts
              </Typography>
            )}
          </Stack>
        </Box>

        {/* Requested Completion Date Section */}
        <Box
          sx={{
            mt: "16px",
            padding: "0 12px 16px",
            borderRadius: "6px",
            border: "1px solid #CACACA",
          }}
        >
          <Typography sx={{ mt: "6px", fontSize: "18px", fontWeight: 600 }}>
            Requested Completion Date
          </Typography>
          <Box sx={{ mt: "12px" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
              {referral.requested_completion_date
                ? dayjs(referral.requested_completion_date).format("DD/MM/YYYY")
                : "Not specified"}
            </Typography>
          </Box>
        </Box>

        {/* History Section */}
        <Box
          sx={{
            mt: "16px",
            padding: "0 12px 16px",
            borderRadius: "6px",
            border: "1px solid #CACACA",
          }}
        >
          <Typography sx={{ mt: "6px", fontSize: "18px", fontWeight: 600 }}>
            History
          </Typography>
          {activities.length > 0 ? (
            <Stack sx={{ gap: "20px", mt: "12px" }}>
              {activities.map((activity, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="flex-start"
                  spacing={2}
                >
                  {/* Dot and Line to Represent Timeline */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: "primary.main",
                      }}
                    />
                    {index < activities.length - 1 && (
                      <Box
                        sx={{
                          height: "50px",
                          width: "2px",
                          backgroundColor: "rgba(0, 0, 0, 0.2)",
                          marginTop: "4px",
                        }}
                      />
                    )}
                  </Box>
                  {/* Content of Each Timeline Item */}
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        textTransform: "capitalize",
                      }}
                    >
                      {activity.action.toLowerCase()}
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }}>
                      {activity.description}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "rgba(0, 0, 0, 0.75)",
                      }}
                    >
                      By {activity.actor_name} ({activity.actor})
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        color: "rgba(0, 0, 0, 0.50)",
                        mt: "4px",
                      }}
                    >
                      {/* Format the date using dayjs in Australian format */}
                      {dayjs(activity.action_date).format("DD/MM/YYYY hh:mm A")}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          ) : (
            <Typography
              sx={{ mt: "12px", fontSize: "14px", color: "rgba(0, 0, 0, 0.6)" }}
            >
              No history available for this Request.
            </Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ShowDetailsModal;
