export const InputTypes = {
  Text: 'text',
  Button: 'button',
  Number: 'number',
};

export const NumberSystem = {
  Bin: 'bin',
  Hex: 'hex',
};

export const REGEXP = {
  InputEnRegex: /^[A-Za-z0-9]+$/,
  InputRegex: /^[A-ZА-Яa-zа-я0-9_-]+$/,
  BinNumberSystem: /^[0-1]+$/,
  HexNumberSystem: /^[A-Fa-f0-9]+$/,
  isALU: /^ALU_.+_En$/,
};
