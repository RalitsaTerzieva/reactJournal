import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiService } from '../services/apiService'

const createEntry = createAsyncThunk(
    'entries/create',
    async (values, thunkAPI) => {
      return await apiService.createEntry(values);
    }
  )

export const entrySlice = createSlice({
  name: 'entry',
  initialState: {
    createError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createEntry.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.createError = action.payload.error;
        } else {
          state.createError = null;
        }
    })
  }
})

export { createEntry };

export default entrySlice.reducer