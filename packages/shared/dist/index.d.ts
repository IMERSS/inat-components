declare type CommonTaxaCallProps = {
    year: string | number;
    taxonId: string | number;
    placeId: string | number;
    perPage: number;
};
declare type CommonTaxData = {
    id: number;
    imageUrl: string;
    taxonName: string;
    taxonCommonName: string;
    obsCount: number;
};
declare type CommonTaxaRespData = {
    totalResults: number;
    results: [CommonTaxData];
};
declare const getCommonTaxa: ({ year, taxonId, placeId, perPage }: CommonTaxaCallProps) => Promise<CommonTaxaRespData>;

declare type FavouritesCallProps = {
    year: string | number;
    taxonId: string | number;
    placeId: string | number;
    perPage: number;
};
declare type FavouritesData = {
    id: number;
    imageUrl: string;
    taxonName: string;
    taxonCommonName: string;
    obsDate: string;
    obsCount: number;
    observerUsername: string;
    numFaves: number;
};
declare type FavouritesRespData = {
    totalResults: number;
    results: [FavouritesData];
};
declare const getFavourites: ({ year, taxonId, placeId, perPage }: FavouritesCallProps) => Promise<FavouritesRespData>;

declare type RecentObservationsCallProps = {
    taxonId: string | number;
    placeId: string | number;
    perPage: number;
};
declare type RecentObservationData = {
    id: number;
    imageUrl: string;
    obsUrl: string;
    obsDate: string;
    taxonName: string;
    taxonCommonName: string;
    observerUsername: string;
};
declare type RecentObservationsRespData = {
    totalResults: number;
    results: [RecentObservationData];
};
declare const getRecentObservations: ({ taxonId, placeId, perPage }: RecentObservationsCallProps) => Promise<RecentObservationsRespData>;

declare type SummaryApiProps = {
    taxonId: number;
    placeId: number;
    year: string | number;
};
declare const getSummary: ({ taxonId, placeId, year }: SummaryApiProps) => Promise<any>;
declare type Observer = {
    id: number;
    userName: string;
    numObservations: number;
    iconUrl: string | null;
};
declare type SummaryData = {
    totalCount: number;
    top: [Observer];
};
declare const getObserverSummary: (taxonId: number, placeId: number, year: string | number) => Promise<SummaryData>;
declare const getObservationSummary: (taxonId: number, placeId: number, year: string | number) => Promise<{
    totalCount: any;
}>;
declare type SeasonalityData = {
    monthOfYear: {
        [monthNum: string]: number;
    };
};
declare const getSeasonalityData: (taxonId: number, placeId: number, year: string | number) => Promise<SeasonalityData>;

declare type ConfigFile = {
    taxa: TaxaConfig[];
    places: PlaceConfig[];
    features: {
        [Feature.commonTaxa]?: {
            numResults?: number;
        };
        [Feature.favourites]?: {
            numResults?: number;
            numYears?: number;
        };
        [Feature.recentObservations]?: {
            numResults?: number;
            numYears?: number;
        };
        [Feature.stats]?: {
            numTopObservers?: number;
        };
    };
};
declare enum DataSource {
    autoLoad = "autoLoad",
    dataProp = "dataProp",
    url = "url"
}
declare enum Feature {
    commonTaxa = "commonTaxa",
    favourites = "favourites",
    recentObservations = "recentObservations",
    stats = "stats"
}
declare enum Tab {
    recent = "recent",
    commonTaxa = "commonTaxa",
    favourites = "favourites",
    stats = "stats"
}
declare type BaseComponentProps = {
    taxonId?: number;
    placeId?: number;
    filename?: string;
    perPage?: number;
    source?: DataSource;
    data?: any;
    dataUrl?: string;
    className?: string;
    components?: {
        label?: any;
        error?: any;
        loader?: any;
    };
};
declare type TaxaConfig = {
    label: string;
    short: string;
    taxonId: number;
};
declare type PlaceConfig = {
    label: string;
    short: string;
    placeId: number;
};

declare const getSourceFile: (api: Feature, taxonInfo: TaxaConfig, placeInfo: PlaceConfig, year?: string | number) => string;

declare const getCurrentYear: () => number;
declare const formatDate: (date: string, dateFormat?: string) => any;

declare const numberWithCommas: (x: number) => string;

declare const BASE_API_URL = "https://api.inaturalist.org";
declare const PER_PAGE = 100;
declare const BASE_URL = "https://www.inaturalist.org";

declare const constants_BASE_API_URL: typeof BASE_API_URL;
declare const constants_PER_PAGE: typeof PER_PAGE;
declare const constants_BASE_URL: typeof BASE_URL;
declare namespace constants {
  export {
    constants_BASE_API_URL as BASE_API_URL,
    constants_PER_PAGE as PER_PAGE,
    constants_BASE_URL as BASE_URL,
  };
}

export { BaseComponentProps, constants as C, CommonTaxData, CommonTaxaCallProps, CommonTaxaRespData, ConfigFile, DataSource, FavouritesCallProps, FavouritesData, FavouritesRespData, Feature, Observer, PlaceConfig, RecentObservationData, RecentObservationsCallProps, RecentObservationsRespData, SeasonalityData, SummaryApiProps, SummaryData, Tab, TaxaConfig, formatDate, getCommonTaxa, getCurrentYear, getFavourites, getObservationSummary, getObserverSummary, getRecentObservations, getSeasonalityData, getSourceFile, getSummary, numberWithCommas };
