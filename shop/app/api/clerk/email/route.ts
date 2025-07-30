import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
	const clerk = await clerkClient();
	const { userId } = await req.json();

	if (!userId) {
		return NextResponse.json({ message: "Invalid data" }, { status: 400 });
	}

	try {
		const user = await clerk.users.getUser(userId);
		await clerk.emailAddresses.updateEmailAddress(user.emailAddresses[0].id, {
			primary: true
		});

		await clerk.emailAddresses.deleteEmailAddress(user.emailAddresses[1].id);

		return NextResponse.json({ message: "Email updated successfully!" });
	} catch (error) {
		console.error("Error updating email:", error);
		return NextResponse.json({ message: "Error updating email" }, { status: 500 });
	}
}
