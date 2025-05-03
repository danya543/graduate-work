import SessionStorageService from '@applicationStorage/SessionStorage';
import { Storage } from '@components/Storage/Storage';
import { StorageState } from '@src/types/Storage';
import { ChangeDataStorage, ChangeProgramStorage } from '@store/action/action';
import { AppDispatch, RootState } from '@store/store';
import { Button } from '@utils/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Storages.module.scss';

export const Storages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const storage: StorageState = useSelector(
    (state: RootState) => state.storage,
  );
  const [data, setData] = useState(storage.ProgramStorage);
  const [isActive, setIsActive] = useState(true);
  SessionStorageService.saveState(storage);

  const handleInputProgram = (index: number, value: number) => {
    dispatch(ChangeProgramStorage(index, value));
  };
  const handleInputData = (index: number, value: number) => {
    dispatch(ChangeDataStorage(index, value));
  };

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
      <Storage
        data={data}
        handleInput={isActive ? handleInputProgram : handleInputData}
      />
    </section>
  );
};
