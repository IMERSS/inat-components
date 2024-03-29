import fs from "fs" ;
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
} from "./__shared";

export const getConfigurations = (config: any): BaseComponentProps[] => {
	const configurations: any = [];

	config.taxa.forEach((taxonInfo: ItemConfig) => {
		config.places.forEach((placeInfo: ItemConfig) => {
			const currentYear = getCurrentYear();

			// Recent observations
			configurations.push({
				api: Feature.recentObservations,
				perPage: config.features?.recentObservations?.numResults || C.NUM_RESULTS,
				taxonId: taxonInfo.id,
				placeId: placeInfo.id,
				filename: getSourceFile(Feature.recentObservations, taxonInfo, placeInfo)
			});

			// Common taxa
			const baseCommonTaxaData = {
				api: Feature.commonTaxa,
				perPage: config.features?.commonTaxa?.numResults || C.NUM_RESULTS,
				taxonId: taxonInfo.id,
				placeId: placeInfo.id,
				filename: getSourceFile(Feature.commonTaxa, taxonInfo, placeInfo, "all")
			};

			configurations.push({
				...baseCommonTaxaData,
				year: "all"
			})

			const numCommonTaxaYears = config.features?.commonTaxa?.numYears || C.DEFAULT_NUM_YEARS;
			for (let year = currentYear - numCommonTaxaYears; year <= currentYear; year++) {
				configurations.push({
					...baseCommonTaxaData,
					filename: getSourceFile(Feature.commonTaxa, taxonInfo, placeInfo, year),
					year
				});
			}

			// Favourites. For this, generate the last 10 years of info plus one for all years
			const baseFavouritesData = {
				api: Feature.favourites,
				perPage: config.features?.favourites?.numResults || C.NUM_RESULTS,
				taxonId: taxonInfo.id,
				placeId: placeInfo.id,
				filename: getSourceFile(Feature.favourites, taxonInfo, placeInfo, "all")
			};

			configurations.push({
				...baseFavouritesData,
				year: "all"
			})

			const numFavouritesYears = config.features?.favourites?.numYears || C.DEFAULT_NUM_YEARS;
			for (let year = currentYear - numFavouritesYears; year <= currentYear; year++) {
				configurations.push({
					...baseFavouritesData,
					filename: getSourceFile(Feature.favourites, taxonInfo, placeInfo, year),
					year
				});
			}

			// Stats
			const baseStatsData = {
				api: Feature.stats,
				taxonId: taxonInfo.id,
				placeId: placeInfo.id,
				filename: getSourceFile(Feature.stats, taxonInfo, placeInfo, "all")
			};

			configurations.push({
				...baseStatsData,
				year: "all"
			});

			const numStatsYears = config.features?.stats?.numYears || C.DEFAULT_NUM_YEARS;
			for (let year = currentYear - numStatsYears; year <= currentYear; year++) {
				configurations.push({
					...baseStatsData,
					filename: getSourceFile(Feature.stats, taxonInfo, placeInfo, year),
					year
				});
			}
		});
	});

	return configurations;
};

const generateFile = async (config, folder) => {
	let data;
	const { taxonId, placeId, numResults, year } = config;

	try {
		if (config.api === Feature.recentObservations) {
			data = await getRecentObservations({ taxonId, placeId, numResults });
		} else if (config.api === Feature.commonTaxa) {
			data = await getCommonTaxa({ taxonId, placeId, numResults, year });
		} else if (config.api === Feature.favourites) {
			data = await getFavourites({ taxonId, placeId, numResults, year });
		} else if (config.api === Feature.stats) {
			data = await getSummary({ taxonId, placeId, year });
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

// TODO types
export const process = async (config: any, folder: string) => {
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
}
