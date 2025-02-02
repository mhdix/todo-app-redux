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

const toggleAsyncTodo = createAsyncThunk(
  "todo/toggleAsyncTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/todos/${todo.id}`, {
        ...todo,
        complated: !todo.complated,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addAsyncTodo = createAsyncThunk(
  "addTodo/addAsyncTodo",
  async (todoData, { rejectWithValue }) => {
    try {
      const response = await api.post("/todos", {
        text: todoData,
        complated: false,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const deleteAsyncTodo = createAsyncThunk(
  "todo/deleteAsyncTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/todos/${todo.id}`);
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
      })
      .addCase(getAsyncTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAsyncTodo.fulfilled, (state, action) => {
        const todoId = action.payload.id;
        state.loading = false;
        state.error = null;
        if (todoId) {
          state.todo = state.todo.filter((todo) => todo.id !== todoId);
        } else {
          state.todo = action.payload;
        }
      })
      .addCase(addAsyncTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAsyncTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.todo.push(action.payload);
      })
      .addCase(addAsyncTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleAsyncTodo.fulfilled, (state, action) => {
        const todo = state.todo.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.complated = !todo.complated;
        }
      })
      .addCase(deleteAsyncTodo.fulfilled, (state, action) => {
        state.todo = state.todo.filter((todo) => todo.id !== action.payload.id);
      });
  },
});

export { getAsyncTodo, addAsyncTodo, toggleAsyncTodo, deleteAsyncTodo };
export default todoSlice.reducer;
