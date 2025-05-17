type SignalKey =
  | `${string}_${'R' | 'W'}`
  | 'ADDER'
  | 'ACC_R'
  | 'ACC_W'
  | 'RVH_R'
  | 'RVH_W';

export type SignalsState = {
  [K in SignalKey]: (0 | 1)[];
};

export type SignalsStateKeys = keyof SignalsState;
