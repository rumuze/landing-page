export const ACCOUNT_ROUTES = {
  profile: "/profile",
  settings: "/settings",
};

export const getLocalizedAccountRoute = (isAr, route) =>
  isAr ? `/ar${route}` : route;
