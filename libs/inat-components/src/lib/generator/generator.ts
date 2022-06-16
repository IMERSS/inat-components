/*
import fs from "fs";
import { getRecentObservations } from "../client/src/api/recentObservations";
import { getCommonTaxa } from "../client/src/api/commonTaxa";
import { getFavourites } from "../client/src/api/favourites";
import { getSummary } from "../client/src/api/summary";
import {INatApi, ConfigurationSet} from "../client/src/typings";
import {getDemoConfigurations} from "../../libs/inat-components/src/lib/taxon-panel/demo.config";
import {Configuration, INatApi} from "../../typings";
import {getCurrentYear} from "../utils/dateUtils";
*/

import fs from "fs";
import sleep from "sleep-promise";
import cliProgress from "cli-progress";
// import {Place, PLACES, Taxa, TAXA} from "../taxon-panel/demo.config";
import {Configuration, INatApi} from "../../typings";
import {getCurrentYear} from "../utils/dateUtils";

const configurationSets: ConfigurationSet[] = [
	{
		name: "Demo files",
		configurations: getDemoConfigurations()
	}
];

// TODO this ok? Nope, definitely not!
export const DEMO_BASE_URL = "http://localhost:7777";

// return the demo filename without the base URL
export const getDemoFile = (api: INatApi, taxonId: number, placeId: number, year?: string | number): string => {
	const taxonInfo = TAXA.find((i) => i.taxonId === taxonId) as Taxa;
	const placeInfo = PLACES.find((i) => i.placeId === placeId) as Place;
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

export const getDemoFileUrl = (api: INatApi, taxonId: number, placeId: number, year?: string | number) => (
	`${DEMO_BASE_URL}/${getDemoFile(api, taxonId, placeId, year)}`
);

export const getDemoConfigurations = (): Configuration[] => {
	const configurations: Configuration[] = [];

	TAXA.forEach((taxonInfo) => {
		PLACES.forEach((placeInfo) => {
			const currentYear = getCurrentYear();

			// ------------------------------------------------------------------------------------
			// Recent observations
			configurations.push({
				api: INatApi.recentObservations,
				perPage: 100,
				taxonId: taxonInfo.taxonId,
				placeId: placeInfo.placeId,
				filename: getDemoFile(INatApi.recentObservations, taxonInfo.taxonId, placeInfo.placeId)
			});

			// ------------------------------------------------------------------------------------
			// Common taxa. For this, generate the last 10 years of info plus one for all years
			const baseCommonTaxaData = {
				api: INatApi.commonTaxa,
				perPage: 100,
				taxonId: taxonInfo.taxonId,
				placeId: placeInfo.placeId,
				filename: getDemoFile(INatApi.commonTaxa, taxonInfo.taxonId, placeInfo.placeId, "all")
			};

			configurations.push({
				...baseCommonTaxaData,
				year: "all"
			})

			for (let year = currentYear - 10; year <= currentYear; year++) {
				configurations.push({
					...baseCommonTaxaData,
					filename: getDemoFile(INatApi.commonTaxa, taxonInfo.taxonId, placeInfo.placeId, year),
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
				filename: getDemoFile(INatApi.favourites, taxonInfo.taxonId, placeInfo.placeId, "all")
			};

			configurations.push({
				...baseFavouritesData,
				year: "all"
			})

			for (let year = currentYear - 10; year <= currentYear; year++) {
				configurations.push({
					...baseFavouritesData,
					filename: getDemoFile(INatApi.favourites, taxonInfo.taxonId, placeInfo.placeId, year),
					year
				});
			}

			// ------------------------------------------------------------------------------------
			// Stats
			const baseStatsData = {
				api: INatApi.stats,
				taxonId: taxonInfo.taxonId,
				placeId: placeInfo.placeId,
				filename: getDemoFile(INatApi.stats, taxonInfo.taxonId, placeInfo.placeId, "all")
			};

			configurations.push({
				...baseStatsData,
				year: "all"
			});

			for (let year = currentYear - 10; year <= currentYear; year++) {
				configurations.push({
					...baseStatsData,
					filename: getDemoFile(INatApi.stats, taxonInfo.taxonId, placeInfo.placeId, year),
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

const process = async (configurationSets) => {
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

	configurationSets.map((set) => {
		set.configurations.map((config) => {
			queue.push({ set, config });
		})
	});

	loadingBar.start(queue.length, 0);

	await processQueue();
}

// (async () => {
// 	await process();
// })();

export default process;