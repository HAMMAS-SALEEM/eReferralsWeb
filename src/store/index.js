import { configureStore } from "@reduxjs/toolkit";
import { referralReducer } from "./slices/referralSlice";
import { patientReducer } from "./slices/patientSlice";
// import { authReducer } from './slices/authSlice'
import { serviceReducer } from "./slices/serviceSlice";
import { profileReducer } from "./slices/profileSlice";
import { changePasswordReducer } from "./slices/changePasswordSlice";
import { userAuthReducer } from "./slices/userAuthSlice";
import { authReducer } from "./slices/authSlice";
import patientReducer1 from "./slices/patientSlice1";
import referralReducer1 from "./slices/referralSlice1";
import profileReducer1 from "./slices/profileSlice1";

export const store = configureStore({
  reducer: {
    referrals: referralReducer,
    patients: patientReducer,
    auth: authReducer,
    userAuth: userAuthReducer,
    services: serviceReducer,
    profiles: profileReducer,
    changePassword: changePasswordReducer,
    patient: patientReducer1,
    referral: referralReducer1,
    profile: profileReducer1,
  },
});

export * from "./thunks/fetchUsers";
export * from "./thunks/fetchReferrals";
export * from "./thunks/fetchPatients";
export * from "./thunks/addReferrals";
