import { StorageRegistrTypes } from '@components/constants';
import { RootState } from '@store/store';
import { useSelector } from 'react-redux';

import styles from './StorageRegistr.module.scss';

export const StorageRegistr = ({
  text,
}: {
  text: (typeof StorageRegistrTypes)[keyof typeof StorageRegistrTypes];
}) => {
  const value = useSelector((state: RootState) =>
    text != StorageRegistrTypes.ACC ? state.temp : state.acc,
  );

  return (
    <div className={`${styles.container} ${styles[text]}`}>
      <h1>{text}</h1>
      <p>{value.toString(16).padStart(2, '0')}</p>
    </div>
  );
};
