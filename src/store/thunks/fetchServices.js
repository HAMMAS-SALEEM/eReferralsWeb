/* eslint-disable no-undef */
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchServices = createAsyncThunk(
  'services/fetch',
  async ({ serviceType, search, limit = 50, offset, filters }) => {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      throw new Error('Access token is not available.')
    }

    const trimmedAccessToken = accessToken.trim()

    const config = {
      headers: {
        Authorization: `Bearer ${trimmedAccessToken}`,
      },
    }

    let queryString = `?type=${serviceType.toUpperCase()}`

    if (search) {
      queryString += `&search=${search}`
    }
    if (limit) {
      queryString += `&limit=${limit}`
    }
    if (offset) {
      queryString += `&offset=${offset}`
    }

    if (filters.favourite) {
      queryString += `&favourite=true`
    }
    if (filters.usedByDoctor) {
      queryString += `&used_by_doctor=true`
    }
    if (filters.ordering) {
      queryString += `&ordering=${filters.ordering}`
    }
    if (filters.billingOptions) {
      filters.billingOptions.forEach((option) => {
        queryString += `&organisation__billing_options=${option}`
      })
    }
    if (filters.postcode) {
      queryString += `&postcode=${filters.postcode}`
    }

    const url = `${process.env.VIRTUAL_HOST}/api/v1/services${queryString}`

    const response = await axios.get(url, config)

    return response.data
  }
)

export { fetchServices }
