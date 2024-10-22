import { Images, LogoTypes } from '@components/constants';

export const Logo = ({ type }: { type: string }) => {
  const icon =
    type === LogoTypes.Footer ? `${Images.Black_Logo}` : `${Images.Logo}`;
  return (
    <a href="https://mmf.bsu.by/ru/" target="_blank" rel="noreferrer">
      <img src={icon} alt="" />
    </a>
  );
};
