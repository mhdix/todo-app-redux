import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todo/todoSlice";
import authSlice from "./auth/authSlice";
import usersSlice from "./users/usersSlice";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
    auth: authSlice,
    users: usersSlice,
  },
});
