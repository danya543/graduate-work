import { CommandInput } from '@components/CommandInput/CommandInput';
import { PC } from '@components/PC/PC';

import styles from './DragHeader.module.scss';

export const DragHeader = () => {
  return (
    <div className={styles.container}>
      <CommandInput />
      <PC />
    </div>
  );
};
