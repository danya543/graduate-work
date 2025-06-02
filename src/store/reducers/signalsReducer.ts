import SessionStorageService from '@applicationStorage/SessionStorage';
import { SignalsState } from '@src/types/Signals';
import {
  ADD_SIGNALS,
  CHANGE_SIGNALS,
  REMOVE_LAST_SIGNAL,
  RESET_SIGNALS,
  SET_SIGNALS,
  SignalsActionTypes,
} from '@store/types';

const initialState: SignalsState = SessionStorageService.loadSignals() ?? {
  ADDER: [0],
  PLUS_RAND: [0],
};

const signalsReducer = (
  state: SignalsState = initialState,
  action: SignalsActionTypes,
): SignalsState => {
  let newState: SignalsState;
  switch (action.type) {
    case CHANGE_SIGNALS: {
      const { signal, index } = action.payload;
      const oldArray = state[signal];

      const newValue = oldArray[index] === 0 ? 1 : 0;
      const newArray = oldArray.map((val, i) => (i === index ? newValue : val));
      newState = {
        ...state,
        [signal]: newArray,
      };

      SessionStorageService.saveSignals(newState);
      return newState;
    }
    case RESET_SIGNALS:
      newState = Object.keys(state).reduce(
        (acc, key) => ({
          ...acc,
          [key]: [0],
        }),
        {} as SignalsState,
      );
      SessionStorageService.saveSignals(newState);
      return newState;
    case SET_SIGNALS: {
      const newState = action.payload.signals;
      SessionStorageService.saveSignals(newState);
      return newState;
    }
    case ADD_SIGNALS:
      newState = Object.fromEntries(
        Object.entries(state).map(([key, arr]) => [key, [...arr, 0]]),
      ) as SignalsState;
      SessionStorageService.saveSignals(newState);
      return newState;
    case REMOVE_LAST_SIGNAL:
      newState = Object.fromEntries(
        Object.entries(state).map(([key, arr]) => [key, arr.slice(0, -1)]),
      ) as SignalsState;
      SessionStorageService.saveSignals(newState);
      return newState;

    default:
      return state;
  }
};

export default signalsReducer;
