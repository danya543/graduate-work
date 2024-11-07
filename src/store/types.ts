//storages
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

//pc counter
export const INCREMENT = 'INCREMENT';
export const RESET = 'RESET';

export interface IncrementCounterAction {
  type: typeof INCREMENT;
}

export interface ResetCounterAction {
  type: typeof RESET;
}

export type CounterActionTypes = IncrementCounterAction | ResetCounterAction;

//acc
export const SET_ACC = 'SET_ACC';
export const RESET_ACC = 'RESET_ACC';

export type StorageRegistrPayload = { newValue: number };

export interface SetAccAction {
  type: typeof SET_ACC;
  payload: StorageRegistrPayload;
}

export interface ResetAccAction {
  type: typeof RESET_ACC;
}

export type AccActionTypes = SetAccAction | ResetAccAction;

//temp
export const SET_TEMP = 'SET_TEMP';
export const RESET_TEMP = 'RESET_TEMP';

export interface SetTempAction {
  type: typeof SET_TEMP;
  payload: StorageRegistrPayload;
}

export interface ResetTempAction {
  type: typeof RESET_TEMP;
}

export type TempActionTypes = SetTempAction | ResetTempAction;

//command
export const SET_COMMAND = 'SET_COMMAND';
export const RESET_COMMAND = 'RESET_COMMAND';

export type CommandPayload = { firstValue: number; secondValue: number };
export interface SetCommandAction {
  type: typeof SET_COMMAND;
  payload: {
    newFirstValue: number;
    newSecondValue: number;
  };
}

export interface ResetCommandAction {
  type: typeof RESET_COMMAND;
}

export type CommandActionTypes = SetCommandAction | ResetCommandAction;

//all types
export type AppAction =
  | StorageActionTypes
  | CounterActionTypes
  | AccActionTypes
  | TempActionTypes
  | CommandActionTypes;
