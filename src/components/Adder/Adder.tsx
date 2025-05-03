import { CDTable } from '@components/CDTable/CDTable';
import { AdderOperation, ChangeProgramStorage } from '@store/action/action';
import { AppDispatch, RootState } from '@store/store';
import { Button } from '@utils/Button';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Adder = () => {
  const storage = useSelector((state: RootState) => state.storage);
  const signals = useSelector((state: RootState) => state.signals);
  const dispatch = useDispatch<AppDispatch>();

  const [highlightedRow, setHighlightedRow] = useState<number | null>(0);
  const operationRef = useRef<Generator | null>(null);

  function* handleOperation() {
    setHighlightedRow(1);
    dispatch(ChangeProgramStorage(0, storage.DataStorage[0]));
    yield true;

    setHighlightedRow(2);
    dispatch(ChangeProgramStorage(1, storage.DataStorage[1]));
    yield true;

    setHighlightedRow(3);
    dispatch(AdderOperation(0, 1, signals.ADDER[2]));
    yield true;

    setHighlightedRow(4);
    dispatch(ChangeProgramStorage(4, storage.DataStorage[0]));
    yield true;

    setHighlightedRow(5);
    dispatch(AdderOperation(0, 1, signals.ADDER[4]));
    yield true;

    setHighlightedRow(null);
    dispatch(ChangeProgramStorage(5, storage.DataStorage[0]));
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

  return (
    <div>
      <CDTable highlightedRow={highlightedRow} />
      <Button
        text={'следующая операция'}
        onclick={handleNext}
        disabled={typeof highlightedRow === 'number' ? false : true}
      />
    </div>
  );
};
