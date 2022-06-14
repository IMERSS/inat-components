/// <reference types="react" />
import { CommonTaxaRespData, CommonTaxData } from "../api/common-taxa";
import { DataSource } from "../../typings";
export declare type CommonTaxaProps = {
    year: string;
    source?: DataSource;
    taxonId?: number;
    placeId?: number;
    perPage?: number;
    data?: CommonTaxaRespData;
    dataUrl?: string;
    components?: {
        loader?: JSX.Element;
        label?: JSX.Element;
    };
    className?: string;
};
export declare const CommonTaxaLabel: (data: CommonTaxData) => JSX.Element;
export declare const CommonTaxa: ({ year, source, taxonId, placeId, perPage, data, dataUrl, components, className }: CommonTaxaProps) => JSX.Element;
