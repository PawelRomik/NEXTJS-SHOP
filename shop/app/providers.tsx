"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { Theme } from "@radix-ui/themes";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { CurrencyProvider } from "./context/CurrencyProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ClerkProvider>
					<Theme
						accentColor="red"
						grayColor="gray"
						panelBackground="solid"
						scaling="100%"
						radius="full"
					>
						<CurrencyProvider>{children}</CurrencyProvider>
					</Theme>
				</ClerkProvider>
			</PersistGate>
		</Provider>
	);
}
