interface Props {
  children: string;
  onClick: () => void;
}

const Button = (props: Props) => {
  return <button {...props} className='p-2 bg-buttonColor'></button>;
};

export default Button;
