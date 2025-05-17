import { RootState } from '@store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './StorageRegistr.module.scss';

export const StorageRegistr = ({
  text,
  addresses,
}: {
  text: string;
  addresses: { current: string; from: string; to: string };
}) => {
  const curValue = useSelector(
    (state: RootState) => state.storage.DataStorage[+addresses.current],
  );

  const [, setForceUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setForceUpdate(prev => prev + 1);
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className={`${styles.container} ${styles[text]}`}>
      <h1>{text}</h1>
      <p>{curValue && curValue.toString(16).padStart(2, '0')}</p>
      <p className={styles.from}>{addresses.from}</p>
      <p className={styles.to}>{addresses.to}</p>
    </div>
  );
};
