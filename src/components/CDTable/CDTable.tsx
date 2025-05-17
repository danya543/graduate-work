import SessionStorageService from '@applicationStorage/SessionStorage';
import { initialSignals } from '@components/constants';
import { addSignals, changeSignal, setSignals } from '@store/action/action';
import { AppDispatch, RootState } from '@store/store';
import { Button } from '@utils/Button';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './CDTable.module.scss';

export const CDTable = ({
  highlightedRow,
}: {
  highlightedRow: number | null;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const signals = useSelector((state: RootState) => state.signals);

  const keys = Object.keys(signals) as (keyof typeof signals)[];

  useEffect(() => {
    const savedSignals = SessionStorageService.loadSignals();
    if (savedSignals) {
      dispatch(setSignals(savedSignals));
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
        text="обновить"
        onclick={() => {
          dispatch(setSignals(initialSignals));
        }}
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
