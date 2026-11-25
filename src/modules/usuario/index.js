/**
 * @module usuario
 * @description Módulo de perfis da equipe, psicólogos voluntários e configurações do perfil pessoal.
 */

import { ROLES } from '../../config/roles.js';
import { STORAGE_KEYS, readStorageJson, writeStorageJson } from '../../shared/api/storageClient.js';

export const USUARIO_MODULE_META = {
  id: 'usuario',
  screens: ['/psicologos-voluntarios', '/perfis', '/meu-perfil'],
  allowedRoles: [ROLES.ADMIN_TI, ROLES.COORDENACAO_TECNICA, ROLES.COORDENACAO_ADMINISTRATIVA, ROLES.PSICOLOGO_VOLUNTARIO]
};

export function loadPersistedProfileSettings(fallback = null) {
  return readStorageJson(STORAGE_KEYS.PROFILE_SETTINGS, fallback);
}

export function savePersistedProfileSettings(data) {
  return writeStorageJson(STORAGE_KEYS.PROFILE_SETTINGS, data);
}
