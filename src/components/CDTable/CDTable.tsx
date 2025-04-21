import { RootState } from '@store/store';
import { useSelector } from 'react-redux';

import styles from './CDTable.module.scss';

export const CDTable = () => {
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
        <tr>
          {Object.values(signals).map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
