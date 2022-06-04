export type PageProps = {
    year: "all" | string;
    taxonId: number;
    placeId: number;
}

export enum Tab {
    recent = "recent",
    favourites = "favourites",
    mostCommon = "mostCommon",
    stats = "stats"
}