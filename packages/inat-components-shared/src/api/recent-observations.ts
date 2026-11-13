import fetch from "isomorphic-unfetch";
import * as C from "../constants";
import { filterParams, ObservationFilter } from "./filters";

export type RecentObservationsCallProps = ObservationFilter & {
    numResults: number;
};

export type RecentObservationData = {
    id: number;
    imageUrl: string;
    obsUrl: string;
    obsDate: string;
    taxonName: string;
    taxonCommonName: string;
    observerUsername: string;
}

export type RecentObservationsRespData = {
    totalResults: number;
    results: [RecentObservationData]
}

export const getRecentObservations = async ({ taxonId, placeId, projectId, numResults }: RecentObservationsCallProps): Promise<RecentObservationsRespData> => {
    const url = `${C.BASE_API_URL}/v1/observations?photos=true&per_page=${numResults}${filterParams({ taxonId, placeId, projectId })}&order=desc&order_by=observed_on`;
    const response = await fetch(url);
    const obs = await response.json();

    return {
        totalResults: obs.total_results,
        results: obs.results.map((obs: any) => {
            return {
                id: obs.id,
                imageUrl: obs.observation_photos[0].photo.url,
                obsUrl: obs.uri,
                obsDate: obs.observed_on_string,
                taxonName: obs?.taxon?.name || "",
                taxonCommonName: obs?.taxon.preferred_common_name,
                observerUsername: obs.user.login
            }
        })
    };
};
