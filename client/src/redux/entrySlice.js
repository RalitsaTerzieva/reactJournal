import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiService } from '../services/apiService'

const createEntry = createAsyncThunk(
    'entries/create',
    async (values, thunkAPI) => {
      return await apiService.createEntry(values);
    }
  )

  const updateEntry = createAsyncThunk(
    'entries/update',
    async ({id, values}, thunkAPI) => {
      return await apiService.updateEntry(id, values);
    }
  )

export const entrySlice = createSlice({
  name: 'entry',
  initialState: {
    createError: null,
    updateError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createEntry.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.createError = action.payload.error;
        } else {
          state.createError = null;
        }
    });

    builder.addCase(updateEntry.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.updateError = action.payload.error;
      } else {
        state.updateError = null;
      }
    });
  }
})

export { createEntry, updateEntry };

export default entrySlice.reducer