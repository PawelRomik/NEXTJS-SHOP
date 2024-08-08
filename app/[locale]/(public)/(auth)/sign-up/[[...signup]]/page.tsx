import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sign Up | Ephonix"
};

export default function SignUpPage() {
	return <SignUp />;
}
