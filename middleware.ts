import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};


// controls which pages are protected (need log in to access)
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/student(.*)',
  '/settings(.*)',
]);