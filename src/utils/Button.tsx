export const Button = ({
  text,
  icon,
  onclick,
}: {
  text?: string;
  icon?: string;
  onclick: () => void;
}) => {
  return (
    <button onClick={onclick}>{icon ? <img src={icon} alt="" /> : text}</button>
  );
};
