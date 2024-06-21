import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cardReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
	key: "root",
	storage
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
	reducer: {
		cart: persistedReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
			}
		})
});

export const persistor = persistStore(store);
