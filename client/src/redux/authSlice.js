import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiService } from '../services/apiService'
import { getLocalJwt, setLocalJwt } from '../services/jwt'

const login = createAsyncThunk(
    'users/login',
    async (userFormData, thunkAPI) => {
      const response = await apiService.login(userFormData.values); // Submit the user login data
      
      if(!response.error) {
        userFormData.actions.resetForm() // Use formik actions callback to clean form data when server returns no errors
      }  

      return response
    }
  )

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loginError: null,
    loginVisible: false,
    ...getLocalJwt(),
  },
  reducers: {
    setLoginVisible: (state, action) => {
      state.loginVisible = action.payload
    },
    logout: state => {
      setLocalJwt(null);
      state.user = null;
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.loginError = action.payload.error;
        } else {
          state.loginError = null;
          state.token = action.payload.token;
          state.user = action.payload.user;
          setLocalJwt(state.token);
          state.loginVisible = false;
        }
    })
  }
})

export const { setLoginVisible, logout } = authSlice.actions
export { login };

export default authSlice.reducer