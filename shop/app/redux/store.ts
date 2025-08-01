import { configureStore, Middleware, Store } from "@reduxjs/toolkit";
import cartReducer from "./cardReducer";
import { createStateSyncMiddleware, initMessageListener } from "redux-state-sync";
import { Persistor, persistReducer, persistStore } from "redux-persist";
import { PERSIST, PURGE } from "redux-persist/es/constants";

const isClient = typeof window !== "undefined";

let store: Store;
let persistor: Persistor;

const defaultConfig = {
	channel: "redux_state_sync",
	blacklist: [PERSIST, PURGE],
	whitelist: [],
	broadcastChannelOption: undefined,
	prepareState: (state: any) => state,
	receiveState: (prevState: any, nextState: any) => nextState
};

if (isClient) {
	const AsyncStorage = require("@react-native-async-storage/async-storage").default;

	const persistConfig = {
		key: "root",
		storage: AsyncStorage
	};

	const persistedReducer = persistReducer(persistConfig, cartReducer);
	const stateSyncMiddleware = createStateSyncMiddleware(defaultConfig) as Middleware;

	store = configureStore({
		reducer: {
			cart: persistedReducer
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false
			}).concat(stateSyncMiddleware)
	});

	initMessageListener(store);
	persistor = persistStore(store);
} else {
	store = configureStore({
		reducer: {
			cart: cartReducer
		}
	});
}

export { store, persistor };
