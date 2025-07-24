import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from '../thunks/fetchUsers'
import { addReferrals } from '../thunks/addReferrals'
import fetchReferrals from '../thunks/fetchReferrals'
import { deleteReferral } from '../thunks/deleteReferral'

const referralsSlice = createSlice({
  name: 'referrals',
  initialState: {
    searchTerm: '',
    filterStatus: '',
    filterChecks: ['BOOKED', 'DRAFT', 'SENT'],
    filterReferralTypes: [],
    dobCheck: '',
    fromDate: '',
    toDate: '',
    filterReferralClinics: 'onlyMine',
    createDateCheck: '',
    referrals: [],
    referralsData: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload
    },
    filterReferralStatus(state, action) {
      state.filterStatus = action.payload
    },

    filterChecks(state, action) {
      const label = action.payload
      if (state?.filterChecks?.includes(label)) {
        state.filterChecks = state.filterChecks.filter((item) => item !== label)
      } else {
        state.filterChecks.push(label)
      }
    },

    filterDOB(state, action) {
      state.dobCheck = action.payload
    },

    setFromDate(state, action) {
      state.fromDate = action.payload
    },

    setToDate(state, action) {
      state.toDate = action.payload
    },

    filterReferralClinics(state, action) {
      state.filterReferralClinics = action.payload
    },

    filterReferralTypes(state, action) {
      const label = action.payload
      if (state?.filterReferralTypes?.includes(label)) {
        state.filterReferralTypes = state.filterReferralTypes.filter(
          (item) => item !== label
        )
      } else {
        state.filterReferralTypes.push(label)
      }
    },
  },
  extraReducers(builder) {
    // Fetch referrals action
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.referrals = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
    // Fetch referrals action
    builder.addCase(fetchReferrals.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchReferrals.fulfilled, (state, action) => {
      state.isLoading = false
      state.referralsData = action.payload
    })
    builder.addCase(fetchReferrals.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
    // Add referral action
    builder.addCase(addReferrals.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addReferrals.fulfilled, (state, action) => {
      state.isLoading = false
      state.referrals.push(action.payload)
    })
    builder.addCase(addReferrals.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
    // Delete Referral

    builder.addCase(deleteReferral.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteReferral.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(deleteReferral.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
      state.referralsData = state.referralsData.filter(
        (referral) => referral.id !== action.payload
      )
    })
  },
})

export const {
  filterChecks,
  filterReferralTypes,
  filterReferralClinics,
  filterDOB,
  setFromDate,
  setToDate,
  filterReferralStatus,
  changeSearchTerm,
} = referralsSlice.actions
export const referralReducer = referralsSlice.reducer
