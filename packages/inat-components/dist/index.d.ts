import { BaseComponentProps, CommonTaxData, RecentObservationData, FavouritesData, DataSource, FavouritesRespData } from 'inat-components-shared';
export * from 'inat-components-shared';

declare const TaxonPanel: ({ taxonId, placeId, dataSource, features, sourceFolder }: any) => JSX.Element;

declare type ObservationProps = {
    imageUrl: string;
    linkUrl: string;
    children: any;
};
declare const Observation: ({ imageUrl, linkUrl, children }: ObservationProps) => JSX.Element;

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

export { CommonTaxa, CommonTaxaLabel, CommonTaxaProps, Favourites, FavouritesLabel, FavouritesProps, Observation, ObservationProps, RecentObservationLabel, RecentObservations, RecentObservationsProps, SeasonalityGraph, Summary, SummaryProps, TaxonPanel as default };
