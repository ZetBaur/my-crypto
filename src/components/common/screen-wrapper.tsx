import styles from './ScreenWrapper.module.scss';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

function ScreenWrapper({ children }: Props) {
  return <div className=' m-4'>{children}</div>;
}

export default ScreenWrapper;
