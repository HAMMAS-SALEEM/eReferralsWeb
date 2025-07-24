import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const checkAuthState = createAsyncThunk('auth/checkState', async () => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    throw new Error('No token found')
  }

  try {
    const response = await axios.post(
      // eslint-disable-next-line no-undef
      `${process.env.VIRTUAL_HOST}/api/auth/token/verify`,
      { token: accessToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    localStorage.setItem('accessToken', accessToken)
    if (response?.status === 200) {
      localStorage.setItem('accessToken', accessToken)
      return accessToken
    } else {
      throw new Error('Token verification failed')
    }
  } catch (error) {
    throw new Error('Token verification failed')
  }
})

export default checkAuthState
