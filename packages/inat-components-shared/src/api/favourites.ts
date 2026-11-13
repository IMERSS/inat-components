import * as C from "../constants";
import fetch from "isomorphic-unfetch";
import { filterParams, ObservationFilter } from "./filters";

export type FavouritesCallProps = ObservationFilter & {
    year: string | number;
    numResults: number;
};

export type FavouritesData = {
    id: number;
    imageUrl: string;
    taxonName: string;
    taxonCommonName: string;
    obsDate: string;
    obsUrl: string;
    observerUsername: string;
    numFaves: number;
}

export type FavouritesRespData = {
    totalResults: number;
    results: [FavouritesData]
}

export const getFavourites = async ({ year, taxonId, placeId, projectId, numResults }: FavouritesCallProps): Promise<FavouritesRespData> => {
    let url = `${C.BASE_API_URL}/v1/observations?verifiable=true&order_by=votes&order=desc&page=1&spam=false${filterParams({ taxonId, placeId, projectId })}&locale=en-US&per_page=${numResults}`;
    if (year !== "all") {
        url += `&d1=${year}-01-01&d2=${year}-12-31`;
    }

    const response = await fetch(url);
    const resp = await response.json();

    const sortedTaxa = resp.results.filter((i: any) => i.faves.length > 0).sort((a: any, b: any) => {
        if (a.faves.length > b.faves.length) {
            return -1;
        } else if (a.faves.length < b.faves.length) {
            return 1;
        }
        return 0;
    });

    return {
        totalResults: resp.total_results,
        results: sortedTaxa.map((row: any) => ({
            id: row.id,
            imageUrl: row.observation_photos[0].photo.url || "",
            obsDate: row.observed_on_string,
            obsUrl: row.uri,
            observerUsername: row.user?.login || "",
            taxonName: row.taxon.name || "",
            taxonCommonName: row.taxon.preferred_common_name,
            numFaves: row.faves.length
        }))
    };
};
