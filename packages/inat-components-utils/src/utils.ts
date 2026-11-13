import fs from "fs";
import { UtilsConfig } from "./types";
import sleep from "sleep-promise";
import cliProgress from "cli-progress";
import {
	C,
	BaseComponentProps,
	Feature,
	ItemConfig,
	getRecentObservations,
	getCommonTaxa,
	getFavourites,
	getSummary,
	getCurrentYear,
	getSourceFile
} from "@imerss/inat-components-shared";

/**
 * The settings of each feature, keyed by feature. They may be given so, or as the array of TaxonPanel's `features`,
 * so that one config may serve both TaxonPanel and this script.
 */
const getFeatureSettings = (features: any): any => {
	let settings = features || {};
	if (Array.isArray(features)) {
		settings = {};
		features.forEach(({ feature, ...other }) => {
			settings[feature] = other;
		});
	}
	return settings;
};

/**
 * The years for which files are generated - the current year and those before it, `numYears` in all, matching the
 * years which TaxonPanel's year dropdown offers.
 */
const getYears = (numYears: number = C.DEFAULT_NUM_YEARS): number[] => {
	const currentYear = getCurrentYear();
	const years: number[] = [];
	for (let year = currentYear - numYears + 1; year <= currentYear; year++) {
		years.push(year);
	}
	return years;
};

export const getConfigurations = (config: any): BaseComponentProps[] => {
	const configurations: any = [];
	const features = getFeatureSettings(config.features);
	// A project, whose own rules on iNaturalist choose its observations, may be supplied in place of taxa and places,
	// or as well as them, narrowing its observations to each taxon and place in turn
	const project: ItemConfig | undefined = config.project;
	const taxa: (ItemConfig | undefined)[] = config.taxa?.length ? config.taxa : (project ? [undefined] : []);
	const places: (ItemConfig | undefined)[] = config.places?.length ? config.places : (project ? [undefined] : []);

	taxa.forEach((taxonInfo) => {
		places.forEach((placeInfo) => {
			// Recent observations
			configurations.push({
				api: Feature.recentObservations,
				numResults: features.recentObservations?.numResults || C.NUM_RESULTS,
				taxonId: taxonInfo?.id,
				placeId: placeInfo?.id,
				projectId: project?.id,
				filename: getSourceFile(Feature.recentObservations, taxonInfo, placeInfo, undefined, project)
			});

			// Common taxa
			const baseCommonTaxaData = {
				api: Feature.commonTaxa,
				numResults: features.commonTaxa?.numResults || C.NUM_RESULTS,
				taxonId: taxonInfo?.id,
				placeId: placeInfo?.id,
				projectId: project?.id,
				filename: getSourceFile(Feature.commonTaxa, taxonInfo, placeInfo, "all", project)
			};

			configurations.push({
				...baseCommonTaxaData,
				year: "all"
			})

			getYears(features.commonTaxa?.numYears).forEach((year) => {
				configurations.push({
					...baseCommonTaxaData,
					filename: getSourceFile(Feature.commonTaxa, taxonInfo, placeInfo, year, project),
					year
				});
			});

			// Favourites, for all years together and for each year
			const baseFavouritesData = {
				api: Feature.favourites,
				numResults: features.favourites?.numResults || C.NUM_RESULTS,
				taxonId: taxonInfo?.id,
				placeId: placeInfo?.id,
				projectId: project?.id,
				filename: getSourceFile(Feature.favourites, taxonInfo, placeInfo, "all", project)
			};

			configurations.push({
				...baseFavouritesData,
				year: "all"
			})

			getYears(features.favourites?.numYears).forEach((year) => {
				configurations.push({
					...baseFavouritesData,
					filename: getSourceFile(Feature.favourites, taxonInfo, placeInfo, year, project),
					year
				});
			});

			// Stats
			const baseStatsData = {
				api: Feature.stats,
				numTopObservers: features.stats?.numTopObservers,
				taxonId: taxonInfo?.id,
				placeId: placeInfo?.id,
				projectId: project?.id,
				filename: getSourceFile(Feature.stats, taxonInfo, placeInfo, "all", project)
			};

			configurations.push({
				...baseStatsData,
				year: "all"
			});

			getYears(features.stats?.numYears).forEach((year) => {
				configurations.push({
					...baseStatsData,
					filename: getSourceFile(Feature.stats, taxonInfo, placeInfo, year, project),
					year
				});
			});
		});
	});

	return configurations;
};

const generateFile = async (config, folder) => {
	let data;
	const { taxonId, placeId, projectId, numResults, numTopObservers, year } = config;

	try {
		if (config.api === Feature.recentObservations) {
			data = await getRecentObservations({ taxonId, placeId, projectId, numResults });
		} else if (config.api === Feature.commonTaxa) {
			data = await getCommonTaxa({ taxonId, placeId, projectId, numResults, year });
		} else if (config.api === Feature.favourites) {
			data = await getFavourites({ taxonId, placeId, projectId, numResults, year });
		} else if (config.api === Feature.stats) {
			data = await getSummary({ taxonId, placeId, projectId, year, numTopObservers });
		}
	} catch (e) {
		console.log("ERROR -- [", config.api, "]", e);
		return;
	}

	const filename = config.filename;
	const filenameWithPath = `${folder}/${filename}`;
	const content = config.minify ? JSON.stringify(data) : JSON.stringify(data, null, "\t");

	if (fs.existsSync(filenameWithPath)) {
		fs.unlinkSync(filenameWithPath);
	}
	fs.writeFileSync(filenameWithPath, content);
};

/**
 * Generate the data files for a config, writing them into `folder`. Requests are made a second apart, to keep within
 * iNaturalist's limits on its API.
 */
export const generate = async (config: UtilsConfig, folder: string) => {
	let currentIndex = 0;
	const loadingBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

	const processQueue = async () => {
		await generateFile(queue[currentIndex], folder);
		loadingBar.update(currentIndex);
		currentIndex++;
		await sleep(1000);

		if (currentIndex < queue.length) {
			await processQueue();
		} else {
			loadingBar.stop();
		}
	};

	const queue = getConfigurations(config);
	loadingBar.start(queue.length, 0);

	await processQueue();
};

// The name by which the script was first exported
export const process = generate;
