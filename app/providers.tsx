"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { Theme } from "@radix-ui/themes";
import { store } from "./redux/store";
import { Provider } from "react-redux";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<ClerkProvider>
				<Theme
					accentColor="mint"
					grayColor="gray"
					panelBackground="solid"
					scaling="100%"
					radius="full"
				>
					{children}
				</Theme>
			</ClerkProvider>
		</Provider>
	);
}
