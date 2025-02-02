import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  todo: [],
  error: null,
};

const api = axios.create({
  baseURL: "http://localhost:3001",
});

const getAsyncTodo = createAsyncThunk(
  "todo/getAsyncTodo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/todos");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addAsyncTodo = createAsyncThunk(
  "addTodo/addAsyncTodo",
  async (todoData, { rejectWithValue }) => {
    console.log(todoData)
    try {
      const response = await api.post("/todos", {text: todoData, complated: false});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.todo = [];
      })
      .addCase(getAsyncTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.todo = [];
      })
      .addCase(getAsyncTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.todo = action.payload;
      })
      .addCase(addAsyncTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.todo = [];
      })
      .addCase(addAsyncTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.todo.push(action.payload);
      })
      .addCase(addAsyncTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.todo = [];
      });
  },
});

export { getAsyncTodo, addAsyncTodo };
export default todoSlice.reducer;
