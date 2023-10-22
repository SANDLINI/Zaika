import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteItems: localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [],
};

export const FavoriteSlice = createSlice({
  name: "Favorite",
  initialState,
  reducers: {
    addToFavorite(state, action) {
      const index = state.favoriteItems.findIndex(
        (items) => items.id === action.payload.id
      );

      if (index === -1) {
        state.favoriteItems.push(action.payload);
        localStorage.setItem("items", JSON.stringify(state.favoriteItems));
      } else {
        alert("Item is already present");
      }
    },

    removeFromFavorite(state, action) {
      const filterItems = state.favoriteItems.filter(
        (items) => items.id !== action.payload.id
      );

      state.favoriteItems = filterItems;
      localStorage.setItem("items", JSON.stringify(state.favoriteItems));
    },
  },
});

export const { addToFavorite, removeFromFavorite } = FavoriteSlice.actions;
export default FavoriteSlice.reducer;
