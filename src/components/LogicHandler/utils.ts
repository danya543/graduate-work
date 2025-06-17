import LocalStorageService from '@applicationStorage/LocalStorage';
import { ERROR_MSG } from '@components/constants';
import { Box, DragableComponents } from '@src/types/DragAndDrop';
import { SignalKey, SignalsState } from '@src/types/Signals';
import { AdderOperation, ChangeDataStorage } from '@store/action/action';
import { AppDispatch, RootState } from '@store/store';

export function moveData(
  key1: string,
  key2: string,
  dispatch: AppDispatch,
  storage: RootState['storage'],
) {
  const regBox_W = getTypeBox(key1);
  const regBox_R = getTypeBox(key2);

  if (regBox_W && regBox_R) {
    dispatch(
      ChangeDataStorage(
        getRegisterAddress(regBox_W),
        storage.DataStorage[getRegisterAddress(regBox_R)],
      ),
    );
  }
}

export const getTypeBox = (
  key: string,
  type: DragableComponents = 'StorageRegist',
) => {
  const curBoxes = LocalStorageService.loadBoxes('last_work');
  const regBoxes = curBoxes.filter(box => box.type === type);
  return regBoxes.find(box => box.children?.props?.text === key);
};

export const getRegisterAddress = (box: Box | undefined) =>
  box?.children?.props?.addresses?.current;

export function processBusSignals(
  busKeys: string[],
  dispatch: AppDispatch,
  storage: RootState['storage'],
) {
  function parseKey(key: string): {
    baseKey: string;
    isGenerator: boolean;
    type: string;
  } {
    const parts = key.split('_');
    const type = parts.pop()!;
    const name = parts.join('_');
    const isGenerator = name.startsWith('gen_');

    const baseKey = isGenerator ? name.slice(4) : name;
    return { baseKey, isGenerator, type };
  }

  if (busKeys.length === 2) {
    const [first, second] = busKeys.map(parseKey);
    if (first.type === 'W' && second.type === 'R') {
      moveDataWithSource(first, second, dispatch, storage);
    } else if (first.type === 'R' && second.type === 'W') {
      moveDataWithSource(second, first, dispatch, storage);
    }
  } else if (busKeys.length === 1) {
    const { baseKey, isGenerator, type } = parseKey(busKeys[0]);
    if (type === 'R') {
      const regBox = isGenerator
        ? getTypeBox(baseKey, 'GeneratorRegist')
        : getTypeBox(baseKey);
      const addr = isGenerator
        ? regBox?.children.props.generator_addresses?.currentValue
        : getRegisterAddress(regBox);

      if (regBox && addr !== undefined) {
        alert(isGenerator ? addr : storage.DataStorage[addr]);
      }
    }
  } else {
    alert(ERROR_MSG.data_bus);
  }
}

function moveDataWithSource(
  target: { baseKey: string; isGenerator: boolean; type: string },
  source: { baseKey: string; isGenerator: boolean; type: string },
  dispatch: AppDispatch,
  storage: RootState['storage'],
) {
  if (source.isGenerator) {
    const sourceBox = getTypeBox(source.baseKey, 'GeneratorRegist');
    const value = sourceBox?.children.props.generator_addresses?.currentValue;
    if (value !== undefined) {
      const targetBox = getTypeBox(target.baseKey);
      if (targetBox) {
        dispatch(
          ChangeDataStorage(targetBox.children.props.addresses.current, value),
        );
      }
    }
  } else {
    moveData(target.baseKey, source.baseKey, dispatch, storage);
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
  storage: RootState['storage'],
  i: number,
  constValue1?: number,
  constValue2?: number,
) => {
  const sameInputs =
    JSON.stringify(signals_in1) === JSON.stringify(signals_in2) &&
    constValue1 === undefined &&
    constValue2 === undefined;

  const outReg = parseSignals(signals_out, 'W')[0];

  const reg1 = parseSignals(signals_in1, 'R')[0];
  const reg2 = parseSignals(signals_in2, 'R')[0];

  if (sameInputs) {
    const regs = parseSignals(signals_in1, 'R');

    if (regs.length >= 2 && outReg) {
      dispatchOperation(
        regs[0],
        regs[1],
        outReg,
        dispatch,
        signals,
        storage,
        i,
      );
    } else if (regs.length === 1 && outReg) {
      dispatchOperation(
        regs[0],
        regs[0],
        outReg,
        dispatch,
        signals,
        storage,
        i,
      );
    } else {
      alert(ERROR_MSG.signals);
    }
  } else if (constValue1 !== undefined && constValue2 !== undefined && outReg) {
    dispatchOperation(
      constValue1,
      constValue2,
      outReg,
      dispatch,
      signals,
      storage,
      i,
    );
  } else if (constValue1 !== undefined && reg2 && outReg) {
    dispatchOperation(constValue1, reg2, outReg, dispatch, signals, storage, i);
  } else if (reg1 && constValue2 !== undefined && outReg) {
    dispatchOperation(reg1, constValue2, outReg, dispatch, signals, storage, i);
  } else if (reg1 && reg2 && outReg) {
    dispatchOperation(reg1, reg2, outReg, dispatch, signals, storage, i);
  } else {
    alert(ERROR_MSG.signals);
  }
};

export const dispatchOperation = (
  reg1: string | number,
  reg2: string | number,
  outReg: string,
  dispatch: AppDispatch,
  signals: SignalsState,
  storage: RootState['storage'],
  i: number,
) => {
  const addrOut = getRegisterAddress(getTypeBox(outReg));
  if (typeof reg1 === 'string' && typeof reg2 === 'string') {
    dispatch(
      AdderOperation(
        signals.ADDER[i],
        getRegisterAddress(getTypeBox(reg1)),
        getRegisterAddress(getTypeBox(reg2)),
        addrOut,
      ),
    );
  } else {
    let sum = -1;
    if (typeof reg1 === 'number' && typeof reg2 === 'number') {
      sum = reg1 + reg2;
    } else if (typeof reg1 === 'string' && typeof reg2 === 'number') {
      sum = storage.DataStorage[getRegisterAddress(getTypeBox(reg1))] + reg2;
    } else if (typeof reg1 === 'number' && typeof reg2 === 'string') {
      sum = storage.DataStorage[getRegisterAddress(getTypeBox(reg2))] + reg1;
    }
    dispatch(ChangeDataStorage(addrOut, sum));
  }
};
