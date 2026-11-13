import React from "react";
import { formatDate, C, getFavourites, FavouritesData, BaseComponentProps, GeneralClasses } from "@imerss/inat-components-shared";
import { Observation, gridColumns } from "../observation/observation";
import Loader from "../loader/loader";
import { NoResults } from "../no-results/no-results";
import LoadError from "../error/error";
import { useLoadSourceData } from "../../hooks/useLoadSourceData";
import generalStyles from "../shared/css/general.module.css";

export type FavouritesProps = BaseComponentProps & {
	year: number | string;
}

export const FavouritesLabel = (data: FavouritesData & { classes: GeneralClasses }) => (
	<div className={generalStyles.obsLabel}>
		<h3 className={data.classes?.observationLabelTitle}>{data.taxonCommonName || data.taxonName}</h3>
		<div className={data.classes?.observationLabelName}>{data.observerUsername}</div>
		<div className={data.classes?.observationLabelDate}>{formatDate(data.obsDate)}</div>
		<label className={`${data.classes?.observationCount || ''} ${generalStyles.count}`}>{data.numFaves}</label>
	</div>
);

export const Favourites = ({
	year,
	source,
	taxonId,
	placeId,
	projectId,
	dataUrl,
	components,
	className,
	tabDesc,
	generalClasses,
	itemWidth = C.DEFAULT_ITEM_WIDTH,
	numResults = C.NUM_RESULTS
}: FavouritesProps) => {
	const { loading, results: observations, error } = useLoadSourceData({
		year,
		taxonId,
		placeId,
		projectId,
		numResults,
		dataUrl,
		source,
		action: getFavourites
	});
	const Load = components?.loader ? components.loader as any : Loader;
	const ErrorMessage = components?.error ? components.error as any : LoadError;
	const Label = components?.label ? components.label as any : FavouritesLabel;

	let elClasses = generalStyles.panel;
	if (className) {
		elClasses += ` ${className}`;
	}
	let descClasses = generalStyles.tabDesc;
	if (generalClasses?.tabDesc) {
		descClasses += ` ${generalClasses.tabDesc}`;
	}
	return (
		<div className={elClasses}>
			{tabDesc && <p className={descClasses}>{tabDesc}</p>}
			<Load loading={loading}/>
			{error && <ErrorMessage/>}
			{!loading && !error && observations.length === 0 && <NoResults/>}
			<div className={generalStyles.grid} style={{ gridTemplateColumns: gridColumns(itemWidth) }}>
				{observations.map((obs: any) => (
					<Observation
						key={obs.id}
						imageUrl={obs.imageUrl.replace(/square/, "medium")}
						linkUrl={obs.obsUrl}>
						<Label {...obs} classes={generalClasses} />
					</Observation>
				))}
			</div>
		</div>
	);
};
