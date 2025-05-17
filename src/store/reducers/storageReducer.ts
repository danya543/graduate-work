import SessionStorageService from '@applicationStorage/SessionStorage';
import { StorageState } from '@src/types/Storage';
import {
  CHANGE_DATASTORAGE,
  CHANGE_PROGRAMSTORAGE,
  OPERATION,
  StorageActionTypes,
} from '@store/types';

const initialState: StorageState = SessionStorageService.loadState();

const storageReducer = (
  state: StorageState = initialState,
  action: StorageActionTypes,
): StorageState => {
  let newState: StorageState;
  switch (action.type) {
    case CHANGE_DATASTORAGE:
      state.DataStorage.splice(
        action.payload.index,
        1,
        action.payload.newValue,
      );
      newState = {
        ProgramStorage: state.ProgramStorage,
        DataStorage: state.DataStorage,
      };
      SessionStorageService.saveState(newState);
      return newState;
    case CHANGE_PROGRAMSTORAGE:
      state.ProgramStorage.splice(
        action.payload.index,
        1,
        action.payload.newValue,
      );
      newState = {
        ProgramStorage: state.ProgramStorage,
        DataStorage: state.DataStorage,
      };
      SessionStorageService.saveState(newState);
      return newState;
    case OPERATION: {
      const signType = action.payload.operationType;
      const result = eval(`
        ${state.DataStorage[80]} ${signType ? '+' : '-'}
        ${state.DataStorage[81]}`);
      state.DataStorage.splice(80, 1, result);
      newState = {
        ProgramStorage: state.ProgramStorage,
        DataStorage: state.DataStorage,
      };
      SessionStorageService.saveState(newState);
      return newState;
    }
    default:
      return state;
  }
};

export default storageReducer;
