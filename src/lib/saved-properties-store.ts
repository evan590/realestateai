'use client';

const STORAGE_KEY = 'realestateai_saved_properties';

interface SavedEntry {
  propertyId: string;
  savedAt: string;
  notes?: string;
}

function getStorage(): SavedEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveStorage(entries: SavedEntry[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function getSavedPropertyIds(): string[] {
  return getStorage().map((e) => e.propertyId);
}

export function isPropertySaved(propertyId: string): boolean {
  return getStorage().some((e) => e.propertyId === propertyId);
}

export function saveProperty(propertyId: string, notes?: string): void {
  const entries = getStorage();
  if (entries.some((e) => e.propertyId === propertyId)) return;
  entries.push({ propertyId, savedAt: new Date().toISOString(), notes });
  saveStorage(entries);
}

export function unsaveProperty(propertyId: string): void {
  saveStorage(getStorage().filter((e) => e.propertyId !== propertyId));
}

export function toggleSaveProperty(propertyId: string): boolean {
  if (isPropertySaved(propertyId)) {
    unsaveProperty(propertyId);
    return false;
  } else {
    saveProperty(propertyId);
    return true;
  }
}

// Seed initial saved properties for demo
export function seedSavedProperties(): void {
  if (getStorage().length > 0) return;
  ['1', '3', '5', '7', '10'].forEach((id) => saveProperty(id));
}
