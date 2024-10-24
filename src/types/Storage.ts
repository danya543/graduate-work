export type StorageState = {
  ProgramStorage: number[];
  DataStorage: number[];
};

export const CHANGE_PROGRAMSTORAGE = 'CHANGE_PROGRAMSTORAGE';
export const CHANGE_DATASTORAGE = 'CHANGE_DATASTORAGE';

export type ChangeStoragePayload = { index: number; newValue: number };

export interface ChangeProgramStorageAction {
  type: typeof CHANGE_PROGRAMSTORAGE;
  payload: ChangeStoragePayload;
  [key: string]: unknown;
}

export interface ChangeDataStorageAction {
  type: typeof CHANGE_DATASTORAGE;
  payload: ChangeStoragePayload;
  [key: string]: unknown;
}

export type StorageActionTypes =
  | ChangeProgramStorageAction
  | ChangeDataStorageAction;
