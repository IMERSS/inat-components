import React, {useEffect, useState} from "react";
import {formatDate, C, getRecentObservations, RecentObservationData, BaseComponentProps, DataSource} from "../../__shared";
import {Observation} from "../observation/observation";
import Loader from "../loader/loader";
import {NoResults} from "../no-results/no-results";
import styles from "../shared/css/general.module.scss";

export type RecentObservationsProps = BaseComponentProps;

export const RecentObservationLabel = (obs: RecentObservationData) => (
	<div className={styles.obsLabel}>
		<h3>{obs.taxonCommonName || obs.taxonName}</h3>
		<div>{formatDate(obs.obsDate)}</div>
		<div>
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
	source = DataSource.autoLoad,
	perPage = C.PER_PAGE,
	components,
	className
}: RecentObservationsProps) => {
	const [loading, setLoading] = useState(false);
	const [observations, setObservations] = useState<any>(() => (source === DataSource.dataProp) ? data : []);

	useEffect(() => {
		if (source !== DataSource.autoLoad) {
			return;
		}
		if (!taxonId) {
			console.error("Please supply a `taxonId` prop for the `autoLoad` source prop option.");
			return;
		}
		if (!placeId) {
			console.error("Please supply a `placeId` prop for the `autoLoad` source prop option.");
			return;
		}

		(async () => {
			setLoading(true);
			const obs = await getRecentObservations({taxonId, placeId, perPage});
			setObservations(obs.results);
			setLoading(false);
		})();
	}, [source, taxonId, placeId, perPage]);

	useEffect(() => {
		if (source !== DataSource.url) {
			return;
		}

		if (!dataUrl) {
			console.error("Please supply a `dataUrl` prop for the `url` source prop option.");
			return;
		}

		(async () => {
			setLoading(true);
			const obs = await fetch(dataUrl);
			const json = await obs.json();
			setObservations(json.results);
			setLoading(false);
		})();
	}, [source, dataUrl]);

	const Load = components?.loader ? components.loader as any : Loader;
	const Label = components?.label ? components.label as any : RecentObservationLabel;

	let classes = styles.panel;
	if (className) {
		classes += ` ${className}`;
	}
	return (
		<div className={classes}>
			<Load loading={loading}/>
			<div className={styles.grid}>
				{!loading && observations.length === 0 && <NoResults/>}
				{observations.map((obs: RecentObservationData) => (
					<Observation
						key={obs.id}
						imageUrl={obs.imageUrl.replace(/square/, "medium")}
						linkUrl={obs.obsUrl}>
						<Label {...obs} />
					</Observation>
				))}
			</div>
		</div>
	);
};
