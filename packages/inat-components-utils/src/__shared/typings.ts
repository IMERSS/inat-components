export enum Feature {
	commonTaxa = "commonTaxa",
	favourites = "favourites",
	recentObservations = "recentObservations",
	stats = "stats"
}

export enum DataSourceEnum {
	autoLoad = "autoLoad",
	url = "url"
}

export type DataSource = `${DataSourceEnum}`;

// used for places + taxons
export type ItemConfig = {
	id: number;
	str: string;
}

export type GeneralClasses = {
	tabsElement?: string;
	yearsDropdown?: string;
	pageHeadings?: string;
	tabDesc?: string;
	observationLabelTitle?: string;
	observationLabelDate?: string;
	observationLabelName?: string;
}

export type BaseComponentProps = {
	taxonId?: number;
	placeId?: number;
	perPage?: number;
	source?: DataSource;
	dataUrl?: string;
	className?: string;
	itemWidth?: number;
	components?: {
		label?: any;
		error?: any;
		loader?: any;
	};
	generalClasses?: GeneralClasses;
	tabDesc?: string;
};

// export type TabDescs = {
// 	recentDesc?: string;
// 	mostCommonDesc?: string;
// 	mostFavouritedDesc?: string;
// 	generalStatsDesc?: string;
// }
