import fs from "fs";
import sleep from "sleep-promise";
import cliProgress from "cli-progress";

import {BaseComponentProps, ConfigFile, Feature, PlaceConfig, TaxaConfig} from "@imerss/shared";
import { getRecentObservations, getCommonTaxa, getFavourites, getSummary } from "@imerss/shared/api";
import { getCurrentYear, getSourceFile } from "@imerss/shared/utils";

export const getConfigurations = (config: ConfigFile): BaseComponentProps[] => {
    const configurations: any = [];

    config.taxa.forEach((taxonInfo: TaxaConfig) => {
        config.places.forEach((placeInfo: PlaceConfig) => {
            const currentYear = getCurrentYear();

            // ------------------------------------------------------------------------------------
            // Recent observations
            configurations.push({
                api: Feature.recentObservations,
                perPage: 100,
                taxonId: taxonInfo.taxonId,
                placeId: placeInfo.placeId,
                filename: getSourceFile(Feature.recentObservations, taxonInfo, placeInfo)
            });

            // ------------------------------------------------------------------------------------
            // Common taxa. For this, generate the last 10 years of info plus one for all years
            const baseCommonTaxaData = {
                api: Feature.commonTaxa,
                perPage: 100,
                taxonId: taxonInfo.taxonId,
                placeId: placeInfo.placeId,
                filename: getSourceFile(Feature.commonTaxa, taxonInfo, placeInfo, "all")
            };

            configurations.push({
                ...baseCommonTaxaData,
                year: "all"
            })

            for (let year = currentYear - 10; year <= currentYear; year++) {
                configurations.push({
                    ...baseCommonTaxaData,
                    filename: getSourceFile(Feature.commonTaxa, taxonInfo, placeInfo, year),
                    year
                });
            }

            // ------------------------------------------------------------------------------------
            // Favourites. For this, generate the last 10 years of info plus one for all years
            const baseFavouritesData = {
                api: Feature.favourites,
                perPage: 100,
                taxonId: taxonInfo.taxonId,
                placeId: placeInfo.placeId,
                filename: getSourceFile(Feature.favourites, taxonInfo, placeInfo, "all")
            };

            configurations.push({
                ...baseFavouritesData,
                year: "all"
            })

            for (let year = currentYear - 10; year <= currentYear; year++) {
                configurations.push({
                    ...baseFavouritesData,
                    filename: getSourceFile(Feature.favourites, taxonInfo, placeInfo, year),
                    year
                });
            }

            // ------------------------------------------------------------------------------------
            // Stats
            const baseStatsData = {
                api: Feature.stats,
                taxonId: taxonInfo.taxonId,
                placeId: placeInfo.placeId,
                filename: getSourceFile(Feature.stats, taxonInfo, placeInfo, "all")
            };

            configurations.push({
                ...baseStatsData,
                year: "all"
            });

            for (let year = currentYear - 10; year <= currentYear; year++) {
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
    if (config.api === Feature.recentObservations) {
        data = await getRecentObservations({
            taxonId: config.taxonId,
            placeId: config.placeId,
            perPage: config.perPage
        });
    } else if (config.api === Feature.commonTaxa) {
        data = await getCommonTaxa({
            taxonId: config.taxonId,
            placeId: config.placeId,
            perPage: config.perPage,
            year: config.year as string
        });
    } else if (config.api === Feature.favourites) {
        data = await getFavourites({
            taxonId: config.taxonId,
            placeId: config.placeId,
            perPage: config.perPage,
            year: config.year as string
        });
    } else if (config.api === Feature.stats) {
        data = await getSummary({
            taxonId: config.taxonId,
            placeId: config.placeId,
            year: config.year as string
        });
    }

    const filename = config.filename;
    const filenameWithPath = `${folder}/${filename}`;
    const content = config.minify ? JSON.stringify(data) : JSON.stringify(data, null, "\t");

    if (fs.existsSync(filenameWithPath)) {
        fs.unlinkSync(filenameWithPath);
    }
    fs.writeFileSync(filenameWithPath, content);
};

const process = async (config: ConfigFile, folder: string) => {
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

export default process;