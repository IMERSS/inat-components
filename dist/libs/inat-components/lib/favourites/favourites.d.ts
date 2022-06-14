/// <reference types="react" />
import { FavouritesRespData, FavouritesData } from "../api/favourites";
import { DataSource } from "../../typings";
export declare type FavouritesProps = {
    year: string;
    source?: DataSource;
    taxonId?: number;
    placeId?: number;
    perPage?: number;
    data?: FavouritesRespData;
    dataUrl?: string;
    components?: {
        loader?: JSX.Element;
        label?: JSX.Element;
    };
    className?: string;
};
export declare const FavouritesLabel: (data: FavouritesData) => JSX.Element;
export declare const Favourites: ({ year, source, taxonId, placeId, perPage, data, dataUrl, components, className }: FavouritesProps) => JSX.Element;
