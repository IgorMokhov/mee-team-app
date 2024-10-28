import logo from '../../assets/logo.svg';
import logotype from '../../assets/logotype.svg';

import styles from './Logo.module.scss';

interface LogoProps {
  size: 'small' | 'medium';
}

export const Logo = ({ size }: LogoProps) => {
  return (
    <div className={styles.logo}>
      <img
        className={
          size === 'small' ? styles.logo_icon_small : styles.logo_icon_medium
        }
        src={logo}
        alt="logo"
      />
      <img
        className={
          size === 'small' ? styles.logo_name_small : styles.logo_name_medium
        }
        src={logotype}
        alt="logotype"
      />
    </div>
  );
};
