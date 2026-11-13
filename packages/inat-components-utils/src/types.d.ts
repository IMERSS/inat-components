import { Feature, ItemConfig, TaxonPanelFeatures } from "@imerss/inat-components-shared";

export type UtilsConfig = {
	// A project may be supplied in place of taxa and places - see getConfigurations in utils.ts
	taxa?: ItemConfig[];
	places?: ItemConfig[];
	project?: ItemConfig;
	// Keyed by feature, or the array of TaxonPanel's `features`, so that one config may serve both
	features: TaxonPanelFeatures | {
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
