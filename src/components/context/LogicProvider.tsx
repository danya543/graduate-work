import {
  LogicHandler,
  LogicHandlerRef,
} from '@components/LogicHandler/LogicHandler';
import { useEffect, useRef, useState } from 'react';

import { LogicContext } from './LogicContext';

export const LogicProvider = ({ children }: { children: React.ReactNode }) => {
  const logicRef = useRef<LogicHandlerRef>(null);
  const [currentStep, setCurrentStep] = useState<number | null>(null);

  const handleNext = () => {
    logicRef.current?.handleNext();
  };

  useEffect(() => {
    const step = logicRef.current?.getCurrentStep();
    setCurrentStep(step ?? 0);
  }, []);

  return (
    <LogicContext.Provider value={{ handleNext, currentStep }}>
      {children}
      <div style={{ display: 'none' }}>
        <LogicHandler
          ref={logicRef}
          onStepChange={setCurrentStep}
          initialStep={currentStep}
        />
      </div>
    </LogicContext.Provider>
  );
};
