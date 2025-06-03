import { ERROR_MSG } from '@components/constants';
import {
  executeALUOperation,
  getALUBox,
  getRegisterBox,
  isValidSignalSet,
  processBusSignals,
} from '@components/LogicHandler/utils';
import { SignalKey, SignalsState } from '@src/types/Signals';
import { StorageState } from '@src/types/Storage';
import { AppDispatch } from '@store/store';
import { REGEXP } from '@utils/constants';
import { useEffect, useRef, useState } from 'react';

export const useLogicHandler = (
  signals: SignalsState,
  dispatch: AppDispatch,
  storage: StorageState,
  initialStep: number | null,
  onStepChange?: (n: number | null) => void,
) => {
  const operationRef = useRef<Generator | null>(null);
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null);
  const hasSetInitial = useRef(false);

  useEffect(() => {
    if (initialStep !== null && !hasSetInitial.current) {
      setHighlightedRow(initialStep);
      hasSetInitial.current = true;
    }
  }, [initialStep]);

  useEffect(() => {
    onStepChange?.(highlightedRow);
  }, [highlightedRow]);

  function* handleOperation() {
    const length = signals.ADDER.length;
    const keys = Object.keys(signals) as SignalKey[];

    for (let i = initialStep ?? 0; i < length; i++) {
      setHighlightedRow(i + 1);
      onStepChange?.(i + 1);

      const activeKeys = keys.filter(
        key => signals[key][i] && key !== 'ADDER' && key !== 'PLUS_RAND',
      );

      const dataBusMap: Record<string, string[]> = {};

      for (const key of activeKeys) {
        const box = getRegisterBox(key.split('_')[0]);
        const bus = box?.children.props.addresses.data_bus;
        if (!bus) continue;

        if (!dataBusMap[bus]) {
          dataBusMap[bus] = [];
        }
        dataBusMap[bus].push(key);
      }

      const ALU_EN = activeKeys.filter(item => REGEXP.isALU.test(item));

      if (ALU_EN.length > 0) {
        for (const aluKey of ALU_EN) {
          const aluId = aluKey.split('_')[1];
          const aluBox = getALUBox(aluId);
          const { in1, in2, out } = aluBox?.children.props.ALU_addresses ?? {};

          if ((in1 ?? in2 ?? out) && in1 !== out && in2 !== out) {
            const signals_in1 = dataBusMap[in1] as SignalKey[];
            const signals_in2 = dataBusMap[in2] as SignalKey[];
            const signals_out = dataBusMap[out] as SignalKey[];

            if (isValidSignalSet(signals_in1, signals_in2, signals_out)) {
              executeALUOperation(
                signals_in1,
                signals_in2,
                signals_out,
                dispatch,
                signals,
                i,
              );
            } else {
              alert(ERROR_MSG.signals);
            }
          }
        }
      } else {
        for (const bus in dataBusMap) {
          processBusSignals(dataBusMap[bus], dispatch, storage);
        }
      }

      if (i === length - 1) {
        setHighlightedRow(null);
        onStepChange?.(null);
        return true;
      }

      yield true;
    }
  }

  const handleNext = () => {
    if (!operationRef.current) {
      operationRef.current = handleOperation();
    }

    const { done } = operationRef.current.next();
    if (done) {
      operationRef.current = null;
    }
  };

  const restart = () => {
    operationRef.current = null;
    setHighlightedRow(0);
  };

  return {
    handleNext,
    restart,
    getCurrentStep: () => highlightedRow,
  };
};
