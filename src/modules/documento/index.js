/**
 * @module documento
 * @description Módulo de documentos institucionais, termos (TCLE / Lei 9.608/1998 / LGPD) e pré-visualização em Drawer.
 */

import { ROLES } from '../../config/roles.js';

export const DOCUMENTO_MODULE_META = {
  id: 'documento',
  screens: ['/documentos'],
  allowedRoles: [ROLES.ADMIN_TI, ROLES.PSICOLOGO_VOLUNTARIO, ROLES.COORDENACAO_TECNICA, ROLES.COORDENACAO_ADMINISTRATIVA]
};
