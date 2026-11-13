import React, { useCallback } from "react";
import styles from "./observation.module.css";

/**
 * The columns of a grid of observations. Each is at least `itemWidth` wide, but no wider than allows two across a narrow
 * screen, and a row of fewer results than fill it leaves the rest empty, rather than stretching them across it.
 * @param itemWidth - The least width of a column, in pixels
 * @return The value of the grid's `grid-template-columns`
 */
export const gridColumns = (itemWidth: number): string =>
	`repeat(auto-fill, minmax(min(${itemWidth}px, calc(50% - 4px)), 1fr))`;

export type ObservationProps = {
	imageUrl: string;
	linkUrl: string;
	children: any;
};

export const Observation = ({imageUrl, linkUrl, children}: ObservationProps) => {
	const gotoObservation = useCallback(() => {
		window.open(linkUrl);
	}, [linkUrl]);

	return (
		<article className={styles.obs} onClick={gotoObservation}>
			{/* The photo is square, and fills the width of its card, which the grid may stretch beyond `itemWidth` */}
			<div className={styles.image} style={{
				background: `url(${imageUrl}) 50% 50% no-repeat`,
				backgroundSize: "cover"
			}}/>
			{children}
		</article>
	);
};
