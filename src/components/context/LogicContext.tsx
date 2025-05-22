import { createContext, useContext } from 'react';

type LogicContextType = {
  handleNext: () => void;
  currentStep: number | null;
};

export const LogicContext = createContext<LogicContextType | null>(null);

export const useLogicContext = () => {
  const ctx = useContext(LogicContext);
  if (!ctx)
    throw new Error(
      'useLogicContext must be used within LogicContext.Provider',
    );
  return ctx;
};
