import LocalStorageService from '@applicationStorage/LocalStorage';
import SessionStorageService from '@applicationStorage/SessionStorage';
import { areKeysEqual, generateSignalsFromBoxes } from '@components/constants';
import { useLogicContext } from '@components/context/LogicContext';
import {
  addSignals,
  changeSignal,
  removeLastSignal,
  setSignals,
} from '@store/action/action';
import { AppDispatch, RootState } from '@store/store';
import { Button } from '@utils/Button';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './CDTable.module.scss';

export const CDTable = ({
  highlightedRow,
}: {
  highlightedRow: number | null;
}) => {
  const { restartProg } = useLogicContext();
  const dispatch = useDispatch<AppDispatch>();
  const signals = useSelector((state: RootState) => state.signals);
  const prevSerializedBoxesRef = useRef<string | null>(null);

  const keys = Object.keys(signals) as (keyof typeof signals)[];

  useEffect(() => {
    const savedSignals = SessionStorageService.loadSignals();
    const currentBoxes = LocalStorageService.loadBoxes('last_work');
    const currentSerialized = JSON.stringify(currentBoxes);

    if (prevSerializedBoxesRef.current !== currentSerialized) {
      prevSerializedBoxesRef.current = currentSerialized;
    }

    const generatedSignals = generateSignalsFromBoxes();

    if (savedSignals && areKeysEqual(savedSignals, generatedSignals)) {
      dispatch(setSignals(savedSignals));
    } else {
      dispatch(setSignals(generatedSignals));
      restartProg();
    }
  }, []);

  return (
    <div>
      <Button
        text="добавить столбец"
        onclick={() => {
          dispatch(addSignals());
        }}
      />
      <Button
        text="удалить столбец"
        onclick={() => {
          dispatch(removeLastSignal());
        }}
        disabled={signals[keys[0]].length === 1}
      />
      <table className={styles.container}>
        <tbody>
          {keys.map(key => (
            <tr key={key}>
              <th>{key}</th>
              {Array.from({ length: signals[key].length }, (_, colIndex) => (
                <td
                  key={colIndex}
                  className={
                    highlightedRow === colIndex ? styles.highlighted : ''
                  }
                  onClick={() => {
                    dispatch(changeSignal(key, colIndex));
                  }}>
                  {signals[key][colIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
