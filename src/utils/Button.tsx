import styles from './utils.module.scss';

export const Button = ({
  text,
  icon,
  classname,
  onclick,
}: {
  text?: string;
  icon?: string;
  classname?: string;
  onclick: () => void;
}) => {
  return (
    <button
      className={`${classname && classname} ${styles.button}`}
      onClick={onclick}>
      {icon ? <img src={icon} alt="" /> : text}
    </button>
  );
};
