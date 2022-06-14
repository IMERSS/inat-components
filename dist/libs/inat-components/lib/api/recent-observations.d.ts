export declare type RecentObservationsCallProps = {
    taxonId: string | number;
    placeId: string | number;
    perPage: number;
};
export declare type RecentObservationData = {
    id: number;
    imageUrl: string;
    obsUrl: string;
    obsDate: string;
    taxonName: string;
    taxonCommonName: string;
    observerUsername: string;
};
export declare type RecentObservationsRespData = {
    totalResults: number;
    results: [RecentObservationData];
};
export declare const getRecentObservations: ({ taxonId, placeId, perPage }: RecentObservationsCallProps) => Promise<RecentObservationsRespData>;
