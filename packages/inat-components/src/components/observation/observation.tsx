import React, {useCallback} from 'react';
import styles from "./observation.module.scss";

export type ObservationProps = {
	imageUrl: string;
	linkUrl: string;
	itemWidth: number;
	children: any;
};

export const Observation = ({imageUrl, linkUrl, itemWidth, children}: ObservationProps) => {
	const gotoObservation = useCallback(() => {
		window.open(linkUrl);
	}, [linkUrl]);

	return (
		<article className={styles.obs} onClick={gotoObservation}>
			<div style={{
				width: itemWidth,
				height: itemWidth,
				overflow: "hidden",
				borderRadius: 5,
				background: `url(${imageUrl}) 50% 50% no-repeat`,
				margin: "0 auto",
				backgroundSize: "cover"
			}}/>
			{children}
		</article>
	);
};
