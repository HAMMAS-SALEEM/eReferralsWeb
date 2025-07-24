import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const registerUser = createAsyncThunk('register/user', async (newUser) => {
  const response = await axios.post(
    // eslint-disable-next-line no-undef
    `${process.env.VIRTUAL_HOST}/api/auth/token/obtain`,
    newUser
  )
  return response.data
})

export { registerUser }
