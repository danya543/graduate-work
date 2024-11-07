import { DragHeader } from '@components/DragHeader/DragHeader';
import { LogoHeader } from '@components/LogoHeader/LogoHeader';

export const Header = () => {
  return (
    <header>
      <LogoHeader />
      <DragHeader />
    </header>
  );
};
