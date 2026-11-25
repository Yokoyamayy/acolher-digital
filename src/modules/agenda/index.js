/**
 * @module agenda
 * @description Módulo de gestão de agendas (06h às 22h), visões diária/semanal/lista e persistência de slots.
 */

import { ROLES } from '../../config/roles.js';
import { STORAGE_KEYS, readStorageJson, writeStorageJson } from '../../shared/api/storageClient.js';

export const AGENDA_MODULE_META = {
  id: 'agenda',
  screens: ['/agenda'],
  defaultStartHour: 6,
  defaultEndHour: 22,
  allowedRoles: [ROLES.PSICOLOGO_VOLUNTARIO, ROLES.COORDENACAO_TECNICA, ROLES.COORDENACAO_ADMINISTRATIVA]
};

export function buildAgendaHoursRange(startHour = 6, endHour = 22) {
  const hours = [];
  for (let h = startHour; h <= endHour; h++) {
    hours.push(`${String(h).padStart(2, '0')}:00`);
  }
  return hours;
}

export function loadPersistedAgendaSlots(fallback = []) {
  return readStorageJson(STORAGE_KEYS.AGENDA_SLOTS, fallback);
}

export function savePersistedAgendaSlots(slots) {
  return writeStorageJson(STORAGE_KEYS.AGENDA_SLOTS, slots);
}
