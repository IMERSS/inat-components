export declare enum DataSource {
    autoLoad = "autoLoad",
    dataProp = "dataProp",
    url = "url"
}
export declare enum INatApi {
    recentObservations = "recentObservations",
    commonTaxa = "commonTaxa",
    favourites = "favourites",
    stats = "stats"
}
export declare type Configuration = {
    api: INatApi;
    taxonId: number;
    placeId: number;
    filename: string;
    perPage?: number;
    year?: string | number;
    refreshTime?: number;
    minify?: boolean;
};
export declare type ConfigurationSet = {
    name: string;
    filenamePrefix: string;
    configurations: Configuration[];
};
export declare enum Tab {
    recent = "recent",
    favourites = "favourites",
    mostCommon = "mostCommon",
    stats = "stats"
}
