export enum DataSource {
	autoLoad = "autoLoad",
	dataProp = "dataProp",
	url = "url"
}

export enum INatApi {
	recentObservations = "recentObservations",
	commonTaxa = "commonTaxa",
	favourites = "favourites",
	stats = "stats"
}

// TODO
export type Configuration = {
	api: INatApi;
	taxonId: number;
	placeId: number;
	filename: string;
	perPage?: number;
	year?: string | number; // required for common taxa (separate type?)
	refreshTime?: number; // prob required
	minify?: boolean;
};

// export type ConfigurationSet = {
// 	name: string;
// 	configurations: Configuration[];
// }

export enum Tab {
	recent = "recent",
	commonTaxa = "commonTaxa",
	favourites = "favourites",
	stats = "stats"
}

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