import styles from './StorageRegistr.module.scss';

export const StorageRegistr = ({
  text,
  value,
}: {
  text: string;
  value: number;
}) => {
  return (
    <div className={`${styles.container} ${styles.acc}`}>
      <h1>{text}</h1>
      <p>{value.toString(16).padStart(2, '0')}</p>
    </div>
  );
};
