import { createAsyncThunk } from '@reduxjs/toolkit'

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    // eslint-disable-next-line no-undef
    try {
      const response = await fetch(
        // eslint-disable-next-line no-undef
        `${process.env.VIRTUAL_HOST}/api/auth/token/obtain`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        return rejectWithValue(errorData.detail || 'Failed to login')
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
