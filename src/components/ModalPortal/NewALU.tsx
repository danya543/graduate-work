import LocalStorageService from '@applicationStorage/LocalStorage';
import { ALUBlock } from '@src/types/DragAndDrop';
import { REGEXP } from '@utils/constants';
import { FormEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import styles from './ModalPortal.module.scss';

export const NewALU = (props: {
  onClose: () => void;
  addNewALU: (name: string, ALU_addresses: ALUBlock) => void;
}) => {
  const { onClose, addNewALU } = props;

  const [name, setName] = useState('');
  const [addresses, setAddresses] = useState({ in1: '', in2: '', out: '' });

  const boxes = LocalStorageService.loadBoxes('last_work');
  const ALUs = boxes.filter(el => el.type === 'ALU');

  const handleChangeName = (e: { target: { value: string } }) => {
    const { value } = e.target;
    const isEqualName = ALUs.some(el => el.children.props.text === value);
    if (REGEXP.InputEnRegex.test(value) || value === '') {
      if (isEqualName) {
        document.getElementById('name')?.classList.add(styles.error);
      } else {
        document.getElementById('name')?.classList.remove(styles.error);
      }
      setName(value);
    }
  };
  const handleChangeInBus1 = (e: { target: { value: string } }) => {
    const { value } = e.target;

    if (value || value === '') {
      if (value != addresses.out) {
        document
          .getElementById('data_bus_address_in1')
          ?.classList.remove(styles.error);
      } else {
        document
          .getElementById('data_bus_address_in1')
          ?.classList.add(styles.error);
      }
      setAddresses(prev => ({ ...prev, in1: value }));
    }
  };
  const handleChangeInBus2 = (e: { target: { value: string } }) => {
    const { value } = e.target;

    if (value || value === '') {
      if (value != addresses.out) {
        document
          .getElementById('data_bus_address_in2')
          ?.classList.remove(styles.error);
      } else {
        document
          .getElementById('data_bus_address_in2')
          ?.classList.add(styles.error);
      }
      setAddresses(prev => ({ ...prev, in2: value }));
    }
  };
  const handleChangeOutBus = (e: { target: { value: string } }) => {
    const { value } = e.target;

    if (value || value === '') {
      if (value != addresses.in1 && value != addresses.in2) {
        document
          .getElementById('data_bus_address_out')
          ?.classList.remove(styles.error);
      } else {
        document
          .getElementById('data_bus_address_out')
          ?.classList.add(styles.error);
      }
      setAddresses(prev => ({ ...prev, out: value }));
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

  const isErrorClass = ![...document.getElementsByTagName('input')].some(el =>
    el.classList.contains(styles.error),
  );

  const isDisabled =
    !name ||
    !addresses.in1 ||
    !addresses.in2 ||
    !addresses.out ||
    !isErrorClass;

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
          <input value={'Добавить'} type="submit" disabled={isDisabled} />
        </form>
      </div>
    </div>,
    document.body,
  );
};
