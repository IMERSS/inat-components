import styles from './taxon-panel.module.scss';

/* eslint-disable-next-line */
export interface TaxonPanelProps {}

export function TaxonPanel(props: TaxonPanelProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to TaxonPanel!</h1>
    </div>
  );
}

export default TaxonPanel;
