import { createAsyncThunk } from '@reduxjs/toolkit'

export const refreshAccessTokenAsync = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        throw new Error('Refresh token not found')
      }

      const response = await fetch(
        // eslint-disable-next-line no-undef
        `${process.env.VIRTUAL_HOST}/api/auth/token/refresh`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: refreshToken }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to refresh token')
      }

      const data = await response.json()
      localStorage.setItem('accessToken', data.access)
      localStorage.setItem('refreshToken', data.refresh)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
