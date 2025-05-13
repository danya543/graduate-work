import { CDTable } from '@components/CDTable/CDTable';
import { AdderOperation, ChangeDataStorage } from '@store/action/action';
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
    if (signals.ROM_R[0] && signals.R0_W[0])
      dispatch(ChangeDataStorage(0, storage.ProgramStorage[0]));
    yield true;

    setHighlightedRow(2);
    if (signals.R0_R[1] && signals.R1_W[1])
      dispatch(ChangeDataStorage(1, storage.DataStorage[0]));
    yield true;

    setHighlightedRow(3);
    if (signals.ROM_R[2] && signals.R2_W[2])
      dispatch(ChangeDataStorage(2, storage.ProgramStorage[1]));
    yield true;

    setHighlightedRow(4);
    if (signals.ACC_W[3] && signals.R1_R[3])
      dispatch(ChangeDataStorage(50, storage.DataStorage[1]));
    yield true;

    setHighlightedRow(5);
    if (signals.RVH_W[4] && signals.R2_R[4])
      dispatch(ChangeDataStorage(51, storage.DataStorage[2]));
    yield true;

    setHighlightedRow(6);
    if (signals.ACC_W[5]) dispatch(AdderOperation(signals.ADDER[5]));
    yield true;

    setHighlightedRow(7);
    if (signals.ACC_R[6] && signals.R1_W[6])
      dispatch(ChangeDataStorage(1, storage.DataStorage[50]));
    yield true;

    setHighlightedRow(8);
    if (signals.ACC_W[7] && signals.R0_R[7])
      dispatch(ChangeDataStorage(50, storage.DataStorage[0]));
    yield true;

    setHighlightedRow(9);
    if (signals.ACC_W[8]) dispatch(AdderOperation(signals.ADDER[8]));
    yield true;

    setHighlightedRow(null);
    if (signals.ACC_R[9] && signals.R2_W[9])
      dispatch(ChangeDataStorage(2, storage.DataStorage[50]));
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
