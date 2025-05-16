import { RootState } from '@store/store';
import { useSelector } from 'react-redux';

import styles from './CDTable.module.scss';

export const CDTable = ({
  highlightedRow,
}: {
  highlightedRow: number | null;
}) => {
  const signals = useSelector((state: RootState) => state.signals);

  const keys = Object.keys(signals) as (keyof typeof signals)[];

  return (
    <table className={styles.container}>
      <tbody>
        {keys.map(key => (
          <tr key={key}>
            <th>{key}</th>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(colIndex => (
              <td
                key={colIndex}
                className={
                  highlightedRow === colIndex ? styles.highlighted : ''
                }>
                {signals[key][colIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
