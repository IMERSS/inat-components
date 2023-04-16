import { Feature, ItemConfig } from "./../../../shared";

export type UtilsConfig = {
	taxa: ItemConfig[];
	places: ItemConfig[];
	features: {
		[Feature.recentObservations]?: {
			numResults?: number;
		};
		[Feature.commonTaxa]?: {
			numResults?: number;
			numYears?: number;
		};
		[Feature.favourites]?: {
			numResults?: number;
			numYears?: number;
		};
		[Feature.stats]?: {
			numTopObservers?: number;
			numYears?: number;
		};
	}
}
