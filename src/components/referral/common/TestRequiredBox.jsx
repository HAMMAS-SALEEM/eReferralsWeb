import React from "react";
import { Box, Typography } from "@mui/material";

const TestRequiredBox = () => {
  return (
    <Box
      sx={{
        p: 2,
        border: "2px solid rgba(0, 0, 0, 0.10)",
        borderRadius: "19px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Test Required
      </Typography>
      <Typography variant="body1">
        Please refer to the attached document for further details.
      </Typography>
      <Typography variant="body1">
        To print the attachment, select 'Options' and then choose 'Print'.
      </Typography>
    </Box>
  );
};

export default TestRequiredBox;
