export declare type CommonTaxaCallProps = {
    year: string | number;
    taxonId: string | number;
    placeId: string | number;
    perPage: number;
};
export declare type CommonTaxData = {
    id: number;
    imageUrl: string;
    taxonName: string;
    taxonCommonName: string;
    obsCount: number;
};
export declare type CommonTaxaRespData = {
    totalResults: number;
    results: [CommonTaxData];
};
export declare const getCommonTaxa: ({ year, taxonId, placeId, perPage }: CommonTaxaCallProps) => Promise<CommonTaxaRespData>;
