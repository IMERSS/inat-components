import React from 'react';
import { numberWithCommas, C, CommonTaxData, getCommonTaxa, BaseComponentProps, GeneralClasses } from "@imerss/inat-components-shared";
import { Observation, gridColumns } from "../observation/observation";
import Loader from "../loader/loader";
import { NoResults } from "../no-results/no-results";
import LoadError from "../error/error";
import { useLoadSourceData } from "../../hooks/useLoadSourceData";
import styles from "../shared/css/general.module.css";

export type CommonTaxaProps = BaseComponentProps & {
	year: number;
}

export const CommonTaxaLabel = (data: CommonTaxData & { classes: GeneralClasses }) => (
	<div className={styles.obsLabel}>
		<h3 className={data.classes?.observationLabelTitle}>{data.taxonCommonName || data.taxonName}</h3>
		<label className={`${data.classes?.observationCount || ''} ${styles.count}`}>{numberWithCommas(data.obsCount)}</label>
	</div>
);

export const CommonTaxa = ({
	year,
	source,
	taxonId,
	placeId,
	projectId,
	numResults = C.NUM_RESULTS,
	itemWidth = C.DEFAULT_ITEM_WIDTH,
	dataUrl,
	components,
	generalClasses,
	className,
	tabDesc
}: CommonTaxaProps) => {
	const { loading, results: taxa, error } = useLoadSourceData({
		taxonId,
		placeId,
		projectId,
		numResults,
		dataUrl,
		source,
		year,
		action: getCommonTaxa
	});

	const Load = components?.loader ? components.loader as any : Loader;
	const ErrorMessage = components?.error ? components.error as any : LoadError;
	const Label = components?.label ? components.label as any : CommonTaxaLabel;

	let elClasses = styles.panel;
	if (className) {
		elClasses += ` ${className}`;
	}
	let descClasses = styles.tabDesc;
	if (generalClasses?.tabDesc) {
		descClasses += ` ${generalClasses.tabDesc}`;
	}

	return (
		<div className={elClasses}>
			{tabDesc && <p className={descClasses}>{tabDesc}</p>}
			<Load loading={loading}/>
			{error && <ErrorMessage/>}
			{!loading && !error && taxa.length === 0 && <NoResults/>}
			<div className={styles.grid} style={{ gridTemplateColumns: gridColumns(itemWidth) }}>
				{taxa.map((data: CommonTaxData) => (
					<Observation
						key={data.id}
						imageUrl={data.imageUrl.replace(/square/, "medium")}
						linkUrl={`${C.BASE_URL}/taxa/${data.id}`}>
						<Label {...data} classes={generalClasses} />
					</Observation>
				))}
			</div>
		</div>
	)
};
