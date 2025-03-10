export const routes = Object.freeze({
  BASE_URL: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  DASHBOARD: "/dashboard",
  POLICIES: "/policies",
  USERS: "/users",
  CLAIMS: "/claims",
});

export const dashboardRoutes = [
  {
    title: "Dashboard",
    route: routes.DASHBOARD,
    properties: ["isProtected"],
  },
  {
    title: "Policies",
    route: routes.POLICIES,
    properties: ["isProtected"],
  },
  {
    title: "Claims",
    route: routes.CLAIMS,
    properties: ["isProtected"],
  },
  {
    title: "Users",
    route: routes.USERS,
    properties: ["isProtected"],
  },
];
