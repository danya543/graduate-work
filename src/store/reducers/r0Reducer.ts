import SessionStorageService from '@applicationStorage/SessionStorage';
import { R0ActionTypes, RESET_R0, SET_R0 } from '@store/types';

const initialR0: number = SessionStorageService.loadState().DataStorage[0];

const r0Reducer = (
  state: number = initialR0,
  action: R0ActionTypes,
): number => {
  let newState: number;
  switch (action.type) {
    case SET_R0:
      newState = action.payload.newValue;
      return newState;
    case RESET_R0:
      newState = 0;
      return newState;
    default: {
      const currentR0 = SessionStorageService.loadState()?.DataStorage?.[0];
      return currentR0 !== undefined ? currentR0 : state;
    }
  }
};

export default r0Reducer;
