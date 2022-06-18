import styles from './error.module.scss';


/* eslint-disable-next-line */
export interface ErrorProps {
}

export const Error = (props: ErrorProps) => {
	return (
		<div className={styles['container']}>
			<h1>Welcome to Error!</h1>
		</div>
	);
};

export default Error;
