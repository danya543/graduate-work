import { CDTable } from '@components/CDTable/CDTable';
import { baseSignals } from '@components/constants';
import { AdderOperation, ChangeDataStorage } from '@store/action/action';
import { AppDispatch, RootState } from '@store/store';
import { Button } from '@utils/Button';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  baseRegisterMap,
  getRegisterAddress,
  getRegisterBox,
  moveData,
} from './utils';

export const LogicHandler = () => {
  const storage = useSelector((state: RootState) => state.storage);
  const signals = useSelector((state: RootState) => state.signals);
  const dispatch = useDispatch<AppDispatch>();

  const [highlightedRow, setHighlightedRow] = useState<number | null>(0);
  const operationRef = useRef<Generator | null>(null);

  const handleBaseSignalTransfer = (select: string, key: string) => {
    const base = select.split('_')[0];
    const dir = select.split('_')[1];
    const regBox = getRegisterBox(key);
    const regAddr = getRegisterAddress(regBox);

    if (!regBox || regAddr === undefined) return;

    if (dir === 'R') {
      dispatch(
        ChangeDataStorage(regAddr, storage.DataStorage[baseRegisterMap[base]]),
      );
    } else if (dir === 'W') {
      dispatch(
        ChangeDataStorage(baseRegisterMap[base], storage.DataStorage[regAddr]),
      );
    }
  };

  function* handleOperation() {
    const length = signals.ADDER.length;
    const keys = Object.keys(signals) as (keyof typeof signals)[];

    for (let i = 0; i < length - 1; i++) {
      setHighlightedRow(i + 1);

      const activeKeys = keys
        .flatMap(key => (signals[key][i] ? [key] : []))
        .filter(key => key !== 'ADDER');

      if (activeKeys.length === 2) {
        const [a, b] = activeKeys;
        const baseIncluded = baseSignals.includes(a) || baseSignals.includes(b);

        if (baseIncluded) {
          const select = baseSignals.includes(a) ? a : b;
          const key = (baseSignals.includes(a) ? b : a).split('_')[0];
          handleBaseSignalTransfer(select, key);
        } else {
          const [[k1, t1], [k2, t2]] = activeKeys.map(k => k.split('_'));
          if (t1 === 'W' && t2 === 'R') {
            moveData(k1, k2, dispatch, storage);
          } else if (t1 === 'R' && t2 === 'W') {
            moveData(k2, k1, dispatch, storage);
          } else {
            console.log('другие случаи');
          }
        }
      }

      if (activeKeys.length === 1) {
        const [key, type] = activeKeys[0].split('_');
        const regBox = getRegisterBox(key);
        const addr = getRegisterAddress(regBox);
        if (!regBox || addr === undefined) continue;

        if (type === 'W') {
          dispatch(AdderOperation(signals.ADDER[i]));
          dispatch(ChangeDataStorage(addr, storage.DataStorage[80]));
        } else if (type === 'R') {
          alert(storage.DataStorage[addr]);
        }
      }

      yield true;
    }

    setHighlightedRow(null);
    return true;
  }

  const handleNext = () => {
    if (!operationRef.current) {
      operationRef.current = handleOperation();
    }

    const { done } = operationRef.current.next();
    if (done) {
      operationRef.current = null;
    }
  };

  return (
    <div>
      <CDTable highlightedRow={highlightedRow} />
      <Button
        text={'следующая операция'}
        onclick={handleNext}
        disabled={typeof highlightedRow === 'number' ? false : true}
      />
    </div>
  );
};
