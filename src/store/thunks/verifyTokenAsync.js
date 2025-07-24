import { createAsyncThunk } from '@reduxjs/toolkit'

export const verifyTokenAsync = createAsyncThunk(
  'auth/verifyToken',
  async (_, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
      if (!accessToken) {
        throw new Error('Access token not found')
      }

      const response = await fetch(
        // eslint-disable-next-line no-undef
        `${process.env.VIRTUAL_HOST}/api/auth/token/verify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: accessToken }),
        }
      )

      if (!response.ok) {
        throw new Error('Token verification failed')
      }

      return
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
