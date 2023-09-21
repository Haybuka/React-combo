import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/users/userSlice'
import { createLogger } from "redux-logger";
import cakeReducer from "../features/cakes/cakeSlice";

const logger = createLogger()

const store = configureStore({
  reducer: {
    user: userReducer,
    cake: cakeReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default store