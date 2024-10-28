import styles from './PC.module.scss';

export const PC = ({ counter }: { counter: number }) => {
  return (
    <div className={styles.container}>
      <p>Command counter: </p>
      <span>{counter}</span>
    </div>
  );
};
