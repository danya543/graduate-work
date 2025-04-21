import EditIcon from '@assets/edit.png';
import SaveIcon from '@assets/save.png';
import { CommandDetailsProps } from '@src/types/Command';
import { setCommand } from '@store/action/action';
import { AppDispatch } from '@store/store';
import { CommandPayload } from '@store/types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './CommandInput.module.scss';

export const CommandDetails = ({
  commandTextParts,
  commandValue,
  setCommandValue,
}: CommandDetailsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isChanged, setIsChanged] = useState(false);

  const handleSetValues = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !isDisabled &&
      isChanged &&
      commandValue.firstValue &&
      commandValue.secondValue
    ) {
      dispatch(setCommand(commandValue));
      setIsChanged(false);
    }
    setIsDisabled(prev => !prev);
  };

  const [isDisabled, setIsDisabled] = useState(false);
  const handleChangeValues = (e: { target: { value: string; id: string } }) => {
    setIsChanged(true);
    const { value, id } = e.target;

    +value < 256 &&
      setCommandValue((prev: CommandPayload) => ({
        ...prev,
        [id === '1' ? 'firstValue' : 'secondValue']: Number(value),
      }));
  };

  return (
    <div className={styles.inputCommand}>
      <h3>{commandTextParts[0]}</h3>
      <form onSubmit={handleSetValues}>
        <label>
          {commandTextParts[1] || ''}
          <input
            id="1"
            type="text"
            value={commandValue.firstValue}
            onChange={handleChangeValues}
            disabled={isDisabled}
          />
        </label>
        <label>
          {commandTextParts[2] || ''}
          <input
            id="2"
            type="text"
            value={commandValue.secondValue}
            onChange={handleChangeValues}
            disabled={isDisabled}
          />
        </label>
        <button
          type="submit"
          disabled={commandTextParts[0] === 'No such command'}>
          <img src={isDisabled ? EditIcon : SaveIcon} />
        </button>
      </form>
    </div>
  );
};
