import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { Outlet } from 'react-router-dom';

import styles from './MainLayout.module.scss';

export const MainLayout = () => {
  return (
    <section className={styles.container}>
      <Header />
      <Outlet />
      <Footer />
    </section>
  );
};
