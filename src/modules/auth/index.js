/**
 * @module auth
 * @description Módulo de autenticação, sessão, lockout e gestão de acessos RBAC.
 */

import { ROLES, normalizeRole } from '../../config/roles.js';

export const AUTH_MODULE_META = {
  id: 'auth',
  screens: ['/gestao-acessos'],
  allowedRoles: [ROLES.ADMIN_TI]
};

export function resolvePrimaryRoleFromPermissions(permissions = []) {
  if (permissions.includes('adminTi')) return ROLES.ADMIN_TI;
  if (permissions.includes('coordTecnica')) return ROLES.COORDENACAO_TECNICA;
  if (permissions.includes('coordAdmin')) return ROLES.COORDENACAO_ADMINISTRATIVA;
  if (permissions.includes('psicologo')) return ROLES.PSICOLOGO_VOLUNTARIO;
  return normalizeRole(permissions[0]);
}
