import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextFetchEvent, NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/order(.*)"]);

const nextIntlMiddleware = createMiddleware({
	locales: ["en", "pl", "de", "fr", "es"],
	defaultLocale: "en"
});

export default clerkMiddleware((auth, req) => {
	if (isProtectedRoute(req)) {
		auth().protect({});
	}

	const path = req.nextUrl.pathname;
	if (path.includes("/api")) {
		return;
	}

	return nextIntlMiddleware(req);
});

export const config = {
	matcher: ["/((?!api|static|.*\\..*|_next).*)"]
};
