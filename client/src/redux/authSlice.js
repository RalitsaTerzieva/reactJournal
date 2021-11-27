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

  const register = createAsyncThunk(
    'users/register',
    async (userFormData, thunkAPI) => {
      const response = await apiService.register(userFormData.values); // Submit the user login data

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
    registerError: null,
    registerVisible: false,
  },
  reducers: {
    setLoginVisible: (state, action) => {
      state.loginVisible = action.payload
    },
    logout: state => {
      setLocalJwt(null);
      state.user = null;
      state.token = null;
    },
    setRegisterVisible: (state, action) => {
      state.registerVisible = action.payload
    },
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

    builder.addCase(register.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.registerError = action.payload.error;
      } else {
        state.registerError = null;
        state.token = action.payload.token;
        state.user = action.payload.user;
        setLocalJwt(state.token);
        state.registerVisible = false;
      }
  })
  }
})

export const { setLoginVisible, logout, setRegisterVisible } = authSlice.actions
export { login, register };

export default authSlice.reducer