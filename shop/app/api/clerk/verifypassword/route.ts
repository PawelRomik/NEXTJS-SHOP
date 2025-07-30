import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
	try {
		const clerk = await clerkClient();
		const { userId, password } = await req.json();

		if (!userId || !password) {
			return NextResponse.json({ error: "Missing userId or password" }, { status: 400 });
		}

		const response = await clerk.users.verifyPassword({
			userId,
			password
		});

		return NextResponse.json(response);
	} catch (error) {
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
