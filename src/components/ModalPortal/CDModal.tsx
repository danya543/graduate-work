import { LogicHandlerView } from '@components/LogicHandler/LogicHandlerView';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import styles from './ModalPortal.module.scss';

export const CDModal = (props: { onClose: () => void }) => {
  const { onClose } = props;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.modal_overlay}>
      <div className={`${styles.modal_content} ${styles.CDModal}`}>
        <button className={styles.modal_close} onClick={onClose}>
          &times;
        </button>
        <LogicHandlerView />
      </div>
    </div>,
    document.body,
  );
};
