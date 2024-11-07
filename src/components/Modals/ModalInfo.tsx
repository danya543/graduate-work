import { ModalInfoType } from '@src/types/Modal';
import { Button } from '@utils/Button';

import styles from './Modal.module.scss';

export const Commands = [
  ['0x00', 'MOV direct direct'],
  ['0x01', 'MOV direct value'],
];

export const ModalInfo = (props: ModalInfoType) => {
  const { onClose } = props;

  return (
    <section>
      <div className={styles.form_group}>
        <h3>Выберите команду:</h3>
        <div className={styles.options}>
          {Commands.map((command, index) => {
            return (
              <Button
                key={index}
                text={command[1]}
                classname={styles.commandBtn}
                onclick={() => {
                  const form = document.getElementById('form_command');
                  const input = form?.childNodes[0] as HTMLInputElement;

                  if (input) {
                    input.value = command[0];
                  }

                  onClose();
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
