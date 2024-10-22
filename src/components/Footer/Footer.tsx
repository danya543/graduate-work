import { LogoTypes } from '@components/constants';
import { Logo } from '@components/Logo/Logo';

import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Logo type={LogoTypes.Footer} />
    </footer>
  );
};
