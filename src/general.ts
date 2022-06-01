export type PageProps = {
    year: "all" | string;
    taxonId: string;
    placeId: string;
}

export enum Tab {
    recent = "recent",
    favourites = "favourites",
    mostCommon = "mostCommon",
    rarest = "rarest",
    stats = "stats"
}