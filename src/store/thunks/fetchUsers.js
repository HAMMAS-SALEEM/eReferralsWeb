import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchUsers = createAsyncThunk('users/fetch', async () => {
  // const response = await axios.get('http://localhost:5000/users');
  const response = await axios.get(`https://referrals-api.onrender.com/users`)
  // const response = await axios.get('https://referrals-api.onrender.com/users')
  return response.data
})

export { fetchUsers }
