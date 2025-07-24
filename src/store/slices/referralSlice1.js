import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patient: null,
  type: "",
  patient_gives_consent: true,
};

const referralSlice1 = createSlice({
  name: "referral",
  initialState,
  reducers: {
    setReferral: (state, action) => {
      return { ...state, ...action.payload };
    },
    setPatientId: (state, action) => {
      state.patient = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setFile: (state, action) => {
      state.file = action.payload;
    },
    setLnmp: (state, action) => {
      state.form.lnmp = action.payload;
    },
    setAllergies: (state, action) => {
      state.form.allergies = action.payload;
    },
    setIsFasting: (state, action) => {
      state.form.is_fasting = action.payload;
    },
    setIsPregnant: (state, action) => {
      state.form.is_pregnant = action.payload;
    },
    setGestationalAge: (state, action) => {
      state.form.gestional_age = action.payload;
    },
    setTestRequired: (state, action) => {
      state.form.test_required = action.payload;
    },
    setClinicalNotes: (state, action) => {
      state.form.clinical_notes = action.payload;
    },
    setIsNotFasting: (state, action) => {
      state.form.is_not_fasting = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.form.payment_method = action.payload;
    },
    setHospitalStatus: (state, action) => {
      state.form.hospital_status = action.payload;
    },
    setIsSelfDetermined: (state, action) => {
      state.form.is_self_determined = action.payload;
    },
    setIsOnHormoneTherapy: (state, action) => {
      state.form.is_on_hormone_therapy = action.payload;
    },
    setEGFR: (state, action) => {
      if (action.payload) {
        state.form.eGFR = action.payload;
      } else {
        delete state.form.eGFR;
      }
    },
    setExaminationRequired: (state, action) => {
      state.form.examination_required = action.payload;
    },
    setHasContrastAllergy: (state, action) => {
      if (action.payload) {
        state.form.has_contrast_allergy = action.payload;
      } else {
        delete state.form.has_contrast_allergy;
      }
    },
    setHasRenalImpairment: (state, action) => {
      if (action.payload) {
        state.form.has_renal_impairment = action.payload;
      } else {
        delete state.form.has_renal_impairment;
      }
    },

    setSendResultsToEmails: (state, action) => {
      state.send_results_to_emails = action.payload;
    },
    addSendResultEmail: (state, action) => {
      if (!state.to_emails) {
        state.to_emails = []; // Initialize as an empty array if null
      }
      state.to_emails.push(action.payload);
    },
    removeSendResultEmail: (state, action) => {
      state.to_emails = state.to_emails.filter(
        (_, index) => index !== action.payload
      );
    },
    setUrgent: (state, action) => {
      state.is_urgent = action.payload;
    },
    setUrgentReason: (state, action) => {
      state.urgent_reason = action.payload;
    },
    toggleDoNotSendToMyHealthRecord: (state, action) => {
      if (action.payload) {
        state.do_not_send_to_my_health_record = action.payload;
      } else {
        delete state.do_not_send_to_my_health_record;
      }
    },
    setServiceProvider: (state, action) => {
      state.to_service = action.payload.id;
      state.to_service_data = action.payload;
    },
    setCompletionDate: (state, action) => {
      state.requested_completion_date = action.payload;
    },
    setSignedDate: (state, action) => {
      state.signed_date = action.payload;
    },
    setPatientConsent: (state, action) => {
      state.patient_gives_consent = action.payload;
    },
    resetReferral: () => initialState,
  },
});

export const {
  setReferral,
  setPatientId,
  setType,
  setFile,
  setSendResultsToEmails,
  addSendResultEmail,
  removeSendResultEmail,
  setUrgent,
  setUrgentReason,
  toggleDoNotSendToMyHealthRecord,
  setLnmp,
  setAllergies,
  setIsFasting,
  setIsPregnant,
  setGestationalAge,
  setTestRequired,
  setClinicalNotes,
  setIsNotFasting,
  setPaymentMethod,
  setHospitalStatus,
  setIsSelfDetermined,
  setIsOnHormoneTherapy,
  setEGFR,
  setExaminationRequired,
  setHasContrastAllergy,
  setHasRenalImpairment,
  setServiceProvider,
  setCompletionDate,
  setSignedDate,
  setPatientConsent,
  resetReferral,
} = referralSlice1.actions;

export default referralSlice1.reducer;
