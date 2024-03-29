import * as C from "../constants";
import fetch from "isomorphic-unfetch";

export type CommonTaxaCallProps = {
    year: string | number;
    taxonId: string | number;
    placeId: string | number;
    numResults: number;
};

export type CommonTaxData = {
    id: number;
    imageUrl: string;
    taxonName: string;
    taxonCommonName: string;
    obsCount: number;
}

export type CommonTaxaRespData = {
    totalResults: number;
    results: [CommonTaxData]
}

export const getCommonTaxa = async ({ year, taxonId, placeId, numResults }: CommonTaxaCallProps): Promise<CommonTaxaRespData> => {
    let url = `${C.BASE_API_URL}/v1/observations/species_counts?verifiable=true&spam=false&place_id=${placeId}&taxon_id=${taxonId}&locale=en-US&per_page=${numResults}`;
    if (year !== "all") {
        url += `&d1=${year}-01-01&d2=${year}-12-31`;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    });

    const resp = await response.json();
    const sortedTaxa = resp.results.sort((a: any, b: any) => {
        if (a.count > b.count) {
            return -1;
        } else if (a.count < b.count) {
            return 1;
        }
        return 0;
    });

    return {
        totalResults: resp.total_results,
        results: sortedTaxa.map((row: any) => ({
            id: row.taxon.id,
            imageUrl: row.taxon?.default_photo?.square_url || "",
            obsCount: row.count,
            taxonName: row.taxon.name || "",
            taxonCommonName: row.taxon.preferred_common_name
        }))
    };
};
