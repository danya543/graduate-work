import LocalStorageService from '@applicationStorage/LocalStorage';
import { ERROR_MSG } from '@components/constants';
import { Box } from '@src/types/DragAndDrop';
import { SignalKey, SignalsState } from '@src/types/Signals';
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

export const getALUBox = (key: string) => {
  const curBoxes = LocalStorageService.loadBoxes('last_work');
  const regBoxes = curBoxes.filter(box => box.type === 'ALU');
  return regBoxes.find(box => box.children?.props?.text === key);
};

export const getRegisterAddress = (box: Box | undefined) =>
  box?.children?.props?.addresses?.current;

export function processBusSignals(
  busKeys: string[],
  dispatch: AppDispatch,
  storage: RootState['storage'],
) {
  if (busKeys.length === 2) {
    const [[k1, t1], [k2, t2]] = busKeys.map(k => k.split('_'));

    if (t1 === 'W' && t2 === 'R') {
      moveData(k1, k2, dispatch, storage);
    } else if (t1 === 'R' && t2 === 'W') {
      moveData(k2, k1, dispatch, storage);
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

export const parseSignals = (signals: SignalKey[], type: 'R' | 'W'): string[] =>
  signals
    .map(k => k.split('_'))
    .filter(parts => parts[1] === type)
    .map(parts => parts[0]);

export const isValidSignalSet = (
  in1: SignalKey[],
  in2: SignalKey[],
  out: SignalKey[],
): boolean => {
  if (!in1?.length || !in2?.length || !out?.length) return false;

  const invalid =
    in1.some(k => k.includes('_W')) ||
    in2.some(k => k.includes('_W')) ||
    out.some(k => k.includes('_R'));

  return !invalid;
};

export const executeALUOperation = (
  signals_in1: SignalKey[],
  signals_in2: SignalKey[],
  signals_out: SignalKey[],
  dispatch: AppDispatch,
  signals: SignalsState,
  i: number,
) => {
  const sameInputs =
    JSON.stringify(signals_in1) === JSON.stringify(signals_in2);

  const outReg = parseSignals(signals_out, 'W')[0];

  if (sameInputs) {
    const regs = parseSignals(signals_in1, 'R');

    if (regs.length >= 2 && outReg) {
      dispatchOperation(regs[0], regs[1], outReg, dispatch, signals, i);
    } else if (regs.length === 1 && outReg) {
      dispatchOperation(regs[0], regs[0], outReg, dispatch, signals, i);
    } else {
      alert(ERROR_MSG.signals);
    }
  } else {
    const reg1 = parseSignals(signals_in1, 'R')[0];
    const reg2 = parseSignals(signals_in2, 'R')[0];

    if (reg1 && reg2 && outReg) {
      dispatchOperation(reg1, reg2, outReg, dispatch, signals, i);
    } else {
      alert(ERROR_MSG.signals);
    }
  }
};

export const dispatchOperation = (
  reg1: string,
  reg2: string,
  outReg: string,
  dispatch: AppDispatch,
  signals: SignalsState,
  i: number,
) => {
  dispatch(
    AdderOperation(
      signals.ADDER[i],
      signals.PLUS_RAND[i],
      getRegisterAddress(getRegisterBox(reg1)),
      getRegisterAddress(getRegisterBox(reg2)),
      getRegisterAddress(getRegisterBox(outReg)),
    ),
  );
};
