import React from "react";
import {
	formatDate,
	C,
	getRecentObservations,
	RecentObservationData,
	BaseComponentProps,
	DataSource,
	BaseClasses
} from "../../__shared";
import { Observation } from "../observation/observation";
import Loader from "../loader/loader";
import { NoResults } from "../no-results/no-results";
import styles from "../shared/css/general.module.scss";
import { useLoadSourceData } from "../../hooks/useLoadSourceData";

export type RecentObservationsProps = BaseComponentProps;

export const RecentObservationLabel = (obs: RecentObservationData & { classes: BaseClasses }) => (
	<div className={styles.obsLabel}>
		<h3 className={obs.classes?.observationLabelTitle}>{obs.taxonCommonName || obs.taxonName}</h3>
		<div className={obs.classes?.observationLabelDate}>{formatDate(obs.obsDate)}</div>
		<div className={obs.classes?.observationLabelName}>
			<a href={`${C.BASE_URL}/people/${obs.observerUsername}`}
			   target="_blank"
			   rel="noreferrer"
			   onClick={(e) => e.stopPropagation()}>
				{obs.observerUsername}
			</a>
		</div>
	</div>
);

export const RecentObservations = ({
	taxonId,
	placeId,
	data,
	dataUrl,
	components,
	className,
	classes,
	tabDesc,
	source = DataSource.autoLoad,
	perPage = C.PER_PAGE,
	itemWidth = C.DEFAULT_ITEM_WIDTH
}: RecentObservationsProps) => {
	const { loading, results: observations } = useLoadSourceData({
		taxonId,
		placeId,
		perPage,
		data,
		dataUrl,
		source,
		action: getRecentObservations
	});
	const Load = components?.loader ? components.loader as any : Loader;
	const Label = components?.label ? components.label as any : RecentObservationLabel;

	let componentClasses = styles.panel;
	if (className) {
		componentClasses += ` ${className}`;
	}
	let descClasses = styles.tabDesc;
	if (classes?.tabDesc) {
		descClasses += ` ${classes.tabDesc}`;
	}

	return (
		<div className={componentClasses}>
			{tabDesc && <p className={descClasses}>{tabDesc}</p>}
			<Load loading={loading}/>
			<div className={styles.grid} style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${itemWidth}px, 1fr))` }}>
				{!loading && observations.length === 0 && <NoResults/>}
				{observations.map((obs: RecentObservationData) => (
					<Observation
						key={obs.id}
						imageUrl={obs.imageUrl.replace(/square/, "medium")}
						itemWidth={itemWidth}
						linkUrl={obs.obsUrl}>
						<Label {...obs} classes={classes} />
					</Observation>
				))}
			</div>
		</div>
	);
};
