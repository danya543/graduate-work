import { FormEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import styles from './ModalPortal.module.scss';

export const NewRegister = (props: {
  onClose: () => void;
  addNewRegister: (
    name: string,
    addresses: { current: string; from: string; to: string },
  ) => void;
}) => {
  const { onClose, addNewRegister } = props;

  const [name, setName] = useState('');
  const [addresses, setAddresses] = useState({ current: '', from: '', to: '' });

  const handleChangeName = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setName(value);
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
      setAddresses(prev => ({ ...prev, from: value }));
    }
    if (value === '') {
      setAddresses(prev => ({ ...prev, from: '' }));
    }
  };
  const handleChangeToAddress = (e: { target: { value: string } }) => {
    const { value } = e.target;
    const num = Number(value);
    if (!Number.isNaN(num) && num >= 0 && num <= 255) {
      setAddresses(prev => ({ ...prev, to: value }));
    }
    if (value === '') {
      setAddresses(prev => ({ ...prev, to: '' }));
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
      <div className={`${styles.modal_content}`}>
        <button className={styles.modal_close} onClick={onClose}>
          &times;
        </button>
        <form onSubmit={submitHandler}>
          <div className={styles.inputBlock}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder={'name'}
              value={name}
              onChange={handleChangeName}
              maxLength={5}
              name="name"
            />
          </div>
          <div className={styles.inputBlock}>
            <label htmlFor="ram address">Ram address</label>
            <input
              type="text"
              placeholder={'ram address'}
              value={addresses.current}
              onChange={handleChangeAddress}
              maxLength={3}
              name="ram address"
            />
          </div>
          <div className={styles.inputBlock}>
            <label htmlFor="from address">From address</label>
            <input
              type="text"
              placeholder={'from address'}
              value={addresses.from}
              onChange={handleChangeFromAddress}
              maxLength={3}
              name="from address"
            />
          </div>
          <div className={styles.inputBlock}>
            <label htmlFor="to address">To address</label>
            <input
              type="text"
              placeholder={'to address'}
              value={addresses.to}
              onChange={handleChangeToAddress}
              maxLength={3}
              name="to address"
            />
          </div>
          <input
            type="submit"
            disabled={
              !name || !addresses.current || !addresses.from || !addresses.to
            }
          />
        </form>
      </div>
    </div>,
    document.body,
  );
};
