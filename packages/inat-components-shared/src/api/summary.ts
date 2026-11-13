import fetch from "isomorphic-unfetch";
import * as C from '../constants';
import { filterParams, ObservationFilter } from "./filters";

export type SummaryApiProps = ObservationFilter & {
    year: string | number;
    numTopObservers?: number;
}

export const getSummary = async ({ taxonId, placeId, projectId, year, numTopObservers = C.DEFAULT_NUM_TOP_OBSERVERS }: SummaryApiProps): Promise<any> => {
    const filter = { taxonId, placeId, projectId };
    const observers = await getObserverSummary(filter, year, numTopObservers);
    const observations = await getObservationSummary(filter, year);
    const seasonalityData = await getSeasonalityData(filter, year);

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

export const getObserverSummary = async (filter: ObservationFilter, year: string | number, numTopObservers = C.DEFAULT_NUM_TOP_OBSERVERS): Promise<SummaryData> => {
    let url = `${C.BASE_API_URL}/v1/observations/observers?verifiable=true&order_by=votes&order=desc&page=1&spam=false${filterParams(filter)}&locale=en-US&per_page=${numTopObservers}`;

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

export const getObservationSummary = async(filter: ObservationFilter, year: string | number) => {
    let url = `${C.BASE_API_URL}/v1/observations?photos=true&per_page=1${filterParams(filter)}&order=desc&order_by=observed_on`;
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

export const getSeasonalityData = async (filter: ObservationFilter, year: string | number): Promise<SeasonalityData> => {
    let url = `${C.BASE_API_URL}/v1/observations/histogram?verifiable=true${filterParams(filter)}&locale=en-US&date_field=observed&interval=month_of_year`;
    if (year !== "all") {
        url += `&d1=${year}-01-01&d2=${year}-12-31`;
    }

    const response = await fetch(url);
    const resp = await response.json();

    return {
        monthOfYear: resp.results.month_of_year
    };
};
