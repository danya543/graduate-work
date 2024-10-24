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

  const handleSetProgramStorage = () => {
    setData(storage.ProgramStorage);
  };

  const handleSetDataStorage = () => {
    setData(storage.DataStorage);
  };

  return (
    <section className={styles.container}>
      <div>
        <Button text={'Program Storage'} onclick={handleSetProgramStorage} />
        <Button text={'Data Storage'} onclick={handleSetDataStorage} />{' '}
      </div>
      <Storage data={data} />
    </section>
  );
};
