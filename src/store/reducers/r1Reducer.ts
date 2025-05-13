import SessionStorageService from '@applicationStorage/SessionStorage';
import { R1ActionTypes, RESET_R1, SET_R1 } from '@store/types';

const initialR1: number = SessionStorageService.loadState().DataStorage[1];

const r1Reducer = (
  state: number = initialR1,
  action: R1ActionTypes,
): number => {
  let newState: number;
  switch (action.type) {
    case SET_R1:
      newState = action.payload.newValue;
      return newState;
    case RESET_R1:
      newState = 0;
      return newState;
    default: {
      const currentR1 = SessionStorageService.loadState()?.DataStorage?.[1];
      return currentR1 !== undefined ? currentR1 : state;
    }
  }
};

export default r1Reducer;
