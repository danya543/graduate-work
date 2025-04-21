import { CommandInput } from '@components/CommandInput/CommandInput';
import { ControlDevice } from '@components/ControlDevice/ControlDevice';
import { PC } from '@components/PC/PC';

import styles from './DragHeader.module.scss';

export const DragHeader = () => {
  return (
    <div className={styles.container}>
      <CommandInput />
      <ControlDevice />
      <PC />
    </div>
  );
};
