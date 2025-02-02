import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './todo/todoSlice';
import userReducer from './user/userSlice';

const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userReducer,
  },
});

export default store