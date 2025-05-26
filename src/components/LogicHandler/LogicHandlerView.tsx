// LogicHandlerView.tsx
import { CDTable } from '@components/CDTable/CDTable';
import { useLogicContext } from '@components/context/LogicContext';
import { Button } from '@utils/Button';

import styles from './LogicHandlerView.module.scss';

export const LogicHandlerView = () => {
  const { handleNext, currentStep, restartProg } = useLogicContext();

  return (
    <div className={styles.container}>
      <CDTable highlightedRow={currentStep} />
      <Button
        text={'следующая операция'}
        onclick={handleNext}
        disabled={typeof currentStep !== 'number'}
        classname={styles.next}
      />
      <Button
        onclick={restartProg}
        text={'Заново'}
        classname={styles.restart}
      />
    </div>
  );
};
