import SessionStorageService from '@applicationStorage/SessionStorage';
import { RESET_TEMP, SET_TEMP, TempActionTypes } from '@store/types';

const storage = SessionStorageService.loadState();
const initialTemp: number = storage.DataStorage[51];

const tempReducer = (
  state: number = initialTemp,
  action: TempActionTypes,
): number => {
  switch (action.type) {
    case SET_TEMP:
      storage.DataStorage[1] = action.payload.newValue;
      return storage.DataStorage[1];
    case RESET_TEMP:
      storage.DataStorage[1] = 0;
      SessionStorageService.saveState(storage);
      return storage.DataStorage[1];
    default: {
      const currentTemp = SessionStorageService.loadState()?.DataStorage?.[51];
      return currentTemp !== undefined ? currentTemp : state;
    }
  }
};

export default tempReducer;
