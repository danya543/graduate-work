import SessionStorageService from '@applicationStorage/SessionStorage';
import { SignalsState } from '@src/types/Signals';
import {
  CHANGE_SIGNALS,
  RESET_SIGNALS,
  SignalsActionTypes,
} from '@store/types';
/**
 * ACC_R: [1, 0, 0, 1, 0, 1],
  ACC_W: [0, 0, 1, 0, 1, 0],
  RVH_R: [0, 1, 0, 0, 0, 0],
  RVH_W: [0, 0, 0, 0, 0, 0],
  ADDER: [0, 0, 1, 0, 0, 0],
 */
const initialState: SignalsState = SessionStorageService.loadSignals() ?? {
  ACC_R: [0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  ACC_W: [0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
  RVH_R: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  RVH_W: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  ADDER: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  ROM_R: [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  R0_R: [0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  R0_W: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  R1_R: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  R1_W: [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  R2_R: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  R2_W: [0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
};

const signalsReducer = (
  state: SignalsState = initialState,
  action: SignalsActionTypes,
): SignalsState => {
  let newState: SignalsState;
  switch (action.type) {
    case CHANGE_SIGNALS:
      state[action.payload.signal][state[action.payload.signal].length - 1]
        ? state[action.payload.signal].push(0)
        : state[action.payload.signal].push(1);
      newState = state;
      SessionStorageService.saveSignals(newState);
      return state;
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
    default:
      return state;
  }
};

export default signalsReducer;
