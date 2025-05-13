export type SignalsState = {
  ACC_W: (0 | 1)[];
  ACC_R: (0 | 1)[];
  RVH_W: (0 | 1)[];
  RVH_R: (0 | 1)[];
  ADDER: (0 | 1)[];
  ROM_R: (0 | 1)[];
  R0_R: (0 | 1)[];
  R0_W: (0 | 1)[];
  R1_R: (0 | 1)[];
  R1_W: (0 | 1)[];
  R2_R: (0 | 1)[];
  R2_W: (0 | 1)[];
};

export type SignalsStateKeys = keyof SignalsState;
