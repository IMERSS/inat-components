/**
 * These options are used for both the demo UI and for the scripting code to generate static JSON files of the
 * content needed for the various components. To change the demo content just alter the TAXA and PLACES content here
 * and re-run `yarn generate` in repo root to get the latest static JSON content.
 */
import { Configuration, INatApi } from "../../typings";
export declare type Taxa = {
    label: string;
    short: string;
    taxonId: number;
};
export declare type Place = {
    label: string;
    short: string;
    placeId: number;
};
export declare const TAXA: Taxa[];
export declare const PLACES: Place[];
export declare const DEMO_BASE_URL = "http://localhost:7777";
export declare const getDemoFile: (api: INatApi, taxonId: number, placeId: number, year?: string | number) => string;
export declare const getDemoFileUrl: (api: INatApi, taxonId: number, placeId: number, year?: string | number) => string;
export declare const getDemoConfigurations: () => Configuration[];
