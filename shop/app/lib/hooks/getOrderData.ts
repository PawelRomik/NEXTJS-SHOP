import { getApolloClient } from "../../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { OrderData } from "../../queries/productType";
import { GET_ORDER_BY_SESSION_ID } from "../../queries/order";

export async function getOrderData(sessionId: string) {
	if (!sessionId) return null;

	const client = await getApolloClient();

	const { data }: ApolloQueryResult<OrderData> = await client.query({
		query: GET_ORDER_BY_SESSION_ID,
		variables: { session_id: sessionId }
	});

	const order = data.orders.data[0];
	if (!order) return null;

	return order;
}
