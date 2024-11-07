import { increment, reset } from '@store/action/action';
import { AppDispatch, RootState } from '@store/store';
import { Button } from '@utils/Button';
import { useDispatch, useSelector } from 'react-redux';

import styles from './PC.module.scss';

export const PC = () => {
  const counter = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch<AppDispatch>();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleReset = () => {
    dispatch(reset());
  };
  return (
    <div className={styles.container}>
      <div className={styles.counter_container}>
        <p>Command counter: </p>
        <span>{counter}</span>
      </div>
      <div className={styles.manage}>
        <Button
          text={'Такт'}
          onclick={handleIncrement}
          classname={styles.button}
        />
        <Button
          text={'Сброс'}
          onclick={handleReset}
          classname={styles.button}
        />
      </div>
    </div>
  );
};
