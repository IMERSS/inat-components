import {INatApi, PlaceConfig, TaxaConfig} from "../../typings";

/*
 * Right now the generated source filenames aren't configurable.
 */
export const getSourceFile = (api: INatApi, taxonInfo: TaxaConfig, placeInfo: PlaceConfig, year?: string | number): string => {
	const yearStr = year === "all" ? "allyears" : year;

	let filename = "";
	if (api === INatApi.recentObservations) {
		filename = `${taxonInfo.short}-${placeInfo.short}-recent.json`;
	} else if (api === INatApi.commonTaxa) {
		filename = `${taxonInfo.short}-${placeInfo.short}-${yearStr}-commonTaxa.json`;
	} else if (api === INatApi.favourites) {
		filename = `${taxonInfo.short}-${placeInfo.short}-${yearStr}-favourites.json`;
	} else if (api === INatApi.stats) {
		filename = `${taxonInfo.short}-${placeInfo.short}-${yearStr}-stats.json`;
	}

	return filename;
};
