import { GeneratorRegister } from '@src/types/DragAndDrop';

import styles from './StorageRegistr.module.scss';

export const GeneratorRegist = ({
  text,
  generator_addresses,
}: {
  text: string;
  generator_addresses: GeneratorRegister;
}) => {
  return (
    <div className={`${styles.container} ${styles.generator}`}>
      <h1>{text}</h1>
      <p>{generator_addresses.currentValue.toString(16).padStart(2, '0')}</p>
      <p className={styles.data_bus}>{generator_addresses.data_bus}</p>
    </div>
  );
};
