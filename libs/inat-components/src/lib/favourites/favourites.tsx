import React, {useEffect, useState} from "react";
import {C, BaseComponentProps, DataSource} from "@imerss/shared";
import {getFavourites, FavouritesData} from "@imerss/shared/api";
import { formatDate } from "@imerss/shared/utils";
import {Observation} from "../observation/observation";
import Loader from "../loader/loader";
import styles from "../shared/css/general.module.scss";
import {NoResults} from "../no-results/no-results";
import generalStyles from "../shared/css/general.module.scss";

export type FavouritesProps = BaseComponentProps & {
	year: string;
}

export const FavouritesLabel = (data: FavouritesData) => (
	<div className={generalStyles.obsLabel}>
		<h3>{data.taxonCommonName || data.taxonName}</h3>
		<div>{data.observerUsername}</div>
		<div>{formatDate(data.obsDate)}</div>
		<label className={generalStyles.count}>{data.numFaves}</label>
	</div>
);

export const Favourites = ({
	year,
	source,
	taxonId,
	placeId,
	data,
	dataUrl,
	components,
	className,
	perPage = C.PER_PAGE
}: FavouritesProps) => {
	const [observations, setObservations] = useState<any>(() => (source === DataSource.dataProp) ? data : []);
	const [loading, setLoading] = useState(false);

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
			const resp = await getFavourites({taxonId, placeId, year, perPage});
			setObservations(resp.results);
			setLoading(false);
		})();
	}, [source, year, placeId, taxonId, perPage]);

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
	const Label = components?.label ? components.label as any : FavouritesLabel;

	let classes = styles.panel;
	if (className) {
		classes += ` ${className}`;
	}
	return (
		<div className={classes}>
			<Load loading={loading}/>
			{!loading && observations.length === 0 && <NoResults/>}
			<div className={generalStyles.grid}>
				{observations.map((obs: any) => (
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
