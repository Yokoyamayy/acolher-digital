/**
 * @module clinica
 * @description Módulo de prontuários eletrônicos (PEP), evoluções terapêuticas e regras clínicas parametrizadas.
 */

import { ROLES } from '../../config/roles.js';
import { STORAGE_KEYS, readStorageJson, writeStorageJson } from '../../shared/api/storageClient.js';

export const CLINICA_MODULE_META = {
  id: 'clinica',
  screens: ['/pacientes', '/configuracoes'],
  clinicalRoles: [ROLES.PSICOLOGO_VOLUNTARIO, ROLES.COORDENACAO_TECNICA]
};

export const DEFAULT_CLINICAL_RULES = {
  sessionDurationMin: 50,
  sessionIntervalMin: 10,
  agendaStartHour: 6,
  agendaEndHour: 22,
  maxConsecutiveAbsences: 2,
  lateToleranceMin: 15,
  standardCycleSessions: 12,
  evolutionEditWindowHours: 24,
  inactivityLockMin: 30
};

export function loadPersistedSystemSettings(fallback = DEFAULT_CLINICAL_RULES) {
  return readStorageJson(STORAGE_KEYS.SYSTEM_SETTINGS, fallback);
}

export function savePersistedSystemSettings(settings) {
  return writeStorageJson(STORAGE_KEYS.SYSTEM_SETTINGS, settings);
}
