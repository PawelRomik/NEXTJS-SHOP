import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";

const isProtectedRoute = createRouteMatcher([
	"/:locale/user(.*)",
	"/:locale/order(.*)",
	"/:locale/cart(.*)"
]);

const nextIntlMiddleware = createMiddleware({
	locales: ["en", "pl"],
	defaultLocale: "en"
});

export default clerkMiddleware(async (auth, req) => {
	if (isProtectedRoute(req)) {
		await auth.protect();
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
