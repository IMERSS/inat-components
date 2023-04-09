export enum Feature {
	commonTaxa = "commonTaxa",
	favourites = "favourites",
	recentObservations = "recentObservations",
	stats = "stats"
}

export enum DataSource {
	autoLoad = "autoLoad",
	url = "url"
}

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
	// observersList?: string;
	// statsCountSummary?: string;
};

export type BaseComponentProps = {
	taxonId?: number;
	placeId?: number;
//	filename?: string;
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
