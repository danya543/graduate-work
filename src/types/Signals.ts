export type SignalsState = {
  ACC_W: 0 | 1;
  ACC_R: 0 | 1;
  ADDER: 0 | 1;
};

export type SignalsStateKeys = keyof SignalsState;
