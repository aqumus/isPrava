import config from '../config';

const { persistenceKey } = config;

// Wrapper over window.localStorage API, which only implements set and get
export class LocalPersistence {
  set(value) {
    try {
      const stringifiedValue = JSON.stringify(value);
      window.localStorage.setItem(persistenceKey, stringifiedValue);
      return true;
    } catch (e) {
      console.error('Unable to stringify submitted', e);
      return false;
    }
  }

  get() {
    try {
      const stringifiedValue = window.localStorage.getItem(persistenceKey);
      return JSON.parse(stringifiedValue);
    } catch (e) {
      console.error('Unable to get persisted value');
      return null;
    }
  }

  delete() {
    window.localStorage.removeItem(persistenceKey);
  }
}
