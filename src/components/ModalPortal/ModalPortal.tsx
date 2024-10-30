import { Modal } from '@components/Modals/Modal';
import { ModalProps } from '@src/types/Modal';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import styles from './ModalPortal.module.scss';

export const ModalPortal = (props: ModalProps) => {
  const { onClose, type, boxes, setBoxes } = props;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <button className={styles.modal_close} onClick={onClose}>
          &times;
        </button>
        <Modal
          type={type}
          boxes={boxes}
          setBoxes={setBoxes}
          onClose={onClose}
        />
      </div>
    </div>,
    document.body,
  );
};
