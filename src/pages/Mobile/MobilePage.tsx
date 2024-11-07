import under from '@assets/under_maintance.jpg';

import styles from './MobilePage.module.scss';

export const MobilePage = () => {
  return (
    <section className={styles.container}>
      <img src={under} alt="" />
    </section>
  );
};
