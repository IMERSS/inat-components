import fetch from "isomorphic-unfetch";
import * as C from '../constants';

export type SummaryApiProps = {
    taxonId: number;
    placeId: number;
    year: string | number;
}

export const getSummary = async ({ taxonId, placeId, year }: SummaryApiProps): Promise<any> => {
    const observers = await getObserverSummary(taxonId, placeId, year);
    const observations = await getObservationSummary(taxonId, placeId, year);
    const seasonalityData = await getSeasonalityData(taxonId, placeId, year);

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

export const getObserverSummary = async (taxonId: number, placeId: number, year: string | number): Promise<SummaryData> => {
    let url = `${C.BASE_API_URL}/v1/observations/observers?verifiable=true&order_by=votes&order=desc&page=1&spam=false&place_id=${placeId}&taxon_id=${taxonId}&locale=en-US&per_page=10`;

    if (year !== "all") {
        url += `&d1=${year}-01-01&d2=${year}-12-31`;
    }

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

export const getObservationSummary = async(taxonId: number, placeId: number, year: string | number) => {
    let url = `${C.BASE_API_URL}/v1/observations?photos=true&per_page=1&taxon_id=${taxonId}&place_id=${placeId}&order=desc&order_by=observed_on`;
    if (year !== "all") {
        url += `&d1=${year}-01-01&d2=${year}-12-31`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return {
        totalCount: data.total_results
    };
}

export type SeasonalityData = {
    monthOfYear: {
        [monthNum: string]: number
    }
}

export const getSeasonalityData = async (taxonId: number, placeId: number, year: string | number): Promise<SeasonalityData> => {
    let url = `${C.BASE_API_URL}/v1/observations/histogram?verifiable=true&taxon_id=${taxonId}&place_id=${placeId}&locale=en-US&date_field=observed&interval=month_of_year`;
    if (year !== "all") {
        url += `&d1=${year}-01-01&d2=${year}-12-31`;
    }

    const response = await fetch(url);
    const resp = await response.json();

    return {
        monthOfYear: resp.results.month_of_year
    };
};
