import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import entryReducer from './entrySlice';
import messageReducer from './messageSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    entry: entryReducer,
    message: messageReducer,
  }
})