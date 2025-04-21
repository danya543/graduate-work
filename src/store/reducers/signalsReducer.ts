import SessionStorageService from '@applicationStorage/SessionStorage';
import { SignalsState } from '@src/types/Signals';
import {
  CHANGE_SIGNALS,
  RESET_SIGNALS,
  SignalsActionTypes,
} from '@store/types';

const initialState: SignalsState = SessionStorageService.loadSignals() ?? {
  ACC_R: 0,
  ACC_W: 0,
  ADDER: 0,
};

const signalsReducer = (
  state: SignalsState = initialState,
  action: SignalsActionTypes,
): SignalsState => {
  let newState: SignalsState;
  switch (action.type) {
    case CHANGE_SIGNALS:
      newState = {
        ...state,
        [action.payload.signal]: state[action.payload.signal] ? 0 : 1,
      };
      SessionStorageService.saveSignals(newState);
      return newState;
    case RESET_SIGNALS:
      newState = Object.keys(state).reduce(
        (acc, key) => ({
          ...acc,
          [key]: 0,
        }),
        {} as SignalsState,
      );
      SessionStorageService.saveSignals(newState);
      return newState;
    default:
      return state;
  }
};

export default signalsReducer;
