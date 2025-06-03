import { ERROR_MSG } from '@components/constants';
import {
  executeALUOperation,
  getTypeBox,
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

      const activeKeys = keys.filter(key => signals[key][i] && key !== 'ADDER');

      const dataBusMap: Record<string, string[]> = {};

      for (const key of activeKeys) {
        const isGeneratorSignal = /^gen_.+_R$/.test(key);
        let baseKey = '';

        if (isGeneratorSignal) {
          baseKey = key.split('_')[1];
        } else {
          baseKey = key.split('_')[0];
        }

        let box;
        if (getTypeBox(baseKey)) {
          box = getTypeBox(baseKey);
        } else {
          box = getTypeBox(baseKey, 'GeneratorRegist');
        }

        if (!box) continue;

        const bus = isGeneratorSignal
          ? box.children.props.generator_addresses?.data_bus
          : box.children.props.addresses?.data_bus;

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
          const aluBox = getTypeBox(aluId, 'ALU');
          const { in1, in2, out } = aluBox?.children.props.ALU_addresses ?? {};

          if ((in1 ?? in2 ?? out) && in1 !== out && in2 !== out) {
            const signals_in1 = dataBusMap[in1] ?? [];
            const signals_in2 = dataBusMap[in2] ?? [];
            const signals_out = dataBusMap[out] ?? [];

            const input1_isGenerator = signals_in1.some(
              key => key.startsWith('gen_') && key.endsWith('_R'),
            );
            const input2_isGenerator = signals_in2.some(
              key => key.startsWith('gen_') && key.endsWith('_R'),
            );

            let constValue1: number | undefined = undefined;
            let constValue2: number | undefined = undefined;

            if (input1_isGenerator) {
              const genKey = signals_in1.find(
                k => k.startsWith('gen_') && k.endsWith('_R'),
              )!;
              const base = genKey.split('_').slice(1, -1).join('_');
              const genBox = getTypeBox(base, 'GeneratorRegist');
              constValue1 =
                genBox?.children.props.generator_addresses?.currentValue;
            }

            if (input2_isGenerator) {
              const genKey = signals_in2.find(
                k => k.startsWith('gen_') && k.endsWith('_R'),
              )!;
              const base = genKey.split('_').slice(1, -1).join('_');
              const genBox = getTypeBox(base, 'GeneratorRegist');
              constValue2 =
                genBox?.children.props.generator_addresses?.currentValue;
            }

            const final_in1 = input1_isGenerator
              ? []
              : (signals_in1 as SignalKey[]);
            const final_in2 = input2_isGenerator
              ? []
              : (signals_in2 as SignalKey[]);

            const isValid =
              isValidSignalSet(
                final_in1,
                final_in2,
                signals_out as SignalKey[],
              ) ||
              (input1_isGenerator && final_in2.length && signals_out.length) ||
              (input2_isGenerator && final_in1.length && signals_out.length) ||
              (input1_isGenerator && input2_isGenerator && signals_out.length);

            if (isValid) {
              executeALUOperation(
                final_in1,
                final_in2,
                signals_out as SignalKey[],
                dispatch,
                signals,
                storage,
                i,
                constValue1,
                constValue2,
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
