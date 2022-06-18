import {CommonTaxaRespData} from "./lib/api/common-taxa";

export enum DataSource {
	autoLoad = "autoLoad",
	dataProp = "dataProp",
	url = "url"
}

export enum Feature {
	recentObservations = "recentObservations",
	commonTaxa = "commonTaxa",
	favourites = "favourites",
	stats = "stats"
}

// I know this is duplicated, but it's very possible they could be different in future
export enum Tab {
	recent = "recent",
	commonTaxa = "commonTaxa",
	favourites = "favourites",
	stats = "stats"
}

// TODO investigate conditional types here & drop the optionals. It's pretty darn vague.
export type BaseComponentProps = {
	taxonId?: number;
	placeId?: number;
	filename?: string;
	perPage?: number;
	source?: DataSource;
	data?: CommonTaxaRespData;
	dataUrl?: string;
	components?: {
		loader?: JSX.Element;
		label?: JSX.Element;
	};
	className?: string;
};

export type TaxaConfig = {
	label: string;
	short: string;
	taxonId: number;
}

export type PlaceConfig = {
	label: string;
	short: string;
	placeId: number;
}