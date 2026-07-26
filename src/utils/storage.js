const STORAGE_KEY = "wyze-bundle-builder:v1";

export function loadSavedSystem() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch (err) {
    console.warn("Could not read saved system from localStorage", err);
    return null;
  }
}

export function saveSystem(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (err) {
    console.warn("Could not save system to localStorage", err);
    return false;
  }
}

export function clearSavedSystem() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn("Could not clear saved system from localStorage", err);
  }
}
