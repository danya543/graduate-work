import {
  CHANGE_DATASTORAGE,
  CHANGE_PROGRAMSTORAGE,
  ChangeDataStorageAction,
  ChangeProgramStorageAction,
} from '@src/types/Storage';

export const ChangeProgramStorage = (
  index: number,
  newValue: number,
): ChangeProgramStorageAction => ({
  type: CHANGE_PROGRAMSTORAGE,
  payload: { index, newValue },
});

export const ChangeDataStorage = (
  index: number,
  newValue: number,
): ChangeDataStorageAction => ({
  type: CHANGE_DATASTORAGE,
  payload: { index, newValue },
});
