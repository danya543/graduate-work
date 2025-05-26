// ControlDevicePreview.tsx
import { useLogicContext } from '@components/context/LogicContext';
import { RootState } from '@store/store';
import { Button } from '@utils/Button';
import { useSelector } from 'react-redux';

import styles from './ControlDevicePreview.module.scss';

export const ControlDevicePreview = () => {
  const { currentStep, handleNext } = useLogicContext();
  const signals = useSelector((state: RootState) => state.signals);

  if (currentStep === null) return <div>Программа окончена</div>;
  const signalEntries = Object.entries(signals);

  return (
    <div className={styles.preview}>
      <h4>Текущие сигналы (шаг {currentStep})</h4>
      <table>
        <tbody>
          <tr>
            {signalEntries.map(([key, _]) => (
              <td key={key}>{key}</td>
            ))}
          </tr>
          <tr>
            {signalEntries.map(([key, arr]) => (
              <td key={key}>{arr[currentStep]}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <Button
        onclick={handleNext}
        text={'Следующий шаг'}
        classname={styles.next}
      />
    </div>
  );
};
