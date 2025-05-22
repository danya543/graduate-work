// LogicHandlerView.tsx
import { CDTable } from '@components/CDTable/CDTable';
import { useLogicContext } from '@components/context/LogicContext';
import { Button } from '@utils/Button';

export const LogicHandlerView = () => {
  const { handleNext, currentStep } = useLogicContext();

  return (
    <div>
      <CDTable highlightedRow={currentStep} />
      <Button
        text={'следующая операция'}
        onclick={handleNext}
        disabled={typeof currentStep !== 'number'}
      />
    </div>
  );
};
