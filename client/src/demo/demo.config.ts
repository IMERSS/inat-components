/**
 * These options are used for both the demo UI and for the scripting code to generate static JSON files of the
 * content needed for the various components.
 */
export const TAXONS = [
    { label: "Lepidoptera", short: "lep", taxonId: "47157" },
    { label: "Coleoptera", short: "col", taxonId: "47208" },
    { label: "Diptera", short: "dip", taxonId: "47822" },
    { label: "Mantodea", taxonId: "48112" }
];

export const PLACES = [
    { label: "BC", short: "bc", placeId: "7085" },
    { label: "Alberta", short: "alberta", placeId: "6834" }
];

export const DEMO_BASE_URL = "http://localhost:7777";

export const getDemoFile = (): string => {

    return "";

};
