import { Storage } from '@components/Storage/Storage';
import { StorageState } from '@src/types/Storage';
import { RootState } from '@store/store';
import { Button } from '@utils/Button';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './Storages.module.scss';

export const Storages = () => {
  const storage: StorageState = useSelector(
    (state: RootState) => state.storage,
  );
  const [data, setData] = useState(storage.ProgramStorage);
  const [isActive, setIsActive] = useState(true);

  const handleSetProgramStorage = () => {
    setData(storage.ProgramStorage);
    setIsActive(true);
  };

  const handleSetDataStorage = () => {
    setData(storage.DataStorage);
    setIsActive(false);
  };

  return (
    <section className={styles.container}>
      <div className={styles.buttons}>
        <Button
          text={'ROM'}
          onclick={handleSetProgramStorage}
          classname={`${isActive && styles.isActive}`}
        />
        <Button
          text={'RAM'}
          onclick={handleSetDataStorage}
          classname={`${!isActive && styles.isActive}`}
        />
      </div>
      <Storage data={data} />
    </section>
  );
};
