export declare type SummaryProps = {
    taxonId: number;
    placeId: number;
    year: string | number;
};
export declare const getSummary: ({ taxonId, placeId, year }: SummaryProps) => Promise<any>;
export declare type Observer = {
    id: number;
    userName: string;
    numObservations: number;
    iconUrl: string | null;
};
export declare type SummaryData = {
    totalCount: number;
    top: [Observer];
};
export declare const getObserverSummary: (taxonId: number, placeId: number, year: string | number) => Promise<SummaryData>;
export declare const getObservationSummary: (taxonId: number, placeId: number, year: string | number) => Promise<{
    totalCount: any;
}>;
export declare type SeasonalityData = {
    monthOfYear: {
        [monthNum: string]: number;
    };
};
export declare const getSeasonalityData: (taxonId: number, placeId: number, year: string | number) => Promise<SeasonalityData>;
