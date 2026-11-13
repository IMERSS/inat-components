/*
 * The observations a request covers, as the query parameters of iNaturalist's API. Each may be omitted, and each may
 * be a single id or a comma-separated list of them, e.g. "154453,81137", which the API reads as any of them.
 *
 * A project, if supplied, applies whatever rules the project has on iNaturalist at the time of each request - its
 * places, taxa, quality grades and so on - so that the observations shown are those of the project, and stay so as the
 * project is edited. A taxon or place supplied as well narrows the project's observations further.
 */
export type ObservationFilter = {
    taxonId?: string | number;
    placeId?: string | number;
    projectId?: string | number;
};

const filterParamNames: [keyof ObservationFilter, string][] = [
    ["taxonId", "taxon_id"],
    ["placeId", "place_id"],
    ["projectId", "project_id"]
];

/**
 * Render a filter as query parameters, to be appended to a URL which already has a query.
 * @param filter - The taxon, place and project of the observations
 * @return The parameters, each beginning with "&", of those members of the filter which are supplied
 */
export const filterParams = (filter: ObservationFilter): string =>
    filterParamNames
        .filter(([member]) => filter[member] !== undefined && filter[member] !== null && filter[member] !== "")
        // The commas of a list are left as they are, as iNaturalist's own pages write them
        .map(([member, param]) => `&${param}=${encodeURIComponent(String(filter[member])).replace(/%2C/gi, ",")}`)
        .join("");

