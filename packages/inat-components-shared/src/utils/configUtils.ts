import { Feature, ItemConfig } from "../typings";

/*
 * Note that right now the source filenames aren't configurable. A file is named by the `str` of each of the taxon,
 * place and project which are supplied, in that order - so that the names of files for a taxon and a place are as they
 * were before projects could be supplied.
 */
export const getSourceFile = (api: Feature, taxon: ItemConfig | undefined, place: ItemConfig | undefined, year?: string | number,
	project?: ItemConfig): string => {
	if (!project && (!taxon || !place)) {
		return '';
	}

	const yearStr = year === "all" ? "allyears" : year;
	const stem = [taxon, place, project].filter(item => item).map(item => item!.str).join("-");

	let filename = "";
	if (api === Feature.recentObservations) {
		filename = `${stem}-recent.json`;
	} else if (api === Feature.commonTaxa) {
		filename = `${stem}-${yearStr}-commonTaxa.json`;
	} else if (api === Feature.favourites) {
		filename = `${stem}-${yearStr}-favourites.json`;
	} else if (api === Feature.stats) {
		filename = `${stem}-${yearStr}-stats.json`;
	}

	return filename;
};
