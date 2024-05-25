import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: []
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const item = state.products.find((item) => item.id === action.payload.id);

			if (item) {
				item.quantity += action.payload.quantity;
			} else {
				state.products.push(action.payload);
			}
		},
		removeItem: (state, action) => {
			const itemId = action.payload;
			const itemIndex = state.products.findIndex((item) => item.id === itemId);

			if (itemIndex !== -1) {
				if (state.products[itemIndex].quantity > 1) {
					state.products[itemIndex].quantity--;
				} else {
					state.products.splice(itemIndex, 1);
				}
			}
		},
		resetCart: (state) => {
			state.products = [];
		}
	}
});

export const { addToCart, removeItem, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
