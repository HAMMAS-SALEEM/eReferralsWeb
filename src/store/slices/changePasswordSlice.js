import { createSlice } from '@reduxjs/toolkit'
import { changePassword } from '../thunks/changePassword'

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: '',
}

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
    resetChangePasswordState: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.errorMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload || 'Failed to change password'
      })
  },
})

export const { resetChangePasswordState } = changePasswordSlice.actions

export const changePasswordReducer = changePasswordSlice.reducer
