import { Feature, ItemConfig } from "../typings";

/*
 * Note that right now the source filenames aren't configurable.
 */
export const getSourceFile = (api: Feature, taxon: ItemConfig, place: ItemConfig, year?: string | number): string => {
	if (!taxon || !place) {
		return '';
	}

	const yearStr = year === "all" ? "allyears" : year;

	let filename = "";
	if (api === Feature.recentObservations) {
		filename = `${taxon.str}-${place.str}-recent.json`;
	} else if (api === Feature.commonTaxa) {
		filename = `${taxon.str}-${place.str}-${yearStr}-commonTaxa.json`;
	} else if (api === Feature.favourites) {
		filename = `${taxon.str}-${place.str}-${yearStr}-favourites.json`;
	} else if (api === Feature.stats) {
		filename = `${taxon.str}-${place.str}-${yearStr}-stats.json`;
	}

	return filename;
};
