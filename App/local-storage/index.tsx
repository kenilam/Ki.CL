// Storage
import { getItem, removeItem, setItem } from './storage';

// Context
import { LocalStorageProvider, useLocalStorageContext } from './context';

const { localStorage } = window;

export {
  localStorage,
  getItem,
  removeItem,
  setItem,
  useLocalStorageContext,
  LocalStorageProvider,
};
