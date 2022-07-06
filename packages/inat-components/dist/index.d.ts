declare const TaxonPanel: ({ taxonId, placeId, dataSource, features, sourceFolder }: any) => JSX.Element;

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

declare const process: (config: ConfigFile, folder: string) => Promise<void>;

declare type ObservationProps = {
    imageUrl: string;
    linkUrl: string;
    children: any;
};
declare const Observation: ({ imageUrl, linkUrl, children }: ObservationProps) => JSX.Element;

declare type CommonTaxData = {
    id: number;
    imageUrl: string;
    taxonName: string;
    taxonCommonName: string;
    obsCount: number;
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

declare type RecentObservationData = {
    id: number;
    imageUrl: string;
    obsUrl: string;
    obsDate: string;
    taxonName: string;
    taxonCommonName: string;
    observerUsername: string;
};

declare type CommonTaxaProps = BaseComponentProps & {
    year: string | number;
};
declare const CommonTaxaLabel: (data: CommonTaxData) => JSX.Element;
declare const CommonTaxa: ({ year, source, taxonId, placeId, perPage, data, dataUrl, components, className }: CommonTaxaProps) => JSX.Element;

declare type RecentObservationsProps = BaseComponentProps;
declare const RecentObservationLabel: (obs: RecentObservationData) => JSX.Element;
declare const RecentObservations: ({ taxonId, placeId, data, dataUrl, source, perPage, components, className }: RecentObservationsProps) => JSX.Element;

declare type FavouritesProps = BaseComponentProps & {
    year: string | number;
};
declare const FavouritesLabel: (data: FavouritesData) => JSX.Element;
declare const Favourites: ({ year, source, taxonId, placeId, data, dataUrl, components, className, perPage }: FavouritesProps) => JSX.Element;

declare const SeasonalityGraph: (blah: any) => null;

declare type SummaryProps = {
    source: DataSource;
    taxonId: number;
    placeId: number;
    year: string | number;
    data?: FavouritesRespData;
    dataUrl?: string;
};
declare const Summary: ({ source, data, dataUrl, taxonId, placeId, year }: SummaryProps) => JSX.Element;

export { BaseComponentProps, CommonTaxa, CommonTaxaLabel, CommonTaxaProps, ConfigFile, DataSource, Favourites, FavouritesLabel, FavouritesProps, Feature, Observation, ObservationProps, PlaceConfig, RecentObservationLabel, RecentObservations, RecentObservationsProps, SeasonalityGraph, Summary, SummaryProps, Tab, TaxaConfig, TaxonPanel as default, process as generate };
