/// <reference types="react" />
import { DataSource } from "../../typings";
import { FavouritesRespData } from "../api/favourites";
export declare type SummaryProps = {
    source: DataSource;
    taxonId: number;
    placeId: number;
    year: string | number;
    data?: FavouritesRespData;
    dataUrl?: string;
};
export declare const Summary: ({ source, data, dataUrl, taxonId, placeId, year }: SummaryProps) => JSX.Element;
