import {
  CHANGE_DATASTORAGE,
  CHANGE_PROGRAMSTORAGE,
  StorageActionTypes,
  StorageState,
} from '@src/types/Storage';

const loadStateFromSessionStorage = (): StorageState => {
  const savedState = sessionStorage.getItem('storage');
  return savedState
    ? JSON.parse(savedState)
    : {
        ProgramStorage: new Array(256).fill(0),
        DataStorage: new Array(256).fill(0),
      };
};

const saveStateToSessionStorage = (state: StorageState): void => {
  sessionStorage.setItem('storage', JSON.stringify(state));
};

const initialState: StorageState = loadStateFromSessionStorage();

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
      saveStateToSessionStorage(newState);
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
      saveStateToSessionStorage(newState);
      return newState;
    default:
      return state;
  }
};

export default storageReducer;
