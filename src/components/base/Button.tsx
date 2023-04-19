interface Props {
  children: string;
  onClick: () => void;
}

const Button = (props: Props) => {
  return (
    <button
      {...props}
      className='p-4 bg-buttonColor text-textColorDark rounded-md'
    ></button>
  );
};

export default Button;
