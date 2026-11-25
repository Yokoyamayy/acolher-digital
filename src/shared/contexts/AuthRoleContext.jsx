/**
 * @file AuthRoleContext.jsx
 * @description Contexto global de autenticação e perfil ativo RBAC para os 4 perfis oficiais do CACS.
 */

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { ROLES, normalizeRole, getRoleConfig, canAccessTab } from '../../config/roles.js';
import { STORAGE_KEYS } from '../api/storageClient.js';

const AuthRoleContext = createContext(null);

export function AuthRoleProvider({ children, initialRole }) {
  const [activeRole, setActiveRoleState] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEYS.SIMULATED_ROLE);
      return normalizeRole(initialRole || saved || ROLES.ADMIN_TI);
    } catch {
      return normalizeRole(initialRole || ROLES.ADMIN_TI);
    }
  });

  const setActiveRole = useCallback((nextRole) => {
    const normalized = normalizeRole(nextRole);
    setActiveRoleState(normalized);
    try {
      window.localStorage.setItem(STORAGE_KEYS.SIMULATED_ROLE, normalized);
    } catch {}
  }, []);

  const value = useMemo(() => {
    const roleConfig = getRoleConfig(activeRole);
    return {
      activeRole,
      roleConfig,
      setActiveRole,
      canAccess: (tabOrRoute) => canAccessTab(activeRole, tabOrRoute),
      hasClinicalAccess: Boolean(roleConfig.clinicalAccess)
    };
  }, [activeRole, setActiveRole]);

  return (
    <AuthRoleContext.Provider value={value}>
      {children}
    </AuthRoleContext.Provider>
  );
}

export function useAuthRole() {
  const ctx = useContext(AuthRoleContext);
  if (!ctx) {
    throw new Error('useAuthRole deve ser utilizado dentro de AuthRoleProvider.');
  }
  return ctx;
}
