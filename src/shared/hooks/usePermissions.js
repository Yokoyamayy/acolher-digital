/**
 * @file usePermissions.js
 * @description Hook utilitário para verificação declarativa de permissões RBAC por perfil.
 */

import { useAuthRole } from '../contexts/AuthRoleContext.jsx';
import { ROLES } from '../../config/roles.js';

export function usePermissions() {
  const { activeRole, roleConfig, canAccess, hasClinicalAccess } = useAuthRole();
  return {
    activeRole,
    roleConfig,
    canAccess,
    hasClinicalAccess,
    isAdminTi: activeRole === ROLES.ADMIN_TI,
    isPsicologo: activeRole === ROLES.PSICOLOGO_VOLUNTARIO,
    isCoordTecnica: activeRole === ROLES.COORDENACAO_TECNICA,
    isCoordAdmin: activeRole === ROLES.COORDENACAO_ADMINISTRATIVA,
    canManageTechnicalSettings: activeRole === ROLES.ADMIN_TI
  };
}
