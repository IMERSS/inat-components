import styles from './loader.module.scss';

/* eslint-disable-next-line */
export interface LoaderProps {}

export function Loader(props: LoaderProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Loader!</h1>
    </div>
  );
}

export default Loader;
