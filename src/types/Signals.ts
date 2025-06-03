export type SignalKey =
  | `${string}_${'R' | 'W'}`
  | `ALU_${string}_En`
  | 'ADDER'
  | 'PLUS_RAND';

export type SignalsState = {
  [K in SignalKey]: (0 | 1)[];
};

export type SignalsStateKeys = keyof SignalsState;
