/**
 * @module auditoria
 * @description Módulo de logs de execuções, auditoria RNF-14 e parametrização de integrações e notificações.
 */

import { ROLES } from '../../config/roles.js';

export const AUDITORIA_MODULE_META = {
  id: 'auditoria',
  screens: ['/configuracoes'],
  allowedRoles: [ROLES.ADMIN_TI, ROLES.COORDENACAO_TECNICA, ROLES.COORDENACAO_ADMINISTRATIVA],
  logCategories: ['Todos', 'E-mail', 'WhatsApp', 'Backup Drive', 'Alertas']
};
