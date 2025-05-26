import { CDModal } from '@components/ModalPortal/CDModal';
import { Button } from '@utils/Button';
import { useState } from 'react';

import styles from './ControlDevicePreview.module.scss';

export const ControlDevice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Button
        text={'Управляющее устройство'}
        onclick={() => setIsOpen(true)}
        classname={styles.openModal}
      />
      {isOpen && <CDModal onClose={closeModal} />}
    </div>
  );
};
