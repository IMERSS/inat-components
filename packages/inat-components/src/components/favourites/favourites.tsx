import React from "react";
import { formatDate, C, getFavourites, FavouritesData, BaseComponentProps, GeneralClasses } from "../../../../../shared";
import { Observation } from "../observation/observation";
import Loader from "../loader/loader";
import { NoResults } from "../no-results/no-results";
import { useLoadSourceData } from "../../hooks/useLoadSourceData";
import generalStyles from "../__shared/css/general.module.scss";

export type FavouritesProps = BaseComponentProps & {
	year: number;
}

export const FavouritesLabel = (data: FavouritesData & { classes: GeneralClasses }) => (
	<div className={generalStyles.obsLabel}>
		<h3 className={data.classes?.observationLabelTitle}>{data.taxonCommonName || data.taxonName}</h3>
		<div className={data.classes?.observationLabelTitle}>{data.observerUsername}</div>
		<div className={data.classes?.observationLabelDate}>{formatDate(data.obsDate)}</div>
		<label className={generalStyles.count}>{data.numFaves}</label>
	</div>
);

export const Favourites = ({
	year,
	source,
	taxonId,
	placeId,
	dataUrl,
	components,
	className,
	tabDesc,
	generalClasses,
	itemWidth = C.DEFAULT_ITEM_WIDTH,
	perPage = C.PER_PAGE
}: FavouritesProps) => {
	const { loading, results: observations } = useLoadSourceData({
		year,
		taxonId,
		placeId,
		perPage,
		dataUrl,
		source,
		action: getFavourites
	});
	const Load = components?.loader ? components.loader as any : Loader;
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
			{!loading && observations.length === 0 && <NoResults/>}
			<div className={generalStyles.grid} style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${itemWidth}px, 1fr))` }}>
				{observations.map((obs: any) => (
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
