import styles from './ScreenWrapper.module.scss';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

function ScreenWrapper({ children }: Props) {
  return <main>{children}</main>;
}

export default ScreenWrapper;
