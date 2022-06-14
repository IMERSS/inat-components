/**
 * These options are used for both the demo UI and for the scripting code to generate static JSON files of the
 * content needed for the various components. To change the demo content just alter the TAXA and PLACES content here
 * and re-run `yarn generate` in repo root to get the latest static JSON content.
 */
import {Configuration, INatApi} from "../../typings";
import {getCurrentYear} from "../utils/dateUtils";

export type Taxa = {
    label: string;
    short: string;
    taxonId: number;
}
export type Place = {
    label: string;
    short: string;
    placeId: number;
}

export const TAXA: Taxa[] = [
    { label: "Butterflies and moth", short: "leps", taxonId: 47157 },
    { label: "Beetles", short: "beetles", taxonId: 47208 },
    { label: "Birds", short: "birds", taxonId: 3 }
];

export const PLACES: Place[] = [
    { label: "BC", short: "bc", placeId: 7085 },
    { label: "Alberta", short: "alberta", placeId: 6834 }
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