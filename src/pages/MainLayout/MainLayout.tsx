import { Footer } from '@components/Footer/Footer';
import { LogoHeader } from '@components/LogoHeader/LogoHeader';
import { Outlet } from 'react-router-dom';

import styles from './MainLayout.module.scss';

export const MainLayout = () => {
  return (
    <section className={styles.container}>
      <LogoHeader />
      <Outlet />
      <Footer />
    </section>
  );
};
