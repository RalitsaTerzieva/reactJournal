import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    message: null,
    messageOpen: null,
    severity: 'success',
    autoHideDuration: 6000,
  },
  reducers: {
    showMessage: (state, action) => {
        state.message = action.payload.message;
        state.messageOpen = true;
        state.severity = action.payload.severity || 'success';
        state.autoHideDuration = action.payload.duration || 6000;
    },
    hideMessage: state => {
        state.messageOpen = false;
    }
  },
})

export const { showMessage, hideMessage } = messageSlice.actions

export default messageSlice.reducer