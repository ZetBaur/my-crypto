interface Props {
  children: string;
  onClick: () => void;
}

const Button = (props: Props) => {
  return <button {...props}></button>;
};

export default Button;
