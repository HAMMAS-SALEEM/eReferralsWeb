import {
  Paper,
  useTheme,
  Typography,
  Box,
  Grid,
  Avatar,
  Stack,
  Button,
  TextField,
  Modal,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { tokens } from "../../theme.js";
import styled from "@emotion/styled";
import FlexBox from "../../components/FlexBox";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Clear,
  DashboardOutlined,
  Edit,
  KeyOutlined,
  Save,
} from "@mui/icons-material";
import { fetchProfile } from "../../store/thunks/fetchProfile.js";
import { useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal.js";
import { toast } from "react-toastify";
import { changePassword } from "../../store/thunks/changePassword.js";
import { updateProfile } from "../../store/slices/profileSlice1";
const StyledSelect = styled(Select)`
  border-radius: 42px;
  background: #fff;
  display: flex;
  width: 100%;
  height: 26px;
  padding: 0px 12px;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border: none;
`;

const StyledSelectDark = styled(Select)`
  border-radius: 42px;
  background: #c8c8c8;
  display: flex;
  width: 100%;
  height: 26px;
  padding: 0px 12px;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border: none;
`;

const StyledInput = styled("input")(
  ({ isEditingPersonalDetails, isEditingOrganisationDetails }) => ({
    borderRadius: "42px",
    background:
      isEditingPersonalDetails || isEditingOrganisationDetails
        ? "white"
        : "#c8c8c8",
    width: "100%",
    height: "28px",
    padding: "0px 10px",
    border: "none",
  })
);

const Profile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [isEditingPersonalDetails, setIsEditingPersonalDetails] =
    useState(false);

  const [isEditingOrganisationDetails, setIsEditingOrganisationDetails] =
    useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const states = [
    { value: "ACT", label: "ACT" },
    { value: "NSW", label: "NSW" },
    { value: "NT", label: "NT" },
    { value: "QLD", label: "QLD" },
    { value: "SA", label: "SA" },
    { value: "TAS", label: "TAS" },
    { value: "VIC", label: "VIC" },
    { value: "WA", label: "WA" },
  ];

  const profileData = useSelector((state) => state.profile.data);
  console.log(profileData);

  const [isOrganisationAdmin, setIsOrganisationAdmin] = useState(
    profileData?.is_organisation_admin || false
  );

  const [practitionerDetails, setPractitionerDetails] = useState({
    first_name: "",
    last_name: "",
    provider_no: "",
    email: "",
    phone: "",
    fax: "",
  });

  const [organizationDetails, setOrganizationDetails] = useState({
    name: "",
    address_1: "",
    city: "",
    state: "",
    postcode: "",
    email: "",
    phoneNumber: "",
  });

  const phonePatterns = [
    /^04\d{8}$/, // Mobile numbers: 0412345678
    /^02\d{8}$/, // Local landline: 0212345678
    /^\d{8}$/, // Local landline without area code: 12345678
    /^61\d{9}$/, // Compact international mobile: 61412345678
    /^$/, // Matches an empty string
  ];

  const phoneExamples = [
    "0412345678", // Mobile numbers
    "0212345678", // Local landline
    "12345678", // Local landline without area code
    "61412345678", // Compact international mobile
  ];

  useEffect(() => {
    if (profileData) {
      setIsOrganisationAdmin(profileData.is_organisation_admin || false);
    }
  }, [profileData]);

  useEffect(() => {
    if (profileData) {
      const { doctor, organisation } = profileData;
      setPractitionerDetails({
        first_name: doctor?.first_name || "",
        last_name: doctor?.last_name || "",
        provider_no: doctor?.provider_no || "",
        email: doctor?.email || "",
        phone: doctor?.phone || "",
        fax: doctor?.fax || "",
      });
      setOrganizationDetails({
        name: organisation?.name || "",
        address_1: organisation?.address_1 || "",
        city: organisation?.city || "",
        state: organisation?.state || "",
        postcode: organisation?.postcode || "",
        email: organisation?.email || "",
        phoneNumber: organisation?.phone || "",
        type: "GENERAL_PRACTICE",
      });
    }
  }, [profileData]);

  const handleEditPersonalDetails = () => {
    if (profileData) {
      const { doctor } = profileData;
      setPractitionerDetails({
        first_name: doctor?.first_name || "Mario",
        last_name: doctor?.last_name || "Polverino",
        provider_no: doctor?.provider_no || "1234",
        email: doctor?.email || "drmario@gmail.com",
        phoneNumber: doctor?.phone || "78797879",
      });
    }
    setIsEditingPersonalDetails(!isEditingPersonalDetails);
  };

  const handleSavePersonalDetails = async (e) => {
    e.preventDefault();
    if (
      !practitionerDetails.first_name ||
      !practitionerDetails.last_name ||
      !practitionerDetails.provider_no ||
      !practitionerDetails.email
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(practitionerDetails.email)) {
      toast.error("Email is not valid.");
      return;
    }

    const isValidPhone = phonePatterns.some((pattern) =>
      pattern.test(practitionerDetails.phone)
    );

    if (!isValidPhone) {
      toast.error(
        <div>
          <strong>
            Invalid phone number. <br></br>Examples of valid phone numbers:
          </strong>
          <ul>
            <li>
              Mobile numbers: <strong>0412345678</strong>
            </li>
            <li>
              Local landline: <strong>0212345678</strong>
            </li>
            <li>
              Local landline no area code: <strong>12345678</strong>
            </li>
            <li>
              International numbers: <strong>61412345678</strong>
            </li>
          </ul>
        </div>
      );

      return;
    }

    try {
      await dispatch(
        updateProfile({
          doctor: practitionerDetails,
          organisation: organizationDetails,
        })
      ).unwrap();

      setIsEditingPersonalDetails(false);
      toast.success("Personal details updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error || "An error occurred while updating the profile.");
    }
  };

  const handleInputChange = (e, field, maxLength) => {
    const value = e.target.value;
    // Allow clearing the input when value is empty
    if (value === "" || value.length <= maxLength) {
      setPractitionerDetails((prevDetails) => ({
        ...prevDetails,
        [field]: value,
      }));
    }
  };

  const handleInputChangeOrgs = (e, field, maxLength) => {
    const value = e.target.value;
    // Allow clearing the input when value is empty
    if (value === "" || (!isNaN(value) && value.length <= maxLength)) {
      setOrganizationDetails((prevDetails) => ({
        ...prevDetails,
        [field]: value,
      }));
    }
  };

  const handleEditOrganisationDetails = () => {
    if (profileData) {
      const { organisation } = profileData;
      setOrganizationDetails({
        name: organisation?.name || "",
        address_1: organisation?.address_1 || "",
        city: organisation?.city || "",
        state: organisation?.state || "",
        postcode: organisation?.postcode || "",
        email: organisation?.email || "",
        phoneNumber: organisation?.phone || "",
        type: "GENERAL_PRACTICE",
      });
    }
    setIsEditingOrganisationDetails(!isEditingOrganisationDetails);
  };

  const handleSaveOrganisationalDetails = async (e) => {
    e.preventDefault();
    if (!organizationDetails.name || !organizationDetails.phoneNumber) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await dispatch(
        updateProfile({
          doctor: practitionerDetails,
          organisation: organizationDetails,
        })
      ).unwrap();

      setIsEditingOrganisationDetails(false);
      toast.success("Organization details updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error || "An error occurred while updating the profile.");
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    isOpen: openChangePassword,
    open: handleOpenChangePassword,
    close: handleCloseChangePassword,
  } = useModal();

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New Password and Confirm New Password must match");
      return;
    }

    try {
      await dispatch(
        changePassword({
          currentPassword,
          newPassword,
          repeatNewPassword: confirmPassword,
        })
      ).unwrap();

      // If password change is successful
      toast.success("Password changed successfully!");
      handleCloseChangePassword();
    } catch (error) {
      console.error("Error during password change:", error);

      // If the error is an array (like new_password validation errors)
      if (Array.isArray(error)) {
        const combinedMessage = error.join(" "); // Join messages into a single string
        toast.error(combinedMessage);
      } else if (typeof error === "string") {
        // If it's a single string message
        toast.error(error);
      } else {
        // Fallback for unexpected errors
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const isLoading = useSelector((state) => state.changePassword.isLoading);
  const isError = useSelector((state) => state.changePassword.isError);
  const errorMessage = useSelector(
    (state) => state.changePassword.errorMessage
  );

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: "20px 36px",
          fontSize: "18px",
          fontWeight: 600,
          backgroundColor: colors.grey[700],
          gap: "3%",
          width: "100%",
          height: "calc(100vh - 28px)",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "0",
            height: "0",
          },
        }}
      >
        <FlexBox
          sx={{
            mb: "16px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FlexBox sx={{ alignItems: "center", gap: "27px" }}>
            <Avatar sx={{ width: "60px", height: "60px" }} />
            <Stack>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "700",
                  lineHeight: "24px",
                }}
              >
                {practitionerDetails?.first_name
                  ? `${practitionerDetails?.first_name} ${practitionerDetails?.last_name}`
                  : ""}
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "24px",
                }}
              >
                {practitionerDetails?.email
                  ? `${practitionerDetails?.email}`
                  : ""}
              </Typography>
            </Stack>
          </FlexBox>

          <Button
            variant="contained"
            sx={{
              display: "inline-flex",
              height: "50px",
              padding: "4px 25px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
              borderRadius: "60px",
              backgroundColor: "#000",
              color: "#fff",
              fontSize: "18px",
              fontWeight: 600,
              textTransform: "capitalize",
            }}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard <DashboardOutlined sx={{ color: "#bfbfbf" }} />
          </Button>
        </FlexBox>

        <Box
          sx={{
            mt: "24px",
            maxWidth: "907px",
            background: "#E1E1E1",
            padding: "24px",
            borderRadius: "6px",
          }}
        >
          <form onSubmit={(e) => handleSavePersonalDetails(e)}>
            <FlexBox
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  lineHeight: "24px",
                }}
              >
                Personal Details
              </Typography>

              {isEditingPersonalDetails ? (
                <FlexBox sx={{ alignItems: "center", gap: "10px" }}>
                  <Button
                    variant="contained"
                    onClick={handleEditPersonalDetails}
                    endIcon={<Clear />}
                    className="edit-profile-btn"
                  >
                    Discard
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    // onClick={handleSavePersonalDetails}
                    endIcon={<Save />}
                    className="save-profile-btn"
                  >
                    Save
                  </Button>
                </FlexBox>
              ) : (
                <Button
                  className="edit-profile-btn"
                  onClick={() => {
                    setIsEditingPersonalDetails(true);
                  }}
                >
                  Edit <Edit sx={{ fontSize: "16px" }} />
                </Button>
              )}
            </FlexBox>

            <Grid container spacing={2} mt="20px">
              <Grid item xs={3}>
                <Typography color="#8E8E8E" lineHeight="24px" ml="10px">
                  First Name <span style={{ color: "red" }}>*</span>
                </Typography>
                <StyledInput
                  type="text"
                  value={practitionerDetails?.first_name}
                  readOnly={!isEditingPersonalDetails}
                  onChange={(e) =>
                    setPractitionerDetails({
                      ...practitionerDetails,
                      first_name: e.target.value,
                    })
                  }
                  isEditingPersonalDetails={isEditingPersonalDetails}
                  required
                />
              </Grid>
              <Grid item xs={3}>
                <Typography color="#8E8E8E" lineHeight="24px" ml="10px">
                  Last Name <span style={{ color: "red" }}>*</span>
                </Typography>
                <StyledInput
                  type="text"
                  value={practitionerDetails?.last_name}
                  readOnly={!isEditingPersonalDetails}
                  onChange={(e) =>
                    setPractitionerDetails({
                      ...practitionerDetails,
                      last_name: e.target.value,
                    })
                  }
                  isEditingPersonalDetails={isEditingPersonalDetails}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Typography color="#8E8E8E" lineHeight="24px" ml="10px">
                  Provider Number <span style={{ color: "red" }}>*</span>
                </Typography>

                <StyledInput
                  type="text"
                  value={practitionerDetails?.provider_no}
                  readOnly={!isEditingPersonalDetails}
                  onChange={(e) => handleInputChange(e, "provider_no", 8)}
                  isEditingPersonalDetails={isEditingPersonalDetails}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Typography color="#8E8E8E" lineHeight="24px" ml="10px">
                  Email <span style={{ color: "red" }}>*</span>
                </Typography>
                <StyledInput
                  type="email"
                  value={practitionerDetails?.email}
                  readOnly={!isEditingPersonalDetails}
                  onChange={(e) =>
                    setPractitionerDetails({
                      ...practitionerDetails,
                      email: e.target.value,
                    })
                  }
                  isEditingPersonalDetails={isEditingPersonalDetails}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Typography color="#8E8E8E" lineHeight="24px" ml="10px">
                  Phone Number (optional)
                </Typography>

                <StyledInput
                  type="text"
                  value={practitionerDetails?.phone}
                  readOnly={!isEditingPersonalDetails}
                  onChange={(e) => handleInputChange(e, "phone", 17)}
                  isEditingPersonalDetails={isEditingPersonalDetails}
                />
              </Grid>
              <Grid item xs={3} mt="12px" onClick={handleOpenChangePassword}>
                <Button className="edit-profile-btn" onClick={() => {}}>
                  Change password <KeyOutlined sx={{ fontSize: "16px" }} />
                </Button>
              </Grid>
            </Grid>
            <Modal
              open={openChangePassword}
              onClose={handleCloseChangePassword}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: 400,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 4,
                }}
              >
                <Typography variant="h6" gutterBottom fontSize="20px">
                  Change Password
                </Typography>
                <TextField
                  label="Current Password"
                  type="password"
                  fullWidth
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  label="Confirm New Password"
                  type="password"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
                {isError && (
                  <Typography variant="body2" color="error">
                    {errorMessage}
                  </Typography>
                )}
                <Box sx={{ mt: 2 }}>
                  <Button
                    className="save-profile-btn"
                    variant="contained"
                    color="primary"
                    onClick={handleChangePassword}
                    disabled={isLoading}
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    {isLoading ? "Changing Password..." : "Change Password"}
                  </Button>
                </Box>
              </Box>
            </Modal>
          </form>
        </Box>

        <Box
          sx={{
            mt: "24px",
            maxWidth: "907px",
            background: "#E1E1E1",
            padding: "24px",
            borderRadius: "6px",
          }}
        >
          <form onSubmit={(e) => handleSaveOrganisationalDetails(e)}>
            <FlexBox
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  lineHeight: "24px",
                }}
              >
                Organization Details
              </Typography>

              {isEditingOrganisationDetails ? (
                <FlexBox sx={{ alignItems: "center", gap: "10px" }}>
                  <Button
                    variant="contained"
                    onClick={handleEditOrganisationDetails}
                    endIcon={<Clear />}
                    className="edit-profile-btn"
                  >
                    Discard
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    // onClick={handleSaveOrganisationalDetails}
                    endIcon={<Save />}
                    className="save-profile-btn"
                  >
                    Save
                  </Button>
                </FlexBox>
              ) : !isOrganisationAdmin ? (
                <Tooltip title="Must be an Administrator to edit your clinic details">
                  <Button
                    className="edit-profile-btn"
                    sx={{
                      cursor: profileData?.is_organisation_admin
                        ? "pointer"
                        : "not-allowed",
                    }}
                  >
                    Edit <Edit sx={{ fontSize: "16px" }} />
                  </Button>
                </Tooltip>
              ) : (
                <Button
                  className="edit-profile-btn"
                  onClick={() => {
                    setIsEditingOrganisationDetails(true);
                  }}
                >
                  Edit <Edit sx={{ fontSize: "16px" }} />
                </Button>
              )}
            </FlexBox>

            <Grid container spacing={2.5} alignItems="center" mt="20px">
              <Grid item xs={12}>
                <Typography color="#8E8E8E" lineHeight="24px" ml="10px">
                  Clinic Name <span style={{ color: "red" }}>*</span>
                </Typography>
                <StyledInput
                  type="text"
                  // value={organizationDetails.name}
                  value={
                    organizationDetails.name ? organizationDetails.name : ""
                  }
                  onChange={(e) =>
                    setOrganizationDetails({
                      ...organizationDetails,
                      name: e.target.value,
                    })
                  }
                  disabled={!isEditingOrganisationDetails}
                  isEditingOrganisationDetails={isEditingOrganisationDetails}
                  required
                />
              </Grid>
              <Grid item xs={3}>
                <Typography color="#8E8E8E" lineHeight="24px" ml="10px">
                  Address{" "}
                </Typography>
                <StyledInput
                  type="text"
                  value={organizationDetails.address_1}
                  onChange={(e) =>
                    setOrganizationDetails({
                      ...organizationDetails,
                      address_1: e.target.value,
                    })
                  }
                  disabled={!isEditingOrganisationDetails}
                  isEditingOrganisationDetails={isEditingOrganisationDetails}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography color="#8E8E8E" lineHeight="24px" ml="10px">
                  Suburb
                </Typography>
                <StyledInput
                  type="text"
                  value={organizationDetails.city}
                  onChange={(e) =>
                    setOrganizationDetails({
                      ...organizationDetails,
                      city: e.target.value,
                    })
                  }
                  disabled={!isEditingOrganisationDetails}
                  isEditingOrganisationDetails={isEditingOrganisationDetails}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography color="#8E8E8E" lineHeight="24px" ml="10px">
                  State
                </Typography>
                {isEditingOrganisationDetails ? (
                  <StyledSelect
                    value={organizationDetails.state || ""}
                    placeholder="State"
                    name="state"
                    onChange={(e) =>
                      setOrganizationDetails({
                        ...organizationDetails,
                        state: e.target.value,
                      })
                    }
                    disabled={!isEditingOrganisationDetails}
                  >
                    {states.map((state, index) => (
                      <MenuItem key={index} value={state.value}>
                        {state.label}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                ) : (
                  <StyledSelectDark
                    value={organizationDetails.state || ""}
                    placeholder="State"
                    name="state"
                    onChange={(e) =>
                      setOrganizationDetails({
                        ...organizationDetails,
                        state: e.target.value,
                      })
                    }
                    disabled={!isEditingOrganisationDetails}
                  >
                    {states.map((state, index) => (
                      <MenuItem key={index} value={state.value}>
                        {state.label}
                      </MenuItem>
                    ))}
                  </StyledSelectDark>
                )}
              </Grid>
              <Grid item xs={3}>
                <Typography color="#8E8E8E" lineHeight="24px" ml="10px">
                  Postcode
                </Typography>
                <StyledInput
                  type="text"
                  value={organizationDetails.postcode}
                  onChange={(e) =>
                    setOrganizationDetails({
                      ...organizationDetails,
                      postcode: e.target.value,
                    })
                  }
                  disabled={!isEditingOrganisationDetails}
                  isEditingOrganisationDetails={isEditingOrganisationDetails}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography color="#8E8E8E" lineHeight="24px" ml="10px">
                  Email
                </Typography>
                <StyledInput
                  type="email"
                  value={organizationDetails.email}
                  onChange={(e) =>
                    setOrganizationDetails({
                      ...organizationDetails,
                      email: e.target.value,
                    })
                  }
                  disabled={!isEditingOrganisationDetails}
                  isEditingOrganisationDetails={isEditingOrganisationDetails}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography color="#8E8E8E" lineHeight="24px" ml="10px">
                  Phone Number <span style={{ color: "red" }}>*</span>
                </Typography>
                <StyledInput
                  type="text"
                  value={organizationDetails.phoneNumber}
                  onChange={(e) => handleInputChangeOrgs(e, "phoneNumber", 17)}
                  disabled={!isEditingOrganisationDetails}
                  isEditingOrganisationDetails={isEditingOrganisationDetails}
                  required
                />
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </>
  );
};

export default Profile;
