/**
 * @file routes.js
 * @description Mapa canônico das 10 rotas fixas do AcolherDigital com proteção RBAC.
 */

import { FIXED_SCREENS, ROLES, canAccessTab } from '../config/roles.js';

export const APP_ROUTES = FIXED_SCREENS.map(screen => ({
  id: screen.id,
  path: screen.route,
  label: screen.label,
  icon: screen.icon,
  section: screen.section,
  allowedRoles: Object.values(ROLES).filter(role => canAccessTab(role, screen.id))
}));

export function getRouteByPath(pathname) {
  return APP_ROUTES.find(r => r.path === pathname) || APP_ROUTES[0];
}
