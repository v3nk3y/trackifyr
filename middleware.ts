export { default } from "next-auth/middleware";

// route protection for pages
export const config = {
  matcher: ["/issues/new", "/issues/edit/:id+"],
};
