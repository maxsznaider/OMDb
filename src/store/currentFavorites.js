import { createAction, createReducer } from "@reduxjs/toolkit"

export const addToStoreFavorites = createAction("ADD_TO_STORE_FAVORITES")
export const removeFromStoreFavorites = createAction(
  "REMOVE_FROM_STORE_FAVORITES"
)
export const clearStoreFavorites = createAction("CLEAR_STORE_FAVORITES")
export const loadStoreFavorites = createAction("LOAD_STORE_FAVORITES")

export const currentFavoritesReducer = createReducer("loading", {
  [addToStoreFavorites]: (state, action) => [...state, action.payload],
  [removeFromStoreFavorites]: (state, action) =>
    state.filter((favorite) => favorite.apiId !== action.payload.apiId),
  [clearStoreFavorites]: (state, action) => [],
  [loadStoreFavorites]: (state, action) => action.payload,
})
