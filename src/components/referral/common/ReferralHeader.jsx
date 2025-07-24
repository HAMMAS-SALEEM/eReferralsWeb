import React from "react";
import { Stack, Typography, Box } from "@mui/material";

import healthCareIc from "../../../assets/icons/health_care_ic.svg";
import referralWhiteIcon from "../../../assets/icons/ReferralWhiteIcon.svg";
import eRequestLogoWhite from "../../../assets/icons/eRequestLogoWhite.svg";

const ReferralHeader = ({ type, referralId }) => {
  const containerStyles = {
    padding: "10px 14px",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "19px 19px 0px 0px",
    background:
      "linear-gradient(270deg, rgba(103, 222, 127, 0.50) 0%, rgba(62, 137, 217, 0.50) 100%)",
  };

  const typeAndIdStyles = {
    color: "#fff",
    fontSize: "14px",
    lineHeight: "24px",
    fontWeight: "600",
    fontStyle: "italic",
  };

  const labelStyles = {
    color: "rgba(255, 255, 255, 0.85)",
    lineHeight: "24px",
    fontWeight: "700",
  };

  return (
    <Stack direction="row" sx={containerStyles}>
      <Stack direction="row" spacing={2} alignItems="center">
        <img src={referralWhiteIcon} alt={`referral`} />

        <Stack spacing={1}>
          <img src={eRequestLogoWhite} alt={`request logo`} />
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography sx={typeAndIdStyles}>{type} REQUEST | info@erequests.com.au</Typography>
            {/* <Box
              sx={{
                borderTop: "1px solid white",
                width: "100px",
                marginY: "auto",
              }}
            />
            <Typography sx={typeAndIdStyles}># 345434543</Typography> */}
          </Stack>
        </Stack>
      </Stack>

      {referralId && (
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography sx={labelStyles}>REFERRAL ID</Typography>
          <Typography sx={typeAndIdStyles}>#{referralId}</Typography>
        </Stack>
      )}
      <img src={healthCareIc} alt="Health care logo" />
    </Stack>
  );
};

export default ReferralHeader;
