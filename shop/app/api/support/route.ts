import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
	try {
		const formData = await req.formData();
		const email = formData.get("email") as string;
		const subject = formData.get("subject") as string;
		const description = formData.get("description") as string;
		const attachments = formData.getAll("attachments") as File[];

		const files = await Promise.all(
			attachments.map(async (file) => ({
				filename: file.name,
				content: Buffer.from(await file.arrayBuffer())
			}))
		);

		const { data, error } = await resend.emails.send({
			from: "Support Form <onboarding@resend.dev>",
			to: process.env.SUPPORT_EMAIL_TO!,
			subject: `🧾 ${subject} (${email})`,
			text: description,
			attachments: files
		});

		if (error) {
			return Response.json({ error }, { status: 500 });
		}

		return NextResponse.json(data);
	} catch (err) {
		console.error(err);
		return NextResponse.json({ success: false, error: "Email sending failed" }, { status: 500 });
	}
}
