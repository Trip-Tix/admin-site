import { profile_url, settings_url, logout_url, dashboard_url, manage_transports_url, manage_users_url } from "./PageLinks";

const navbar_item = [
  ["Dashboard", dashboard_url],
  ["Manage Transports", manage_transports_url],
  ["Manage Users", manage_users_url],
];

const profile_item = [
  ["Profile", profile_url],
  ["Settings", settings_url],
  ["Logout", logout_url],
];

export { navbar_item, profile_item }