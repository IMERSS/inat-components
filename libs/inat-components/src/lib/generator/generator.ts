/*
import {INatApi, ConfigurationSet} from "../client/src/typings";
import {Configuration, INatApi} from "../../typings";
import {getCurrentYear} from "../utils/dateUtils";
*/

import fs from "fs";
import sleep from "sleep-promise";
import cliProgress from "cli-progress";
import { getRecentObservations } from "../api/recent-observations";
import { getCommonTaxa } from "../api/common-taxa";
import { getFavourites } from "../api/favourites";
import { getSummary } from "../api/summary";
import {Configuration, INatApi} from "../../typings";
import {getCurrentYear} from "../utils/date-utils";
import {getSourceFile} from "../utils/config-utils";


export const getConfigurations = (config: any): Configuration[] => {
	const configurations: Configuration[] = [];

	config.taxa.forEach((taxonInfo: any) => {
		config.places.forEach((placeInfo: any) => {
			const currentYear = getCurrentYear();

			// ------------------------------------------------------------------------------------
			// Recent observations
			configurations.push({
				api: INatApi.recentObservations,
				perPage: 100,
				taxonId: taxonInfo.taxonId,
				placeId: placeInfo.placeId,
				filename: getSourceFile(INatApi.recentObservations, taxonInfo.taxonId, placeInfo.placeId)
			});

			// ------------------------------------------------------------------------------------
			// Common taxa. For this, generate the last 10 years of info plus one for all years
			const baseCommonTaxaData = {
				api: INatApi.commonTaxa,
				perPage: 100,
				taxonId: taxonInfo.taxonId,
				placeId: placeInfo.placeId,
				filename: getSourceFile(INatApi.commonTaxa, taxonInfo.taxonId, placeInfo.placeId, "all")
			};

			configurations.push({
				...baseCommonTaxaData,
				year: "all"
			})

			for (let year = currentYear - 10; year <= currentYear; year++) {
				configurations.push({
					...baseCommonTaxaData,
					filename: getSourceFile(INatApi.commonTaxa, taxonInfo.taxonId, placeInfo.placeId, year),
					year
				});
			}

			// ------------------------------------------------------------------------------------
			// Favourites. For this, generate the last 10 years of info plus one for all years
			const baseFavouritesData = {
				api: INatApi.favourites,
				perPage: 100,
				taxonId: taxonInfo.taxonId,
				placeId: placeInfo.placeId,
				filename: getSourceFile(INatApi.favourites, taxonInfo.taxonId, placeInfo.placeId, "all")
			};

			configurations.push({
				...baseFavouritesData,
				year: "all"
			})

			for (let year = currentYear - 10; year <= currentYear; year++) {
				configurations.push({
					...baseFavouritesData,
					filename: getSourceFile(INatApi.favourites, taxonInfo.taxonId, placeInfo.placeId, year),
					year
				});
			}

			// ------------------------------------------------------------------------------------
			// Stats
			const baseStatsData = {
				api: INatApi.stats,
				taxonId: taxonInfo.taxonId,
				placeId: placeInfo.placeId,
				filename: getSourceFile(INatApi.stats, taxonInfo.taxonId, placeInfo.placeId, "all")
			};

			configurations.push({
				...baseStatsData,
				year: "all"
			});

			for (let year = currentYear - 10; year <= currentYear; year++) {
				configurations.push({
					...baseStatsData,
					filename: getSourceFile(INatApi.stats, taxonInfo.taxonId, placeInfo.placeId, year),
					year
				});
			}
		});
	});

	return configurations;
};

const generateFile = async ({ config, set }: any) => {
	let data;
	if (config.api === INatApi.recentObservations) {
		data = await getRecentObservations({
			taxonId: config.taxonId,
			placeId: config.placeId,
			perPage: config.perPage
		});
	} else if (config.api === INatApi.commonTaxa) {
		data = await getCommonTaxa({
			taxonId: config.taxonId,
			placeId: config.placeId,
			perPage: config.perPage,
			year: config.year as string
		});
	} else if (config.api === INatApi.favourites) {
		data = await getFavourites({
			taxonId: config.taxonId,
			placeId: config.placeId,
			perPage: config.perPage,
			year: config.year as string
		});
	} else if (config.api === INatApi.stats) {
		data = await getSummary({
			taxonId: config.taxonId,
			placeId: config.placeId,
			year: config.year as string
		});
	}

	const filename = `${set.filenamePrefix}${config.filename}`;
	const filenameWithPath = `${__dirname}/public/${filename}`;
	const content = config.minify ? JSON.stringify(data) : JSON.stringify(data, null, "\t");

	if (fs.existsSync(filenameWithPath)) {
		fs.unlinkSync(filenameWithPath);
	}
	fs.writeFileSync(filenameWithPath, content);
};

const process = async (config: any) => {
	const queue: any = [];
	let currentIndex = 0;

	const loadingBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

	const processQueue = async () => {
		await generateFile(queue[currentIndex]);
		loadingBar.update(currentIndex);
		currentIndex++;
		await sleep(1000);

		if (currentIndex < queue.length) {
			await processQueue();
		} else {
			loadingBar.stop();
		}
	};

	const configurations = getConfigurations(config);

	console.log(configurations);
	return;

	// configurations.map((set) => {
	// 	set.configurations.map((config) => {
	// 		queue.push({ set, config });
	// 	})
	// });

	loadingBar.start(queue.length, 0);

	await processQueue();
}

// (async () => {
// 	await process();
// })();

export default process;