export enum DataSource {
	autoLoad = "autoLoad",
	url = "url"
}

export enum Feature {
	commonTaxa = "commonTaxa",
	favourites = "favourites",
	recentObservations = "recentObservations",
	stats = "stats"
}

// I know this is duplicated, but it's very possible they could be different in future
export enum Tab {
	recent = "recent",
	commonTaxa = "commonTaxa",
	favourites = "favourites",
	stats = "stats"
}

// export type BaseClasses = {
// 	recentObservationsPanel?: string;
// 	commonTaxaPanel?: string;
// 	favouritesPanel?: string;
// 	statsPanel?: string;
// }

export type BaseComponentProps = {
	taxonId?: number;
	placeId?: number;
	filename?: string;
	perPage?: number;
	source?: DataSource;
	data?: any;
	dataUrl?: string;
	className?: string;
	itemWidth?: number;
	components?: {
		label?: any;
		error?: any;
		loader?: any;
	};
	classes?: BaseClasses;
	tabDesc?: string;
};

export type TabDescs = {
	recentDesc?: string;
	mostCommonDesc?: string;
	mostFavouritedDesc?: string;
	generalStatsDesc?: string;
}
