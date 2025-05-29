import LocalStorageService from '@applicationStorage/LocalStorage';
import LogoIcon from '@assets/mmf_logo.svg';
import BlackLogoIcon from '@assets/mmf_logo_black.svg';
import { SignalsState } from '@src/types/Signals';

export const Images = {
  Logo: LogoIcon,
  Black_Logo: BlackLogoIcon,
};

export const ERROR_MSG = {
  data_bus: 'Ошибка! Шины данных не совпадают',
};

export const LogoTypes = {
  Header: 'header',
  Footer: 'footer',
};

export const ModalType = {
  Save: 'save',
  Load: 'load',
};

export const areKeysEqual = (a: object, b: object): boolean => {
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();

  if (aKeys.length !== bKeys.length) return false;

  return aKeys.every((key, index) => key === bKeys[index]);
};

export const generateSignalsFromBoxes = (): SignalsState => {
  const currentBoxes = LocalStorageService.loadBoxes('last_work');

  return Object.fromEntries([
    ...currentBoxes.flatMap(box => {
      if (box.type === 'Storages') {
        return [
          /* ['ROM_R', Array(1).fill(0)] */
        ];
      }

      if (box.type === 'StorageRegist' && 'props' in box.children) {
        const text = box.children.props.text;
        return [
          [`${text}_W`, Array(1).fill(0)],
          [`${text}_R`, Array(1).fill(0)],
        ];
      }

      return [[box.type, Array(1).fill(0)]];
    }),
    ['ADDER', Array(1).fill(0)],
  ]);
};
