export declare type FavouritesCallProps = {
    year: string | number;
    taxonId: string | number;
    placeId: string | number;
    perPage: number;
};
export declare type FavouritesData = {
    id: number;
    imageUrl: string;
    taxonName: string;
    taxonCommonName: string;
    obsDate: string;
    obsCount: number;
    observerUsername: string;
    numFaves: number;
};
export declare type FavouritesRespData = {
    totalResults: number;
    results: [FavouritesData];
};
export declare const getFavourites: ({ year, taxonId, placeId, perPage }: FavouritesCallProps) => Promise<FavouritesRespData>;
