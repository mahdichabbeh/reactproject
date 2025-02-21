import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Slices/CartSlice";
import productsReducer from "../Slices/ProductSlice"

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer, 
  },
});

export default store;
