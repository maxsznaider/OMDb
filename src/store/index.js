import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"

import { currentUserReducer } from "./currentUser"
import { currentFavoritesReducer } from "./currentFavorites"

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
  reducer: {
    currentUser: currentUserReducer,
    currentFavorites: currentFavoritesReducer,
  },
})

export default store
