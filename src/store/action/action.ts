import { SignalsStateKeys } from '@src/types/Signals';
import {
  CHANGE_DATASTORAGE,
  CHANGE_PROGRAMSTORAGE,
  CHANGE_SIGNALS,
  ChangeDataStorageAction,
  ChangeProgramStorageAction,
  ChangeSignalsAction,
  CommandPayload,
  INCREMENT,
  IncrementCounterAction,
  OPERATION,
  OperationAction,
  RESET,
  RESET_ACC,
  RESET_COMMAND,
  RESET_SIGNALS,
  RESET_TEMP,
  ResetAccAction,
  ResetCommandAction,
  ResetCounterAction,
  ResetSignalsAction,
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
export const AdderOperation = (
  firstOperand: number,
  secondOperand: number,
  resultIndex: number,
): OperationAction => ({
  type: OPERATION,
  payload: { firstOperand, secondOperand, resultIndex },
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

//signals
export const changeSignal = (
  signal: SignalsStateKeys,
): ChangeSignalsAction => ({
  type: CHANGE_SIGNALS,
  payload: {
    signal: signal,
  },
});

export const resetSignals = (): ResetSignalsAction => ({ type: RESET_SIGNALS });
