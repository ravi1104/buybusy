import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./redux/reducers/loginReducer";
import { shopReducer } from "./redux/reducers/shopReducer";

export const store = configureStore({
  reducer: {
    loginReducer,
    shopReducer
  }
});
