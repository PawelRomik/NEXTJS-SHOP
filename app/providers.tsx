"use client";
import { Theme } from "@radix-ui/themes";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Theme accentColor="mint" grayColor="gray" panelBackground="solid" scaling="100%" radius="full">
			{children}
		</Theme>
	);
}
