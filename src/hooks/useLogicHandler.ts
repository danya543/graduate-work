import {
  getRegisterBox,
  processBusSignals,
} from '@components/LogicHandler/utils';
import { SignalsState } from '@src/types/Signals';
import { StorageState } from '@src/types/Storage';
import { AppDispatch } from '@store/store';
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
    const keys = Object.keys(signals) as (keyof typeof signals)[];

    for (let i = initialStep ?? 0; i < length; i++) {
      setHighlightedRow(i + 1);
      onStepChange?.(i + 1);

      const activeKeys = keys.filter(key => signals[key][i] && key !== 'ADDER');

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

      for (const bus in dataBusMap) {
        processBusSignals(dataBusMap[bus], i, dispatch, storage, signals);
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
