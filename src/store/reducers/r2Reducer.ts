import SessionStorageService from '@applicationStorage/SessionStorage';
import { R2ActionTypes, RESET_R2, SET_R2 } from '@store/types';

const initialR2: number = SessionStorageService.loadState().DataStorage[2];

const r2Reducer = (
  state: number = initialR2,
  action: R2ActionTypes,
): number => {
  let newState: number;
  switch (action.type) {
    case SET_R2:
      newState = action.payload.newValue;
      return newState;
    case RESET_R2:
      newState = 0;
      return newState;
    default: {
      const currentR2 = SessionStorageService.loadState()?.DataStorage?.[2];
      return currentR2 !== undefined ? currentR2 : state;
    }
  }
};

export default r2Reducer;
