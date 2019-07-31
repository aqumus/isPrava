import config from '../config';
import { LocalPersistence } from './localPersistence';

const { persistenceEndPoint } = config;

/*
    Map pf persistence service, easily extended to use different persistent endpoint
    based on the config
 */
const PersistenceServiceMap = {
  local: new LocalPersistence()
};

export class PersistenceService {
  constructor(endPoint) {
    this.service = PersistenceServiceMap[endPoint || persistenceEndPoint];
  }

  set(value) {
    return this.service.set(value);
  }

  get() {
    return this.service.get();
  }

  delete() {
    return this.service.delete();
  }
}

export const Persistence = new PersistenceService();
