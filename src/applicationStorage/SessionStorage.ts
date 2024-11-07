import { StorageState } from '@src/types/Storage';
import { CommandPayload } from '@store/types';

const SessionStorageService = {
  Storages: 'storages',
  Counter: 'counter',
  Command: 'command',

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

  loadCounter(): number | null {
    const counter = sessionStorage.getItem(this.Counter);
    return counter ? JSON.parse(counter) : null;
  },

  saveCounter(counter: number): void {
    sessionStorage.setItem(this.Counter, JSON.stringify(counter));
  },

  clearState(): void {
    sessionStorage.removeItem(this.Storages);
  },

  loadCommand(): CommandPayload | null {
    const command = sessionStorage.getItem(this.Command);
    return command ? JSON.parse(command) : null;
  },

  saveCommand(command: CommandPayload): void {
    sessionStorage.setItem(this.Command, JSON.stringify(command));
  },
};

export default SessionStorageService;
