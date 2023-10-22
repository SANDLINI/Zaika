import { configureStore } from "@reduxjs/toolkit";
import  FavoriteSlice  from "./Features/Features";

const Store = configureStore({
  reducer: {
    favorite: FavoriteSlice,
  },
});

export default Store;