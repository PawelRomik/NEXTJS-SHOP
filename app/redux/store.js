import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cardReducer";
import storage from "redux-persist/lib/storage";
import { createStateSyncMiddleware, initMessageListener } from "redux-state-sync";
import { persistReducer, persistStore } from "redux-persist";
import { PERSIST, PURGE } from "redux-persist/es/constants";

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
		getDefaultMiddleware().concat(createStateSyncMiddleware({ blacklist: [PERSIST, PURGE] }))
});

initMessageListener(store);
export const persistor = persistStore(store);
