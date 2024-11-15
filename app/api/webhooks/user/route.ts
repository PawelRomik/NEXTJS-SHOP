import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { Webhook, WebhookRequiredHeaders } from "svix";
import createApolloClient from "../../../../apollo-client";

const CREATE_USER = gql`
	mutation createClient($email: String, $name: String) {
		createClient(data: { name: $name, email: $email }) {
			data {
				attributes {
					name
					email
				}
			}
		}
	}
`;

const MODIFY_USER = gql`
	mutation updateClient($email: String, $name: String, $id: ID!) {
		updateClient(id: $id, data: { name: $name, email: $email }) {
			data {
				attributes {
					name
					email
				}
			}
		}
	}
`;

const webhookSecret = process.env.WEBHOOK_SECRET || "";

async function handler(request: Request) {
	const payload = await request.json();
	const headersList = headers();
	const heads = {
		"svix-id": headersList.get("svix-id"),
		"svix-timestamp": headersList.get("svix-timestamp"),
		"svix-signature": headersList.get("svix-signature")
	};
	const wh = new Webhook(webhookSecret);
	let evt: Event | null = null;

	try {
		evt = wh.verify(
			JSON.stringify(payload),
			heads as IncomingHttpHeaders & WebhookRequiredHeaders
		) as Event;
	} catch (err) {
		console.error((err as Error).message);
		return NextResponse.json({}, { status: 400 });
	}
	const client = await createApolloClient();

	const eventType = evt.type;
	if (eventType === "user.created") {
		const { email_addresses, username } = evt.data;

		await client.mutate({
			mutation: CREATE_USER,
			variables: {
				name: username,
				email: email_addresses[0].email_address
			}
		});
	}
	if (eventType === "user.updated") {
		const { id, email_addresses, username } = evt.data;
		await client.mutate({
			mutation: MODIFY_USER,
			variables: {
				id: id,
				name: username,
				email: email_addresses[0].email_address
			}
		});
	}
	return new Response(JSON.stringify({}), { status: 200 });
}

type Event = {
	data: {
		id: string;
		email_addresses: { id: string; email_address: string }[];
		username: string;
	};
	object: string;
	type: string;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
