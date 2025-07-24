import { createSlice } from '@reduxjs/toolkit'
import { fetchServices } from '../thunks/fetchServices'

const serviceSlice = createSlice({
  name: 'services',
  initialState: {
    serviceSearchTerm: '',
    service: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    changeSearchServices(state, action) {
      state.serviceSearchTerm = action.payload
    },
    mergeServices: (state, action) => {
      state.service.results = [...state.service.results, ...action.payload]
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.meta.arg.offset > 0) {
          state.service = {
            ...state.service,
            next: action.payload.next,
            previous: action.payload.previous,
            results: [...state.service.results, ...action.payload.results],
          }
        } else {
          state.service = action.payload
        }
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })
  },
})

export const { changeSearchServices, mergeServices } = serviceSlice.actions
export const serviceReducer = serviceSlice.reducer
