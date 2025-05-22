// ControlDevicePreview.tsx
import { useLogicContext } from '@components/context/LogicContext';
import { RootState } from '@store/store';
import { useSelector } from 'react-redux';

export const ControlDevicePreview = () => {
  const { currentStep, handleNext } = useLogicContext();
  const signals = useSelector((state: RootState) => state.signals);

  if (currentStep === null) return null;
  const signalEntries = Object.entries(signals);

  return (
    <div>
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
      <button onClick={handleNext}>Следующий шаг</button>
    </div>
  );
};
