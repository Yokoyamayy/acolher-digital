/**
 * @module dashboard
 * @description Módulo da tela Início com KPIs e painéis contextuais adaptados aos 4 perfis oficiais RBAC.
 */

import { ROLES } from '../../config/roles.js';

export const DASHBOARD_MODULE_META = {
  id: 'dashboard',
  screens: ['/inicio'],
  allowedRoles: [ROLES.ADMIN_TI, ROLES.PSICOLOGO_VOLUNTARIO, ROLES.COORDENACAO_TECNICA, ROLES.COORDENACAO_ADMINISTRATIVA]
};
