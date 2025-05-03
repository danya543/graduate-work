import styles from './utils.module.scss';

export const Button = ({
  text,
  icon,
  classname,
  onclick,
  disabled = false,
}: {
  text?: string;
  icon?: string;
  classname?: string;
  onclick: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`${classname && classname} ${styles.button}`}
      onClick={onclick}
      disabled={disabled}>
      {icon ? <img src={icon} alt="" /> : text}
    </button>
  );
};
