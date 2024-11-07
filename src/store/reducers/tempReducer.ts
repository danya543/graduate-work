import { RESET_TEMP, SET_TEMP, TempActionTypes } from '@store/types';

const initialTemp: number = 0;

const tempReducer = (
  state: number = initialTemp,
  action: TempActionTypes,
): number => {
  let newState: number;
  switch (action.type) {
    case SET_TEMP:
      newState = action.payload.newValue;
      return newState;
    case RESET_TEMP:
      newState = 0;
      return newState;
    default:
      return state;
  }
};

export default tempReducer;
