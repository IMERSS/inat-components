import * as C from "../constants";


export const getRecentObservations = async (taxonId: string, placeId: string, onSuccess: any) => {
    const url = `${C.BASE_URL}/v1/observations?photos=true&per_page=${C.PER_PAGE}&taxon_id=${taxonId}&place_id=${placeId}&order=desc&order_by=observed_on`;
    const response = await fetch(url);
    const obs = await response.json();

    onSuccess(obs.results);
};
