import { ModalPortal } from '@components/ModalPortal/ModalPortal';
import { Commands } from '@components/Modals/ModalInfo';
import { RootState } from '@store/store';
import { CommandPayload } from '@store/types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CommandDetails } from './CommandDetails';
import { CommandForm } from './CommandForm';
import styles from './CommandInput.module.scss';

export const CommandInput = () => {
  const state = useSelector((state: RootState) => state.command);
  const [commandNum, setCommandNum] = useState('0x');
  const [commandValue, setCommandValue] = useState<CommandPayload>({
    ...state,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [commandTextParts, setCommandTextParts] = useState<string[]>([]);

  const handleOpenInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const commandNumber = commandNum.slice(2);
    if (commandNumber.length === 2) {
      const commandIndex = Number(commandNumber);
      if (commandIndex >= Commands.length) {
        setCommandTextParts(['No such command']);
      } else {
        const commandText = Commands[commandIndex][1] ?? 'No such command';
        setCommandTextParts(commandText.split(' '));
      }
    } else {
      setCommandTextParts([]);
    }
  }, [commandNum]);

  const isCommandValid =
    commandTextParts.length > 0 && commandTextParts[0] !== 'No such command';

  return (
    <>
      <CommandForm
        commandNum={commandNum}
        setCommandNum={setCommandNum}
        onInfoClick={handleOpenInfo}
      />

      {isCommandValid ? (
        <CommandDetails
          commandTextParts={commandTextParts}
          commandValue={commandValue}
          setCommandValue={setCommandValue}
        />
      ) : (
        <p className={styles.noCommand}>{commandTextParts}</p>
      )}

      {isOpen && (
        <ModalPortal
          onClose={closeModal}
          setInputValue={(value: string) =>
            setCommandNum(`0x${value.slice(0, 2)}`)
          }
          type={'info'}
        />
      )}
    </>
  );
};
