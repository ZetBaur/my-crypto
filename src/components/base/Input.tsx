interface Props {
  placeholder: string;
  type: string;
  value: string;
  setSearch: (e: string) => void;
}

const Input = ({ placeholder, type, value, setSearch }: Props) => (
  <input
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e) => setSearch(e.target.value)}
    className='w-full rounded-md p-4 outline-none bg-foregroundLight dark:bg-foregroundDark text-white border-none text-sm dark:text-textColorDark'
  />
);

export default Input;
