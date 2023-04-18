import styles from './ScreenWrapper.module.scss';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

function ScreenWrapper({ children }: Props) {
  return <div>{children}</div>;
}

export default ScreenWrapper;
