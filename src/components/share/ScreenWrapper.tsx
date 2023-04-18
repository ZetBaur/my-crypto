import styles from './ScreenWrapper.module.scss';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

function ScreenWrapper({ children }: Props) {
  return <div className={styles.screenWrapper}>{children}</div>;
}

export default ScreenWrapper;
