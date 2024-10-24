import { ChangeEventHandler } from 'react';

export const Input = ({
  type,
  placeholder,
  value,
  classname,
  onchange,
}: {
  type: string;
  placeholder?: string;
  value?: string;
  classname?: string;
  onchange?: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <input
      type={type}
      className={classname}
      placeholder={placeholder}
      value={value}
      onChange={onchange}
    />
  );
};
