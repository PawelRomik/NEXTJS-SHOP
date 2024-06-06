import { Metadata } from "next";

export const metadata: Metadata = {
	title: "N3XT | Sign In"
};

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
	return <SignIn />;
}
