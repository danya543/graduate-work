import { InputTypes, NumberSystemRegex } from '@utils/constants';
import { Input } from '@utils/Input';

import styles from './CommandInput.module.scss';

interface CommandFormProps {
  commandNum: string;
  setCommandNum: (value: string) => void;
  onInfoClick: (e: React.FormEvent) => void;
}

export const CommandForm = ({
  commandNum,
  setCommandNum,
  onInfoClick,
}: CommandFormProps) => {
  const handleChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    if (value.startsWith('0x') && value.length <= 4) {
      const hexValue = value.slice(2);
      if (NumberSystemRegex.Hex.test(hexValue) || hexValue === '') {
        setCommandNum(value);
      }
    }
  };

  return (
    <form className={styles.container} id="form_command">
      <Input
        value={commandNum}
        type={InputTypes.Text}
        placeholder="Enter your command"
        classname={styles.input}
        onchange={handleChange}
      />
      <button onClick={onInfoClick} className={styles.info}>
        ?
      </button>
    </form>
  );
};
