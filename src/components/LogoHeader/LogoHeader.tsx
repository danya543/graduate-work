import { LogoTypes } from '@components/constants';
import { Logo } from '@components/Logo/Logo';

import styles from './LogoHeader.module.scss';

export const LogoHeader = () => {
  return (
    <div className={styles.header}>
      <Logo type={LogoTypes.Header} />
    </div>
  );
};
