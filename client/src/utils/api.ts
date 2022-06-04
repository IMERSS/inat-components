import * as C from "../constants";

// purpose of these methods is to normalize the data from both sources: raw iNat data or from our proxy layer
export type RecentObservationsCallProps = {
    taxonId: string | number;
    placeId: string | number;
    perPage: number;
    onSuccess: any;
};

export const getRecentObservations = async ({ taxonId, placeId, perPage, onSuccess }: RecentObservationsCallProps) => {
    const url = `${C.BASE_URL}/v1/observations?photos=true&per_page=${perPage}&taxon_id=${taxonId}&place_id=${placeId}&order=desc&order_by=observed_on`;
    const response = await fetch(url);
    const obs = await response.json();

    console.log(obs);

    onSuccess(obs.results);
};

export const getCommonTaxa = async (taxonId: number, placeId: number, year: string, onSuccess: any) => {
    let url = `${C.BASE_URL}/v1/observations/species_counts?verifiable=true&spam=false&place_id=${placeId}&taxon_id=${taxonId}&locale=en-US&per_page=${C.PER_PAGE}`;
    if (year !== "all") {
        url += `&d1=${year}-01-01&d2=${year}-12-31`;
    }

    const response = await fetch(url);
    const resp = await response.json();
    const sortedTaxa = resp.results.sort((a: any, b: any) => {
        if (a.taxon.observations_count > b.taxon.observations_count) {
            return -1;
        } else if (a.taxon.observations_count < b.taxon.observations_count) {
            return 1;
        }
        return 0;
    });

    onSuccess(sortedTaxa);
}

export const getFavourites = async (taxonId: number, placeId: number, year: string, onSuccess: any) => {
    let url = `${C.BASE_URL}/v1/observations?verifiable=true&order_by=votes&order=desc&page=1&spam=false&place_id=${placeId}&taxon_id=${taxonId}&locale=en-US&per_page=${C.PER_PAGE}`;
    if (year) {
        url += `&d1=${year}-01-01&d1=${year}-12-31`;
    }
    const response = await fetch(url);
    const obs = await response.json();

    onSuccess(obs.results);
}

export const getSummary = async (taxonId: number, placeId: number, onSuccess: any) => {
    const observers = await getObserverSummary(taxonId, placeId);
    onSuccess({
        numObservers: observers.total_results
    });
};

export const getObserverSummary = async (taxonId: number, placeId: number) => {
    let url = `${C.BASE_URL}/v1/observations/observers?verifiable=true&order_by=votes&order=desc&page=1&spam=false&place_id=${placeId}&taxon_id=${taxonId}&locale=en-US&per_page=${C.PER_PAGE}`;
    const response = await fetch(url);
    return await response.json();
};
