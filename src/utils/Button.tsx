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
    <button className={`${classname && classname}`} onClick={onclick}>
      {icon ? <img src={icon} alt="" /> : text}
    </button>
  );
};
