import * as C from "../constants";

export type CommonTaxaCallProps = {
    year: string | number;
    taxonId: string | number;
    placeId: string | number;
    perPage: number;
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

export const getCommonTaxa = async ({ year, taxonId, placeId, perPage }: CommonTaxaCallProps): Promise<any> => { //  Promise<CommonTaxaRespData>
    let url = `${C.BASE_URL}/v1/observations/species_counts?verifiable=true&spam=false&place_id=${placeId}&taxon_id=${taxonId}&locale=en-US&per_page=${perPage}`;
    if (year !== "all") {
        url += `&d1=${year}-01-01&d2=${year}-12-31`;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    });

    const sigh = await response.text();
    console.log("__________________________", sigh, "_____________________________");
    const resp = JSON.parse(sigh);

    // let resp;
    //     resp = await response.json();
    // } catch (e) {
    //     console.log("error", { e, url });
    //     return;
    // }

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
