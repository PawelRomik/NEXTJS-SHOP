"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetCart } from "../redux/cardReducer";

export default function ResetCartHandler() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(resetCart());
	}, [dispatch]);

	return null;
}
