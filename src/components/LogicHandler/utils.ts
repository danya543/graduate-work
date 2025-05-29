import LocalStorageService from '@applicationStorage/LocalStorage';
import { ERROR_MSG } from '@components/constants';
import { Box } from '@src/types/DragAndDrop';
import { SignalsState } from '@src/types/Signals';
import { AdderOperation, ChangeDataStorage } from '@store/action/action';
import { AppDispatch, RootState } from '@store/store';

export function moveData(
  key1: string,
  key2: string,
  dispatch: AppDispatch,
  storage: RootState['storage'],
) {
  const regBox_W = getRegisterBox(key1);
  const regBox_R = getRegisterBox(key2);

  if (regBox_W && regBox_R) {
    if (!isDataBusEqual(regBox_R, regBox_W)) {
      alert(ERROR_MSG.data_bus);
      return true;
    }
    dispatch(
      ChangeDataStorage(
        getRegisterAddress(regBox_W),
        storage.DataStorage[getRegisterAddress(regBox_R)],
      ),
    );
  }
}

export const isDataBusEqual = (firstBlock: Box, secondBlock: Box) => {
  return (
    firstBlock.children.props.addresses.data_bus ===
    secondBlock.children.props.addresses.data_bus
  );
};

export const getRegisterBox = (key: string) => {
  const curBoxes = LocalStorageService.loadBoxes('last_work');
  const regBoxes = curBoxes.filter(box => box.type === 'StorageRegist');
  return regBoxes.find(box => box.children?.props?.text === key);
};

export const getRegisterAddress = (box: Box | undefined) =>
  box?.children?.props?.addresses?.current;

export function processBusSignals(
  busKeys: string[],
  step: number,
  dispatch: AppDispatch,
  storage: RootState['storage'],
  signal: SignalsState,
) {
  if (busKeys.length === 2) {
    const [[k1, t1], [k2, t2]] = busKeys.map(k => k.split('_'));

    if (t1 === 'W' && t2 === 'R') {
      moveData(k1, k2, dispatch, storage);
    } else if (t1 === 'R' && t2 === 'W') {
      moveData(k2, k1, dispatch, storage);
    } else if (t1 === 'R' && t2 === 'R') {
      const regBox_R1 = getRegisterBox(k1);
      const regBox_R2 = getRegisterBox(k2);

      if (regBox_R1 && regBox_R2) {
        dispatch(
          AdderOperation(
            signal.ADDER[step],
            getRegisterAddress(regBox_R1),
            getRegisterAddress(regBox_R2),
          ),
        );
      }
    }
  } else if (busKeys.length === 1) {
    const [key, type] = busKeys[0].split('_');
    if (type === 'R') {
      const regBox = getRegisterBox(key);
      const addr = getRegisterAddress(regBox);
      if (regBox && addr !== undefined) {
        alert(storage.DataStorage[addr]);
      }
    }
  } else {
    alert(ERROR_MSG.data_bus);
  }
}
