import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
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
        throw new Error('Failed to login')
      }

      const data = await response.json()
      localStorage.setItem('accessToken', data.access_token)
      localStorage.setItem('refreshToken', data.refresh_token)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
