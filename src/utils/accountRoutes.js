export const ACCOUNT_ROUTES = {
  adminMessages: "/admin/messages",
  adminVisits: "/admin/visits",
  myMessages: "/my-messages",
  profile: "/profile",
  settings: "/settings",
};

export const getLocalizedAccountRoute = (isAr, route) =>
  isAr ? `/ar${route}` : route;
