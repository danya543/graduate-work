import LocalStorageService from '@applicationStorage/LocalStorage';
import { AdderOperation } from '@store/action/action';
import { AppDispatch, RootState } from '@store/store';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRegisterAddress, getRegisterBox, moveData } from './utils';

export type LogicHandlerRef = {
  handleNext: () => void;
  getCurrentStep: () => number | null;
};
type LogicHandlerProps = {
  onStepChange?: (step: number | null) => void;
  initialStep?: number | null;
};

export const LogicHandler = forwardRef<LogicHandlerRef, LogicHandlerProps>(
  ({ onStepChange, initialStep = 0 }, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const storage = useSelector((state: RootState) => state.storage);
    const signals = useSelector((state: RootState) => state.signals);

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
    }, [highlightedRow, onStepChange]);

    function* handleOperation() {
      const length = signals.ADDER.length;
      const keys = Object.keys(signals) as (keyof typeof signals)[];

      for (let i = initialStep ?? 0; i < length - 1; i++) {
        setHighlightedRow(i + 1);
        onStepChange && onStepChange(i + 1);

        const activeKeys = keys
          .flatMap(key => (signals[key][i] ? [key] : []))
          .filter(key => key !== 'ADDER');

        if (activeKeys.length === 2) {
          const [[k1, t1], [k2, t2]] = activeKeys.map(k => k.split('_'));
          if (t1 === 'W' && t2 === 'R') {
            moveData(k1, k2, dispatch, storage);
          } else if (t1 === 'R' && t2 === 'W') {
            moveData(k2, k1, dispatch, storage);
          } else if (t1 === 'R' && t2 === 'R') {
            const curBoxes = LocalStorageService.loadBoxes('last_work');
            const regBoxes = curBoxes.filter(
              box => box.type === 'StorageRegist',
            );
            const regBox_R1 = regBoxes.find(
              box => box.children.props.text === k1,
            );
            const regBox_R2 = regBoxes.find(
              box => box.children.props.text === k2,
            );

            if (regBox_R1 && regBox_R2) {
              dispatch(
                AdderOperation(
                  signals.ADDER[i],
                  regBox_R1.children.props.addresses.current,
                  regBox_R2.children.props.addresses.current,
                ),
              );
            }
          }
        }

        if (activeKeys.length === 1) {
          const [key, type] = activeKeys[0].split('_');
          const regBox = getRegisterBox(key);
          const addr = getRegisterAddress(regBox);
          if (!regBox || addr === undefined) continue;

          if (type === 'R') {
            alert(storage.DataStorage[addr]);
          }
        }

        yield true;
      }

      setHighlightedRow(null);
      onStepChange && onStepChange(null);
      return true;
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

    useImperativeHandle(ref, () => ({
      handleNext,
      getCurrentStep: () => initialStep,
    }));

    return null;
  },
);

LogicHandler.displayName = 'LogicHandler';
