/**
 * These options are used for both the demo UI and for the scripting code to generate static JSON files of the
 * content needed for the various components. To change the demo content just alter the TAXA and PLACES content here
 * and re-run `yarn generate` in repo root to get the latest static JSON content.
 */
import {Configuration, INatApi} from "../typings";

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
    { label: "Flies", short: "flies", taxonId: 47822 },
    { label: "Birds", short: "birds", taxonId: 3 }
];

export const PLACES: Place[] = [
    { label: "BC", short: "bc", placeId: 7085 },
    { label: "Alberta", short: "alberta", placeId: 6834 }
];

export const DEMO_BASE_URL = "http://localhost:7777";

// return the demo filename without the base URL
export const getDemoFile = (api: INatApi, taxonId: number, placeId: number): string => {
    const taxonInfo = TAXA.find((i) => i.taxonId === taxonId) as Taxa;
    const placeInfo = PLACES.find((i) => i.placeId === placeId) as Place;

    let filename = "";
    if (api === INatApi.recentObservations) {
        filename = `${taxonInfo.short}-${placeInfo.short}-recent.json`;
    } else if (api === INatApi.commonTaxa) {
        filename = `${taxonInfo.short}-${placeInfo.short}-commonTaxa.json`;
    }

    return filename;
};

export const getDemoFileUrl = (api: INatApi, taxonId: number, placeId: number) => `${DEMO_BASE_URL}/${getDemoFile(api, taxonId, placeId)}`;

export const getDemoConfigurations = (): Configuration[] => {
    const configurations: Configuration[] = [];

    TAXA.forEach((taxonInfo) => {
        PLACES.forEach((placeInfo) => {

            // recent observations
            configurations.push({
                api: INatApi.recentObservations,
                perPage: 100,
                taxonId: taxonInfo.taxonId,
                placeId: placeInfo.placeId,
                filename: getDemoFile(INatApi.recentObservations, taxonInfo.taxonId, placeInfo.placeId)
            });

            // common taxa
            configurations.push({
                api: INatApi.commonTaxa,
                perPage: 100,
                taxonId: taxonInfo.taxonId,
                placeId: placeInfo.placeId,
                filename: getDemoFile(INatApi.recentObservations, taxonInfo.taxonId, placeInfo.placeId)
            });
        });
    });

    return configurations;
};
