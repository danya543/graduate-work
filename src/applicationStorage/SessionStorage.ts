import { StorageState } from '@src/types/Storage';

const SessionStorageService = {
  Storages: 'storages',

  loadState(): StorageState {
    const savedState = sessionStorage.getItem(this.Storages);
    return savedState
      ? JSON.parse(savedState)
      : {
          ProgramStorage: new Array(256).fill(0),
          DataStorage: new Array(256).fill(0),
        };
  },

  saveState(state: StorageState): void {
    sessionStorage.setItem(this.Storages, JSON.stringify(state));
  },

  clearState(): void {
    sessionStorage.removeItem(this.Storages);
  },
};

export default SessionStorageService;
