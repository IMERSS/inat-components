export enum DataSource {
  autoLoad = "autoLoad",
  dataProp = "dataProp",
  url = "url"
}

export enum INatApi {
  recentObservations = "recentObservations",
  commonTaxa = "commonTaxa",
  favourites = "favourites",
  stats = "stats"
}

export type Configuration = {
  api: INatApi;
  taxonId: number;
  placeId: number;
  filename: string;
  perPage?: number;
  year?: string | number; // required for common taxa (separate type?)
  refreshTime?: number; // prob required
  minify?: boolean;
};

export type ConfigurationSet = {
  name: string;
  filenamePrefix: string;
  configurations: Configuration[];
}

export enum Tab {
  recent = "recent",
  favourites = "favourites",
  mostCommon = "mostCommon",
  stats = "stats"
}
