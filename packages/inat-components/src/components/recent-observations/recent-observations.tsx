import React from "react";
import {
	formatDate,
	C,
	getRecentObservations,
	RecentObservationData,
	BaseComponentProps,
	DataSourceEnum,
	GeneralClasses
} from "../../../../../shared";
import { Observation } from "../observation/observation";
import Loader from "../loader/loader";
import { NoResults } from "../no-results/no-results";
import { useLoadSourceData } from "../../hooks/useLoadSourceData";
import styles from "../__shared/css/general.module.scss";

export type RecentObservationsProps = BaseComponentProps;

export const RecentObservationLabel = (obs: RecentObservationData & { classes: GeneralClasses }) => (
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
	dataUrl,
	components,
	className,
	generalClasses,
	tabDesc,
	source = DataSourceEnum.autoLoad,
	perPage = C.PER_PAGE,
	itemWidth = C.DEFAULT_ITEM_WIDTH
}: RecentObservationsProps) => {
	const { loading, results: observations } = useLoadSourceData({
		taxonId,
		placeId,
		perPage,
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
	if (generalClasses?.tabDesc) {
		descClasses += ` ${generalClasses.tabDesc}`;
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
						<Label {...obs} classes={generalClasses} />
					</Observation>
				))}
			</div>
		</div>
	);
};
