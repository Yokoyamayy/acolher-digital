/**
 * @file RoleGuard.jsx
 * @description Guarda de rota RBAC que protege as 10 telas oficiais conforme a matriz de permissões do CACS.
 */

import React from 'react';
import { useAuthRole } from '../../contexts/AuthRoleContext.jsx';

export function RoleGuard({ tab, fallback = null, children }) {
  const { activeRole, roleConfig, canAccess } = useAuthRole();

  if (!canAccess(tab)) {
    if (fallback) return fallback;
    return (
      <div className="p-6 rounded-2xl bg-white border border-rose-300 text-center space-y-2 max-w-xl mx-auto">
        <span className="inline-block px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
          Acesso Restrito • 403
        </span>
        <h3 className="text-base font-bold text-slate-900">Tela não autorizada para {roleConfig.name}</h3>
        <p className="text-xs text-slate-600">
          O perfil ativo ({activeRole}) não possui permissão para acessar esta área conforme as diretrizes do CFP e da LGPD.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

export default RoleGuard;
