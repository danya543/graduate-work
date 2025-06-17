import LocalStorageService from '@applicationStorage/LocalStorage';
import { RegisterAddresses } from '@src/types/DragAndDrop';
import { REGEXP } from '@utils/constants';
import { FormEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import styles from './ModalPortal.module.scss';

export const NewRegister = (props: {
  onClose: () => void;
  addNewRegister: (
    name: string,
    addresses: RegisterAddresses,
    isGenerator: boolean,
  ) => void;
}) => {
  const { onClose, addNewRegister } = props;

  const [name, setName] = useState('');
  const [addresses, setAddresses] = useState({ current: '', data_bus: '' });
  const [isGenerator, setIsGenerator] = useState(false);
  const boxes = LocalStorageService.loadBoxes('last_work');
  const registers = boxes.filter(el => el.type === 'StorageRegist');
  const generators = boxes.filter(el => el.type === 'GeneratorRegist');

  useEffect(() => {
    setName('');
    setAddresses({ current: '', data_bus: '' });
    [...document.getElementsByTagName('input')].map(el =>
      el.classList.remove(styles.error),
    );
  }, [isGenerator]);

  const handleChangeName = (e: { target: { value: string } }) => {
    const { value } = e.target;
    const isEqualName = isGenerator
      ? generators.some(el => el.children.props.text === value)
      : registers.some(el => el.children.props.text === value);
    if (REGEXP.InputEnRegex.test(value) || value === '') {
      if (isEqualName) {
        document.getElementById('name')?.classList.add(styles.error);
      } else {
        document.getElementById('name')?.classList.remove(styles.error);
      }
      setName(value);
    }
  };

  const handleChangeAddress = (e: { target: { value: string } }) => {
    const { value } = e.target;
    const num = Number(value);
    const isEqualAddress = registers.some(
      el => el.children.props.addresses.current === value,
    );
    if ((!Number.isNaN(num) && num >= 0 && num <= 255) || value === '') {
      if (isEqualAddress) {
        document.getElementById('ram_address')?.classList.add(styles.error);
      } else {
        document.getElementById('ram_address')?.classList.remove(styles.error);
      }
      setAddresses(prev => ({ ...prev, current: value }));
    }
  };

  const handleChangeDataBus = (e: { target: { value: string } }) => {
    const { value } = e.target;
    const num = Number(value);
    if ((!Number.isNaN(num) && num >= 0 && num <= 255) || value === '') {
      setAddresses(prev => ({ ...prev, data_bus: value }));
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finalAddresses = isGenerator
      ? { currentValue: 0, data_bus: addresses.data_bus }
      : addresses;

    addNewRegister(name, finalAddresses, isGenerator);
    onClose();
  };

  const isErrorClass = ![...document.getElementsByTagName('input')].some(el =>
    el.classList.contains(styles.error),
  );

  const isDisabled =
    !name ||
    (!isGenerator && !addresses.current) ||
    !addresses.data_bus ||
    !isErrorClass;

  return ReactDOM.createPortal(
    <div className={styles.modal_overlay}>
      <div className={`${styles.modal_content} ${styles.NewRegister}`}>
        <button className={styles.modal_close} onClick={onClose}>
          &times;
        </button>
        <form onSubmit={submitHandler}>
          <div className={`${styles.inputBlock} ${styles.checkBox}`}>
            <label htmlFor="isGenerator">Генератор</label>
            <input
              id="isGenerator"
              type="checkbox"
              placeholder={'Генератор'}
              checked={isGenerator}
              onChange={() => setIsGenerator(prev => !prev)}
            />
          </div>
          <div className={styles.inputBlock}>
            <label htmlFor="name">Название регистра</label>
            <input
              id="name"
              type="text"
              placeholder={'Название регистра'}
              value={name}
              onChange={handleChangeName}
              maxLength={5}
            />
          </div>
          {!isGenerator && (
            <div className={styles.inputBlock}>
              <label htmlFor="ram_address">Адрес регистра</label>
              <input
                id="ram_address"
                type="text"
                placeholder={'Адрес регистра'}
                value={addresses.current}
                onChange={handleChangeAddress}
                maxLength={3}
              />
            </div>
          )}
          <div className={styles.inputBlock}>
            <label htmlFor="data_bus_address">Шина данных</label>
            <input
              id="data_bus_address"
              type="text"
              placeholder={'Шина данных'}
              value={addresses.data_bus}
              onChange={handleChangeDataBus}
              maxLength={2}
            />
          </div>
          <input value={'Добавить'} type="submit" disabled={isDisabled} />
        </form>
      </div>
    </div>,
    document.body,
  );
};
