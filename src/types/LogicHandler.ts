export type LogicHandlerRef = {
  handleNext: () => void;
  getCurrentStep: () => number | null;
  restart: () => void;
};
export type LogicHandlerProps = {
  onStepChange?: (step: number | null) => void;
  initialStep?: number | null;
  restart: () => void;
};

export type LogicContextType = {
  handleNext: () => void;
  currentStep: number | null;
  restartProg: () => void;
};
