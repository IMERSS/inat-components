export enum INatApi {
    recentObservations = "recentObservations"
}

export type Configuration = {
    api: INatApi;
    perPage: number;
    taxonId: number;
    placeId: number;
    filename: string;
    refreshTime?: number; // prob required
    minify?: boolean;
};

export type ConfigurationSet = {
    name: string;
    filenamePrefix: string;
    configurations: Configuration[];
}
