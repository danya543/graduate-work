import { REGEXP } from '@utils/constants';
import { FormEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import styles from './ModalPortal.module.scss';

export const NewRegister = (props: {
  onClose: () => void;
  addNewRegister: (
    name: string,
    addresses: { current: string; data_bus: string },
  ) => void;
}) => {
  const { onClose, addNewRegister } = props;

  const [name, setName] = useState('');
  const [addresses, setAddresses] = useState({ current: '', data_bus: '' });

  const handleChangeName = (e: { target: { value: string } }) => {
    const { value } = e.target;
    if (REGEXP.InputEnRegex.test(value) || value === '') setName(value);
  };
  const handleChangeAddress = (e: { target: { value: string } }) => {
    const { value } = e.target;
    const num = Number(value);
    if (!Number.isNaN(num) && num >= 0 && num <= 255) {
      setAddresses(prev => ({ ...prev, current: value }));
    }
    if (value === '') {
      setAddresses(prev => ({ ...prev, current: '' }));
    }
  };
  const handleChangeFromAddress = (e: { target: { value: string } }) => {
    const { value } = e.target;
    const num = Number(value);
    if (!Number.isNaN(num) && num >= 0 && num <= 255) {
      setAddresses(prev => ({ ...prev, data_bus: value }));
    }
    if (value === '') {
      setAddresses(prev => ({ ...prev, data_bus: '' }));
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

    addNewRegister(name, addresses);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.modal_overlay}>
      <div className={`${styles.modal_content} ${styles.NewRegister}`}>
        <button className={styles.modal_close} onClick={onClose}>
          &times;
        </button>
        <form onSubmit={submitHandler}>
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
          <div className={styles.inputBlock}>
            <label htmlFor="data_bus_address">Шина данных</label>
            <input
              id="data_bus_address"
              type="text"
              placeholder={'Шина данных'}
              value={addresses.data_bus}
              onChange={handleChangeFromAddress}
              maxLength={2}
            />
          </div>
          <input
            value={'Добавить'}
            type="submit"
            disabled={!name || !addresses.current || !addresses.data_bus}
          />
        </form>
      </div>
    </div>,
    document.body,
  );
};
