/**
 * @file Can.jsx
 * @description Componente declarativo RBAC para renderização condicional baseada no perfil ativo ou rota.
 */

import React from 'react';
import { useAuthRole } from '../../contexts/AuthRoleContext.jsx';

export function Can({ tab, roles, requireClinicalAccess = false, fallback = null, children }) {
  const { activeRole, canAccess, hasClinicalAccess } = useAuthRole();

  if (tab && !canAccess(tab)) return fallback;
  if (Array.isArray(roles) && roles.length > 0 && !roles.includes(activeRole)) return fallback;
  if (requireClinicalAccess && !hasClinicalAccess) return fallback;

  return <>{children}</>;
}

export default Can;
