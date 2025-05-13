import { RootState } from '@store/store';
import { useSelector } from 'react-redux';

import styles from './CDTable.module.scss';

export const CDTable = ({
  highlightedRow,
}: {
  highlightedRow: number | null;
}) => {
  const signals = useSelector((state: RootState) => state.signals);

  return (
    <table className={styles.container}>
      <thead>
        <tr>
          {Object.keys(signals).map(item => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((el, id) => (
          <tr
            key={id}
            className={highlightedRow === id ? styles.highlighted : ''}>
            {Object.values(signals).map((item, index) => (
              <td key={index}>{item[el]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
