import styles from './no-results.module.scss';

/* eslint-disable-next-line */
export interface NoResultsProps {}

export function NoResults(props: NoResultsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to NoResults!</h1>
    </div>
  );
}

export default NoResults;
