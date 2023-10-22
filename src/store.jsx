import { configureStore } from "@reduxjs/toolkit";
import  FavoriteSlice  from "./features";

const Store = configureStore({
  reducer: {
    favorite: FavoriteSlice,
  },
});

export default Store;