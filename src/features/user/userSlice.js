import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

const getAsyncUser = createAsyncThunk(
  "user/listAsyncUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  user: [],
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(getAsyncUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAsyncUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export { getAsyncUser };

export default userSlice.reducer;
