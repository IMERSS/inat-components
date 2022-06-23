export declare type ConfigFile = {
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
export declare enum DataSource {
    autoLoad = "autoLoad",
    dataProp = "dataProp",
    url = "url"
}
export declare enum Feature {
    commonTaxa = "commonTaxa",
    favourites = "favourites",
    recentObservations = "recentObservations",
    stats = "stats"
}
export declare enum Tab {
    recent = "recent",
    commonTaxa = "commonTaxa",
    favourites = "favourites",
    stats = "stats"
}
export declare type BaseComponentProps = {
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
export declare type TaxaConfig = {
    label: string;
    short: string;
    taxonId: number;
};
export declare type PlaceConfig = {
    label: string;
    short: string;
    placeId: number;
};
