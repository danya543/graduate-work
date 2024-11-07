import {
  CHANGE_DATASTORAGE,
  CHANGE_PROGRAMSTORAGE,
  ChangeDataStorageAction,
  ChangeProgramStorageAction,
  CommandPayload,
  INCREMENT,
  IncrementCounterAction,
  RESET,
  RESET_ACC,
  RESET_COMMAND,
  RESET_TEMP,
  ResetAccAction,
  ResetCommandAction,
  ResetCounterAction,
  ResetTempAction,
  SET_ACC,
  SET_COMMAND,
  SET_TEMP,
  SetAccAction,
  SetCommandAction,
  SetTempAction,
} from '@store/types';

//storages
export const ChangeProgramStorage = (
  index: number,
  newValue: number,
): ChangeProgramStorageAction => ({
  type: CHANGE_PROGRAMSTORAGE,
  payload: { index, newValue },
});

export const ChangeDataStorage = (
  index: number,
  newValue: number,
): ChangeDataStorageAction => ({
  type: CHANGE_DATASTORAGE,
  payload: { index, newValue },
});

//counter
export const increment = (): IncrementCounterAction => ({ type: INCREMENT });
export const reset = (): ResetCounterAction => ({ type: RESET });

//acc
export const setAccValue = (newValue: number): SetAccAction => ({
  type: SET_ACC,
  payload: {
    newValue,
  },
});
export const resetAccValue = (): ResetAccAction => ({ type: RESET_ACC });

//temp
export const setTempValue = (newValue: number): SetTempAction => ({
  type: SET_TEMP,
  payload: {
    newValue,
  },
});

export const resetTempValue = (): ResetTempAction => ({ type: RESET_TEMP });

//command
export const setCommand = (newValue: CommandPayload): SetCommandAction => ({
  type: SET_COMMAND,
  payload: {
    newFirstValue: newValue.firstValue,
    newSecondValue: newValue.secondValue,
  },
});

export const resetCommand = (): ResetCommandAction => ({ type: RESET_COMMAND });
