import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import service from "../../services/service";

export const login = createAsyncThunk(
  "authLogin/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await service.login(email, password);
      return response.body;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("authLogout/logout", async () => {
  service.logout();
});

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  error: "",
  loadingError: false,
};

const loginSlice = createSlice({
  name: "authLogin",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
      state.loadingError = false;
    },

    [login.fulfilled]: (state) => {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
      state.loadingError = false;
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.loadingError = true;
    },
    [logout.fulfilled]: (state) => {
      state.isLoggedIn = false;
    },
  },
});

const { reducer } = loginSlice;
export default reducer;
