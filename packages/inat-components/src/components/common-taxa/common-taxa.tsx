import React from 'react';
import { numberWithCommas, C, CommonTaxData, getCommonTaxa, BaseComponentProps, GeneralClasses } from "../../__shared";
import { Observation } from "../observation/observation";
import Loader from "../loader/loader";
import { NoResults } from "../no-results/no-results";
import { useLoadSourceData } from "../../hooks/useLoadSourceData";
import styles from "../shared/css/general.module.scss";

export type CommonTaxaProps = BaseComponentProps & {
	year: number;
}

export const CommonTaxaLabel = (data: CommonTaxData & { classes: GeneralClasses }) => (
	<div className={styles.obsLabel}>
		<h3 className={data.classes?.observationLabelTitle}>{data.taxonCommonName || data.taxonName}</h3>
		<label className={styles.count}>{numberWithCommas(data.obsCount)}</label>
	</div>
);

export const CommonTaxa = ({
	year,
	source,
	taxonId,
	placeId,
	perPage = C.PER_PAGE,
	itemWidth = C.DEFAULT_ITEM_WIDTH,
	dataUrl,
	components,
	generalClasses,
	className,
	tabDesc
}: CommonTaxaProps) => {
	const { loading, results: taxa } = useLoadSourceData({
		taxonId,
		placeId,
		perPage,
		dataUrl,
		source,
		year,
		action: getCommonTaxa
	});

	const Load = components?.loader ? components.loader as any : Loader;
	const Label = components?.label ? components.label as any : CommonTaxaLabel;

	let elClasses = styles.panel;
	if (className) {
		elClasses += ` ${className}`;
	}
	let descClasses = styles.tabDesc;
	if (elClasses?.tabDesc) {
		descClasses += ` ${elClasses.tabDesc}`;
	}

	return (
		<div className={elClasses}>
			{tabDesc && <p className={descClasses}>{tabDesc}</p>}
			<Load loading={loading}/>
			{!loading && taxa.length === 0 && <NoResults/>}
			<div className={styles.grid} style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${itemWidth}px, 1fr))` }}>
				{taxa.map((data: CommonTaxData) => (
					<Observation
						key={data.id}
						imageUrl={data.imageUrl.replace(/square/, "medium")}
						itemWidth={itemWidth}
						linkUrl={`${C.BASE_URL}/${data.id}`}>
						<Label {...data} classes={generalClasses} />
					</Observation>
				))}
			</div>
		</div>
	)
};
