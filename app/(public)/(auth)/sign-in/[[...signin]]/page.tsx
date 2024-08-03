import { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
	title: "Sign In | Ephonix"
};

export default function SignInPage() {
	return <SignIn />;
}
