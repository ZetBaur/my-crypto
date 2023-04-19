interface Props {
  placeholder: string;
  // name: string;
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
    className='w-full rounded-sm p-2 outline-none bg-foregroundLight dark:bg-foregroundDark text-white border-none text-sm dark:text-textColorDark'
  />
);

export default Input;
