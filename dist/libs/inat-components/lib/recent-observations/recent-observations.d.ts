/// <reference types="react" />
import { RecentObservationData, RecentObservationsRespData } from "../api/recent-observations";
import { DataSource } from "../../typings";
export declare type RecentObservationsProps = {
    source?: DataSource;
    taxonId?: number;
    placeId?: number;
    perPage?: number;
    data?: RecentObservationsRespData;
    dataUrl?: string;
    components?: {
        loader?: JSX.Element;
        label?: JSX.Element;
    };
    className?: string;
};
export declare const RecentObservationLabel: (obs: RecentObservationData) => JSX.Element;
export declare const RecentObservations: ({ taxonId, placeId, data, dataUrl, source, perPage, components, className }: RecentObservationsProps) => JSX.Element;
