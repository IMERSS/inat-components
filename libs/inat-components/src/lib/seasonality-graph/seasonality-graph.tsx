import styles from './seasonality-graph.module.scss';

/* eslint-disable-next-line */
export interface SeasonalityGraphProps {}

export function SeasonalityGraph(props: SeasonalityGraphProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SeasonalityGraph!</h1>
    </div>
  );
}

export default SeasonalityGraph;
