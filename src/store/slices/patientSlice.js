import { createSlice } from '@reduxjs/toolkit'
import { fetchPatients } from '../thunks/fetchPatients'
import { addPatient } from '../thunks/addPatient'

const patientSlice = createSlice({
  name: 'patients',
  initialState: {
    // searchTerm: '',
    // patient: [],
    // isLoading: false,
    // error: null,
    patientSearchTerm: '',
    patient: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    changeSearchPatient(state, action) {
      state.patientSearchTerm = action.payload
    },
  },
  extraReducers(builder) {
    // Fetch patient action
    builder.addCase(fetchPatients.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchPatients.fulfilled, (state, action) => {
      state.isLoading = false
      state.patient = action.payload
    })
    builder.addCase(fetchPatients.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
    // Add patient action
    builder.addCase(addPatient.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addPatient.fulfilled, (state, action) => {
      state.isLoading = false
      // state.patient.push(action.payload)
    })
    builder.addCase(addPatient.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
  },
})

export const { changeSearchPatient } = patientSlice.actions
export const patientReducer = patientSlice.reducer
