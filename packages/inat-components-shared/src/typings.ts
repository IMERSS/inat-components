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

// used for places, taxons and projects. `id` may be a single id, or a comma-separated list of them, e.g.
// "154453,81137", matching any of them. `str` names the files of a "url" data source - see getSourceFile
export type ItemConfig = {
	id: number | string;
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
	observationCount?: string;
}

export type BaseComponentProps = {
	taxonId?: number | string;
	placeId?: number | string;
	projectId?: number | string;
	numResults?: number;
	source?: DataSource;
	dataUrl?: string;
	className?: string;
	itemWidth?: number;
	// Replacements for the components which render a result's label, the message shown when results could not be
	// loaded, and the indicator shown while they load
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
