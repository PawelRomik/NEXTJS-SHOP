import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cardReducer";

export const store = configureStore({
	reducer: { cart: cartReducer }
});
