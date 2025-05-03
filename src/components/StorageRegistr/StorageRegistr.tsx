import { StorageRegistrTypes } from '@components/constants';
import { RootState } from '@store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './StorageRegistr.module.scss';

export const StorageRegistr = ({
  text,
}: {
  text: (typeof StorageRegistrTypes)[keyof typeof StorageRegistrTypes];
}) => {
  const value = useSelector((state: RootState) =>
    text === StorageRegistrTypes.ACC ? state.acc : state.temp,
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
      <p>{value.toString(16).padStart(2, '0')}</p>
    </div>
  );
};
