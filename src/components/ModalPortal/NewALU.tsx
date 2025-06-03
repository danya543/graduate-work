import { REGEXP } from '@utils/constants';
import { FormEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import styles from './ModalPortal.module.scss';

export const NewALU = (props: {
  onClose: () => void;
  addNewALU: (
    name: string,
    ALU_addresses: { in1: string; in2: string; out: string },
  ) => void;
}) => {
  const { onClose, addNewALU } = props;

  const [name, setName] = useState('');
  const [addresses, setAddresses] = useState({ in1: '', in2: '', out: '' });

  const handleChangeName = (e: { target: { value: string } }) => {
    const { value } = e.target;
    if (REGEXP.InputEnRegex.test(value) || value === '') setName(value);
  };
  const handleChangeInBus1 = (e: { target: { value: string } }) => {
    const { value } = e.target;

    if (value && value != addresses.out) {
      setAddresses(prev => ({ ...prev, in1: value }));
    }
    if (value === '') {
      setAddresses(prev => ({ ...prev, in1: '' }));
    }
  };
  const handleChangeInBus2 = (e: { target: { value: string } }) => {
    const { value } = e.target;

    if (value && value != addresses.out) {
      setAddresses(prev => ({ ...prev, in2: value }));
    }
    if (value === '') {
      setAddresses(prev => ({ ...prev, in2: '' }));
    }
  };
  const handleChangeOutBus = (e: { target: { value: string } }) => {
    const { value } = e.target;

    if (value && value != addresses.in1 && value != addresses.in2) {
      setAddresses(prev => ({ ...prev, out: value }));
    }
    if (value === '') {
      setAddresses(prev => ({ ...prev, out: '' }));
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

    addNewALU(name, addresses);
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
            <label htmlFor="name">Название АЛУ</label>
            <input
              id="name"
              type="text"
              placeholder={'Название АЛУ'}
              value={name}
              onChange={handleChangeName}
              maxLength={5}
            />
          </div>
          <div className={styles.inputBlock}>
            <label htmlFor="data_bus_address_in1">
              Шина данных первого входа
            </label>
            <input
              id="data_bus_address_in1"
              type="text"
              placeholder={'Шина данных первого входа'}
              value={addresses.in1}
              onChange={handleChangeInBus1}
              maxLength={2}
            />
          </div>
          <div className={styles.inputBlock}>
            <label htmlFor="data_bus_address_in2">
              Шина данных второго входа
            </label>
            <input
              id="data_bus_address_in2"
              type="text"
              placeholder={'Шина данных второго входа'}
              value={addresses.in2}
              onChange={handleChangeInBus2}
              maxLength={2}
            />
          </div>
          <div className={styles.inputBlock}>
            <label htmlFor="data_bus_address_out">Шина данных выхода</label>
            <input
              id="data_bus_address_out"
              type="text"
              placeholder={'Шина данных выхода'}
              value={addresses.out}
              onChange={handleChangeOutBus}
              maxLength={2}
            />
          </div>
          <input
            value={'Добавить'}
            type="submit"
            disabled={
              !name || !addresses.in1 || !addresses.in2 || !addresses.out
            }
          />
        </form>
      </div>
    </div>,
    document.body,
  );
};
