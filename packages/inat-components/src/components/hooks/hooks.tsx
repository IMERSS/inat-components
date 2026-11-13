import { useMemo } from "react";
import { Feature, TaxonPanelFeatures } from "@imerss/inat-components-shared";

const defaultTitles = {
    [Feature.recentObservations]: "Recent",
    [Feature.commonTaxa]: "Most common",
    [Feature.favourites]: "Most favourited",
    [Feature.stats]: "General stats"
};

/**
 * The title of each feature - its own `title`, or the default.
 * @param features - The features, as TaxonPanel's array of them, or as an object keyed by feature
 * @return The titles, keyed by feature
 */
export const useFeatureTitles = (features: any) => useMemo(() => {
    const byFeature = Array.isArray(features) ? convertFeaturesToObj(features) : features;
    return {
        [Feature.recentObservations]: byFeature.recentObservations?.title || defaultTitles[Feature.recentObservations],
        [Feature.commonTaxa]: byFeature.commonTaxa?.title || defaultTitles[Feature.commonTaxa],
        [Feature.favourites]: byFeature.favourites?.title || defaultTitles[Feature.favourites],
        [Feature.stats]: byFeature.stats?.title || defaultTitles[Feature.stats]
    };
}, [features]);

export const convertFeaturesToObj = (features: TaxonPanelFeatures) => {
    const featuresObj: any = {};
    features.forEach((row) => {
        const { feature, ...other } = row;
        featuresObj[feature] = other;
    });

    return featuresObj;
}
