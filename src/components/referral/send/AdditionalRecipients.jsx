import React, { useState } from "react";
import { Box, Grid, Typography, InputBase, Button } from "@mui/material";

const AdditionalRecipients = ({ recipients, setRecipients }) => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState(false); // State for email error

  const maxRecipients = 3;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Add a new recipient
  const handleAddRecipient = () => {
    if (
      newName &&
      validateEmail(newEmail) &&
      recipients.length < maxRecipients
    ) {
      setRecipients([...recipients, { name: newName, email: newEmail }]);
      setNewName(""); // Clear the name field after adding
      setNewEmail(""); // Clear the email field after adding
      setEmailError(false); // Reset email error
    } else if (!validateEmail(newEmail)) {
      setEmailError(true); // Set email error if invalid
    }
  };

  // Remove a recipient by index
  const handleRemoveRecipient = (index) => {
    const updatedRecipients = recipients.filter((_, i) => i !== index);
    setRecipients(updatedRecipients);
  };

  return (
    <Box>
      <Grid
        container
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={8}>
          <Typography
            variant="h5"
            sx={{
              color: "#000",
              fontFamily: "Albert Sans",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
            }}
          >
            Others ({recipients.length} added)
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: "#000",
              fontFamily: "Albert Sans",
              fontSize: "16px",
              fontWeight: 400,
            }}
          >
            {maxRecipients - recipients.length} left
          </Typography>
        </Grid>
      </Grid>

      {/* Render the list of recipients */}
      {recipients.map((recipient, index) => (
        <Grid container spacing={1} sx={{ mt: 1 }} key={index}>
          <Grid item xs={5}>
            <Typography
              sx={{
                color: "#000",
                fontFamily: "Albert Sans",
                fontSize: "14px",
                fontWeight: 400,
                border: "1px solid #449470",
                borderRadius: "43px",
                padding: "2.5px 8px",
              }}
            >
              {recipient.name}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              sx={{
                color: "#000",
                fontFamily: "Albert Sans",
                fontSize: "14px",
                fontWeight: 400,
                border: "1px solid #449470",
                borderRadius: "43px",
                padding: "2.5px 8px",
              }}
            >
              {recipient.email}
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="end"
            justifyContent={"end"}
          >
            <Button
              color="error"
              onClick={() => handleRemoveRecipient(index)}
              sx={{
                background:
                  "linear-gradient(90deg, #D32F2F -0.31%, #FF5A5A 99.69%)",
                color: "#FFF",
                fontWeight: 600,
                width: "70%",
                borderRadius: "43px",
                padding: "8px 24px",
                textTransform: "none",
                boxShadow: "0px 4px 10px rgba(211, 47, 47, 0.3)",
              }}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}

      {/* Input fields for new recipient */}
      {recipients.length < maxRecipients && (
        <>
          <Grid container spacing={1} sx={{ mt: 1 }} alignItems="center">
            <Grid item xs={5}>
              <InputBase
                fullWidth
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Full Name"
                sx={{
                  backgroundColor: "#FFF",
                  borderRadius: "43px",
                  padding: "0px 15px",
                  fontFamily: "Albert Sans",
                  fontSize: "14px",
                  color: "#000",
                  border: "1px solid #000",
                }}
              />
            </Grid>
            <Grid item xs={5} sx={{ display: "flex", alignItems: "center" }}>
              <InputBase
                fullWidth
                type="email"
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                  setEmailError(!validateEmail(e.target.value)); // Update email error
                }}
                placeholder="Email Address"
                sx={{
                  backgroundColor: "#FFF",
                  borderRadius: "43px",
                  padding: "0px 15px",
                  fontFamily: "Albert Sans",
                  fontSize: "14px",
                  color: "#000",
                  border: emailError ? "1px solid red" : "1px solid #000",
                }}
              />
              {emailError && (
                <Typography
                  color="error"
                  sx={{ fontSize: "12px", position: "relative", top: 30,left: "-49%", width: "100%" }}
                >
                  Please enter a valid email address.
                </Typography>
              )}
            </Grid>

            <Grid
              item
              xs={2}
              container
              justifyContent={"end"}
              alignItems={"end"}
            >
              <Button
                variant="blueGradient"
                onClick={handleAddRecipient}
                disabled={
                  !newName ||
                  !newEmail ||
                  emailError ||
                  recipients.length >= maxRecipients
                }
                sx={{
                  borderRadius: "43px",
                  padding: "8px 24px",
                  textTransform: "none",
                  width: "70%",
                }}
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default AdditionalRecipients;
