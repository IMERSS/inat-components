import styles from './recent-observations.module.scss';

/* eslint-disable-next-line */
export interface RecentObservationsProps {}

export function RecentObservations(props: RecentObservationsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to RecentObservations!</h1>
    </div>
  );
}

export default RecentObservations;
