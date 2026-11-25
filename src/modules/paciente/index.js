/**
 * @module paciente
 * @description Módulo de cadastro de pacientes, fila de triagem e controle de sigilo cadastral vs clínico.
 */

import { ROLES } from '../../config/roles.js';

export const PACIENTE_MODULE_META = {
  id: 'paciente',
  screens: ['/fila-triagem', '/pacientes'],
  allowedRoles: [ROLES.PSICOLOGO_VOLUNTARIO, ROLES.COORDENACAO_TECNICA, ROLES.COORDENACAO_ADMINISTRATIVA]
};

export function canViewClinicalRecords(roleKey) {
  return roleKey === ROLES.PSICOLOGO_VOLUNTARIO || roleKey === ROLES.COORDENACAO_TECNICA;
}
