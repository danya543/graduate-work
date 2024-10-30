export const InputTypes = {
  Text: 'text',
  Button: 'button',
  Number: 'number',
};

export const NumberSystem = {
  Bin: 'bin',
  Hex: 'hex',
};

export const NumberSystemRegex = {
  Bin: /^[0-1]+$/,
  Hex: /^[A-Fa-f0-9]+$/,
};

export const InputRegex = {
  SaveInput: /^[A-ZА-Яa-zа-я0-9_-]+$/,
};
