import { SignUp } from "@clerk/nextjs";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "N3XT | Sign Up"
};

export default function Page() {
	return <SignUp />;
}
