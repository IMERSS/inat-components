import * as C from "../constants";


export const getSummary = async (taxonId: number, placeId: number): Promise<any> => {
    const observers = await getObserverSummary(taxonId, placeId);
    const observations = await getObservationSummary(taxonId, placeId);
    const seasonalityData = await getTaxonHistogramData(taxonId, placeId);

    return {
        observers,
        observations,
        seasonalityData
    };
};

export type Observer = {
    id: number;
    userName: string;
    numObservations: number;
    iconUrl: string | null;
}
export type SummaryData = {
    totalCount: number;
    top: [Observer];
}

export const getObserverSummary = async (taxonId: number, placeId: number): Promise<SummaryData> => {
    let url = `${C.BASE_API_URL}/v1/observations/observers?verifiable=true&order_by=votes&order=desc&page=1&spam=false&place_id=${placeId}&taxon_id=${taxonId}&locale=en-US&per_page=10`;
    const response = await fetch(url);
    const data = await response.json();

    return {
        totalCount: data.total_results,
        top: data.results.map((result: any) => ({
            id: result.user.id,
            userName: result.user.login,
            numObservations: result.observation_count,
            iconUrl: result.user.icon_url
        }))
    };
};

export const getObservationSummary = async(taxonId: number, placeId: number) => {
    const url = `${C.BASE_API_URL}/v1/observations?photos=true&per_page=1&taxon_id=${taxonId}&place_id=${placeId}&order=desc&order_by=observed_on`;
    const response = await fetch(url);
    const data = await response.json();

    return {
        totalCount: data.total_results
    };
}

export const getTaxonHistogramData = async (taxonId: number, placeId: number): Promise<any> => {
    let url = `${C.BASE_API_URL}/v1/observations/histogram?verifiable=true&taxon_id=${taxonId}&place_id=${placeId}&locale=en-US&date_field=observed&interval=month_of_year`;

    const response = await fetch(url);
    const resp = await response.json();

    return {
        monthOfYear: resp.results.month_of_year
    };
};
