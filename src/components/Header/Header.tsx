import { LogoTypes } from '@components/constants';
import { Logo } from '@components/Logo/Logo';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Logo type={LogoTypes.Header} />
    </header>
  );
};
