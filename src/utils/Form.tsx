import { useState } from 'react';

import { InputTypes, NumberSystem, NumberSystemRegex } from './constants';
import { Input } from './Input';

export const Form = ({
  placeholder,
  classname,
}: {
  placeholder?: string;
  classname?: string;
}) => {
  const [numSystem, setNumSystem] = useState(NumberSystem.Bin);
  const [inputValue, setInputValue] = useState('');
  const [regex, setRegex] = useState(NumberSystemRegex.Bin);

  const handleChangeNumSystem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInputValue(
      inputValue &&
        (numSystem === NumberSystem.Bin
          ? parseInt(inputValue, 2).toString(16).toUpperCase()
          : parseInt(inputValue, 16).toString(2)),
    );
    setNumSystem(prev =>
      prev === NumberSystem.Bin ? NumberSystem.Hex : NumberSystem.Bin,
    );
    setRegex(prev =>
      prev === NumberSystemRegex.Bin
        ? NumberSystemRegex.Hex
        : NumberSystemRegex.Bin,
    );
  };

  const handleChange = (e: { target: { value: string } }) => {
    if (regex.test(e.target.value) || !e.target.value) {
      setInputValue(e.target.value);
    }
  };
  return (
    <form>
      <Input
        value={inputValue}
        type={InputTypes.Text}
        placeholder={placeholder}
        classname={classname}
        onchange={handleChange}
      />
      <button className={classname} onClick={handleChangeNumSystem}>
        {numSystem}
      </button>
    </form>
  );
};
