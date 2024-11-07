import LogoIcon from '@assets/mmf_logo.svg';
import BlackLogoIcon from '@assets/mmf_logo_black.svg';

export const Images = {
  Logo: LogoIcon,
  Black_Logo: BlackLogoIcon,
};

export const LogoTypes = {
  Header: 'header',
  Footer: 'footer',
};

export const StorageRegistrTypes = {
  ACC: 'acc' as const,
  RVH: 'temp' as const,
};

export const ModalType = {
  Save: 'save',
  Load: 'load',
};
