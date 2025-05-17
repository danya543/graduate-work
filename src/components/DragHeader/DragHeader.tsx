import { CommandInput } from '@components/CommandInput/CommandInput';
import { ControlDevice } from '@components/ControlDevice/ControlDevice';

import styles from './DragHeader.module.scss';

export const DragHeader = () => {
  return (
    <div className={styles.container}>
      <CommandInput />
      <ControlDevice />
    </div>
  );
};
