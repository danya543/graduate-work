import LocalStorageService from '@applicationStorage/LocalStorage';
import { Box } from '@src/types/DragAndDrop';
import { ChangeDataStorage } from '@store/action/action';
import { AppDispatch, RootState } from '@store/store';

export function moveData(
  key1: string,
  key2: string,
  dispatch: AppDispatch,
  storage: RootState['storage'],
) {
  const curBoxes = LocalStorageService.loadBoxes('last_work');
  const regBoxes = curBoxes.filter(box => box.type === 'StorageRegist');

  const regBox_W = regBoxes.filter(box => box.children.props.text === key1);
  const regBox_R = regBoxes.filter(box => box.children.props.text === key2);

  if (regBox_W && regBox_R) {
    dispatch(
      ChangeDataStorage(
        regBox_W[0].children.props.addresses.current,
        storage.DataStorage[regBox_R[0].children.props.addresses.current],
      ),
    );
  }
}

export const getRegisterBox = (key: string) => {
  const curBoxes = LocalStorageService.loadBoxes('last_work');
  const regBoxes = curBoxes.filter(box => box.type === 'StorageRegist');
  return regBoxes.find(box => box.children?.props?.text === key);
};

export const getRegisterAddress = (box: Box | undefined) =>
  box?.children?.props?.addresses?.current;

export const baseRegisterMap: Record<string, number> = {
  ACC: 80,
  RVH: 81,
};
