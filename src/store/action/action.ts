import { SignalsStateKeys } from '@src/types/Signals';
import {
  ADD_SIGNALS,
  AddSignalsAction,
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
  REMOVE_LAST_SIGNAL,
  RemoveLastSignalAction,
  RESET,
  RESET_ACC,
  RESET_COMMAND,
  RESET_SIGNALS,
  ResetAccAction,
  ResetCommandAction,
  ResetCounterAction,
  ResetSignalsAction,
  SET_ACC,
  SET_COMMAND,
  SET_SIGNALS,
  SetAccAction,
  SetCommandAction,
  SetSignalsAction,
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
  operationType: 0 | 1,
  firstValueIndex: number,
  secondValueIndex: number,
  resultValueIndex: number,
): OperationAction => ({
  type: OPERATION,
  payload: {
    operationType,
    firstValueIndex,
    secondValueIndex,
    resultValueIndex,
  },
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
  index: number,
): ChangeSignalsAction => ({
  type: CHANGE_SIGNALS,
  payload: {
    signal: signal,
    index: index,
  },
});

export const setSignals = (signals: {
  [K in SignalsStateKeys]: (0 | 1)[];
}): SetSignalsAction => ({
  type: SET_SIGNALS,
  payload: {
    signals: signals,
  },
});
export const addSignals = (): AddSignalsAction => ({ type: ADD_SIGNALS });
export const removeLastSignal = (): RemoveLastSignalAction => ({
  type: REMOVE_LAST_SIGNAL,
});
export const resetSignals = (): ResetSignalsAction => ({ type: RESET_SIGNALS });
