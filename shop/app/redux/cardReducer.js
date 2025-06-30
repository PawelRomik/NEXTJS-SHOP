import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	count: 0
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

			state.count += action.payload.quantity;
		},
		removeItem: (state, action) => {
			const itemId = action.payload;
			const itemIndex = state.products.findIndex((item) => item.id === itemId);

			if (itemIndex !== -1) {
				if (state.products[itemIndex].quantity > 1) {
					state.products[itemIndex].quantity--;
					state.count = Math.max(state.count - 1, 0);
				} else {
					state.count = Math.max(state.count - state.products[itemIndex].quantity, 0);
					state.products.splice(itemIndex, 1);
				}
			}
		},
		removeAllOfItem: (state, action) => {
			const itemId = action.payload;
			const item = state.products.find((item) => item.id === itemId);

			if (item) {
				state.count = Math.max(state.count - item.quantity, 0);
				state.products = state.products.filter((product) => product.id !== itemId);
			}
		},
		resetCart: (state) => {
			state.products = [];
			state.count = 0;
		},
		increaseQuantity: (state, action) => {
			const itemId = action.payload;
			const item = state.products.find((item) => item.id === itemId);

			if (item) {
				if (item.quantity < 99) {
					item.quantity++;
					state.count++;
				}
			}
		}
	}
});

export const { addToCart, removeItem, removeAllOfItem, increaseQuantity, resetCart } =
	cartSlice.actions;

export default cartSlice.reducer;
