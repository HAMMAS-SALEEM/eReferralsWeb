/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// import { loginUser } from '../thunks/loginUser'

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  accessToken: null,
  refreshToken: null,
  error: null,
}

export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (_, { getState }) => {
    const { accessToken } = getState().userAuth
    const response = await axios.post(
      `${process.env.VIRTUAL_HOST}/api/auth/token/verify`,
      { token: accessToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  }
)

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState }) => {
    const { refreshToken } = getState().userAuth
    const response = await axios.post(
      `${process.env.VIRTUAL_HOST}/api/auth/token/refresh`,
      { refresh: refreshToken }
    )
    return response.data
  }
)

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {},
  extraReducers: {
    [verifyToken.fulfilled]: (state) => {
      state.isLoading = false
      state.isAuthenticated = true
    },
    [verifyToken.rejected]: (state) => {
      state.isLoading = false
      state.isAuthenticated = false
    },
    [refreshToken.fulfilled]: (state, action) => {
      state.accessToken = action.payload.access
    },
    [refreshToken.rejected]: (state, action) => {
      state.error = action.error.message
    },
  },
})

export const userAuthReducer = userAuthSlice.reducer
