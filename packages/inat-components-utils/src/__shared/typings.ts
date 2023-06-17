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
	numResults?: number;
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

export type RecentObservationsConfig = {
	feature: Feature.recentObservations,
	title?: string;
	numResults?: number;
	desc?: string;
	className?: string;
}
export type CommonTaxaConfig = {
	feature: Feature.commonTaxa,
	title?: string;
	numResults?: number;
	numYears?: number;
	desc?: string;
	className?: string;
}
export type FavouritesConfig = {
	feature: Feature.favourites;
	title?: string;
	numResults?: number;
	numYears?: number;
	desc?: string;
	className?: string;
}
export type StatsConfig = {
	feature: Feature.stats;
	title?: string;
	numTopObservers?: number;
	numYears?: number;
	desc?: string;
	className?: string;
	observersListClass?: string;
	statsCountSummaryClass?: string;
};

export type TaxonPanelFeatures = (RecentObservationsConfig|CommonTaxaConfig|FavouritesConfig|StatsConfig)[];
