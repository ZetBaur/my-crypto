interface Props {
  placeholder: string;
  // name: string;
  type: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, type, value, handleChange }: Props) => (
  <input
    placeholder={placeholder}
    type={type}
    step='0.0001'
    value={value}
    onChange={(e) => handleChange(e)}
    className='w-full rounded-sm p-2 outline-none bg-foregroundLight dark:bg-foregroundDark text-white border-none text-sm dark:text-textColorDark'
  />
);

export default Input;
