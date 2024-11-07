import { Modal } from '@components/Modals/Modal';
import { ModalInfo } from '@components/Modals/ModalInfo';
import { ModalPortalProps } from '@src/types/Modal';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import styles from './ModalPortal.module.scss';

export const ModalPortal = (props: ModalPortalProps) => {
  const { onClose, type, boxes, setBoxes, setInputValue } = props;

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
        {boxes && setBoxes ? (
          <Modal
            type={type}
            boxes={boxes}
            setBoxes={setBoxes}
            onClose={onClose}
          />
        ) : (
          setInputValue && (
            <ModalInfo
              type={type}
              onClose={onClose}
              setInputValue={setInputValue}
            />
          )
        )}
      </div>
    </div>,
    document.body,
  );
};
