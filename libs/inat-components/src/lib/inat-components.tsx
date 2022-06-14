import styles from './inat-components.module.scss';

/* eslint-disable-next-line */
export interface InatComponentsProps {}

export function InatComponents(props: InatComponentsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to InatComponents!</h1>
    </div>
  );
}

export default InatComponents;
