import React, {useEffect, useState} from 'react';
import {BaseComponentProps, DataSource} from "../../";
import * as C from "../../constants";
import {CommonTaxData, getCommonTaxa} from "../../api";
import {numberWithCommas} from "../../utils";
import {Observation} from "../observation/observation";
import Loader from "../loader/loader";
import Error from "../error/error";
import {NoResults} from "../no-results/no-results";
import styles from "../shared/css/general.module.scss";

export type CommonTaxaProps = BaseComponentProps & {
	year: string | number;
}

export const CommonTaxaLabel = (data: CommonTaxData) => (
	<div className={styles.obsLabel}>
		<h3>{data.taxonCommonName || data.taxonName}</h3>
		<label className={styles.count}>{numberWithCommas(data.obsCount)}</label>
	</div>
);

export const CommonTaxa = ({
	year,
	source,
	taxonId,
	placeId,
	perPage = C.PER_PAGE,
	data,
	dataUrl,
	components,
	className
}: CommonTaxaProps) => {
	const [taxa, setTaxa] = useState<any>(() => (source === DataSource.dataProp) ? data : []);
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
			const resp = await getCommonTaxa({taxonId, placeId, year, perPage});
			setTaxa(resp.results);
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
			setTaxa(json.results);
			setLoading(false);
		})();
	}, [source, dataUrl]);

	const Load = components?.loader ? components.loader as any : Loader;
	const Label = components?.label ? components.label as any : CommonTaxaLabel;
	const ErrorMsg = components?.error ? components.error as any : Error;

	let classes = styles.panel;
	if (className) {
		classes += ` ${className}`;
	}

	return (
		<div className={classes}>
			<Load loading={loading}/>
			{!loading && taxa.length === 0 && <NoResults/>}
			<div className={styles.grid}>
				{taxa.map((data: CommonTaxData) => (
					<Observation
						key={data.id}
						imageUrl={data.imageUrl.replace(/square/, "medium")}
						linkUrl={`${C.BASE_URL}/${data.id}`}>
						<Label {...data} />
					</Observation>
				))}
			</div>
		</div>
	)
};
