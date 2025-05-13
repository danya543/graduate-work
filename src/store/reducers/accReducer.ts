import SessionStorageService from '@applicationStorage/SessionStorage';
import { AccActionTypes, RESET_ACC, SET_ACC } from '@store/types';

const initialAcc: number = SessionStorageService.loadState().DataStorage[50];

const accReducer = (
  state: number = initialAcc,
  action: AccActionTypes,
): number => {
  let newState: number;
  switch (action.type) {
    case SET_ACC:
      newState = action.payload.newValue;
      return newState;
    case RESET_ACC:
      newState = 0;
      return newState;
    default: {
      const currentAcc = SessionStorageService.loadState()?.DataStorage?.[50];
      return currentAcc !== undefined ? currentAcc : state;
    }
  }
};

export default accReducer;
