import { CommandInput } from '@components/CommandInput/CommandInput';
import { ControlDevice } from '@components/ControlDevice/ControlDevice';
import { ControlDevicePreview } from '@components/ControlDevicePreview/ControlDevicePreview';

import styles from './DragHeader.module.scss';

export const DragHeader = () => {
  return (
    <div className={styles.container}>
      <CommandInput />
      <ControlDevicePreview />
      <ControlDevice />
    </div>
  );
};
