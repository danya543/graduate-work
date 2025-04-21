import { AdderOperation } from '@store/action/action';
import { AppDispatch, RootState } from '@store/store';
import { Button } from '@utils/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Adder = () => {
  const storage = useSelector((state: RootState) => state.storage);
  const dispatch = useDispatch<AppDispatch>();
  const [isCalc, setIsCalc] = useState(false);
  const handleOperation = () => {
    dispatch(AdderOperation(0, 2, 4));
    setIsCalc(true);
  };

  return (
    <div>
      <Button text={'операция сумматора'} onclick={handleOperation} />
      <p>
        ячейки 1: ({storage.ProgramStorage[0]}) 3: ({storage.ProgramStorage[2]})
      </p>
      {isCalc ? `результат в 5: (${storage.ProgramStorage[4]})` : ''}
    </div>
  );
};
