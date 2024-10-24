import styles from './Storage.module.scss';

export const Storage = ({ data }: { data: number[] }) => {
  return (
    <section className={styles.container}>
      {data.map((item, index) => (
        <div key={index} className={styles.item}>
          {item.toString(16).padStart(2, '0')}
        </div>
      ))}
    </section>
  );
};
