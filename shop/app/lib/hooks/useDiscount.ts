import { useRef, useState } from "react";
import { getApolloClient } from "../../../apollo-client";
import { DiscountData, GET_DISCOUNT_BY_NAME } from "../../queries/discount";
import { ApolloQueryResult } from "@apollo/client";
import { useLocale, useTranslations } from "next-intl";

export function useDiscount(onDiscountApply: (value: number) => void) {
	const [message, setMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [usedCode, setUsedCode] = useState<string | null>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const locale = useLocale();
	const t = useTranslations("cart");

	const fetchDiscount = async (code: string) => {
		const client = await getApolloClient();
		const { data }: ApolloQueryResult<DiscountData> = await client.query({
			query: GET_DISCOUNT_BY_NAME,
			variables: { code: code, locale: locale }
		});
		return data.discounts.data[0]?.attributes ?? null;
	};

	const applyDiscount = async (input: string) => {
		setLoading(true);
		setMessage(null);

		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		const code = input;
		if (!code) {
			setMessage(t("wrongCode"));
			setLoading(false);
			timeoutRef.current = setTimeout(() => setMessage(null), 3000);
			return;
		}

		if (usedCode === code) {
			setMessage(t("codeUsed"));
			setLoading(false);
			timeoutRef.current = setTimeout(() => setMessage(null), 3000);
			return;
		}

		const discount = await fetchDiscount(code);

		if (discount) {
			onDiscountApply(discount.value);
			setUsedCode(code);
			setMessage(t("addedDiscount", { discount: discount.value }));
		} else {
			setMessage(t("wrongCode"));
		}

		setLoading(false);
		timeoutRef.current = setTimeout(() => setMessage(null), 3000);
	};

	return {
		message,
		loading,
		applyDiscount
	};
}
