import * as C from "../constants";

console.log(C);

export const getSummary = async (taxonId: number, placeId: number, onSuccess: any) => {
    const observers = await getObserverSummary(taxonId, placeId);
    onSuccess({
        numObservers: observers.total_results
    });
};

export const getObserverSummary = async (taxonId: number, placeId: number) => {
    let url = `${C.BASE_API_URL}/v1/observations/observers?verifiable=true&order_by=votes&order=desc&page=1&spam=false&place_id=${placeId}&taxon_id=${taxonId}&locale=en-US&per_page=${C.PER_PAGE}`;
    const response = await fetch(url);
    return await response.json();
};
