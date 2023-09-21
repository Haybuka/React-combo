const { configureStore } = require("@reduxjs/toolkit");
const cakeReducer = require("../features/cake/cakeSlice")
const creamReducer = require("../features/cream/creamSlice");
const userReducer = require("../features/user/userSlice");
const { createLogger } = require("redux-logger");

const logger = createLogger()

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    cream: creamReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

module.exports = store;