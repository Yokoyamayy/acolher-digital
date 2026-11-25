/**
 * @file storageClient.js
 * @description Cliente padronizado de persistência em localStorage para homologação e testes dos módulos do AcolherDigital.
 */

export const STORAGE_KEYS = {
  PROFILE_SETTINGS: 'cacs-profile-settings-v1',
  SYSTEM_SETTINGS: 'cacs-system-settings-v1',
  AGENDA_SLOTS: 'cacs-agenda-slots-v1',
  SIMULATED_ROLE: 'cacs-simulated-role'
};

export function readStorageJson(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStorageJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStorageKey(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {}
}
