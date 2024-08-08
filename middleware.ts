import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";
import { NextFetchEvent, NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/order(.*)"]);

const clerkAuthMiddleware = clerkMiddleware((auth, req) => {
	if (isProtectedRoute(req)) auth().protect();
});

export default function combinedMiddleware(request: NextRequest, event: NextFetchEvent) {
	const clerkResponse = clerkAuthMiddleware(request, event);
	if (clerkResponse) return clerkResponse;
	return i18nRouter(request, i18nConfig);
}

export const config = {
	matcher: ["/((?!api|static|.*\\..*|_next).*)"]
};
