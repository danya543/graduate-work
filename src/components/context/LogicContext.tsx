import { LogicContextType } from '@src/types/LogicHandler';
import { createContext, useContext } from 'react';

export const LogicContext = createContext<LogicContextType | null>(null);

export const useLogicContext = () => {
  const ctx = useContext(LogicContext);
  if (!ctx)
    throw new Error(
      'useLogicContext must be used within LogicContext.Provider',
    );
  return ctx;
};
