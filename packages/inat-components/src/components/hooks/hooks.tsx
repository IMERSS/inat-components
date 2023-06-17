import { useEffect, useState } from "react";
import { Feature } from "../../__shared";
import { TaxonPanelFeatures } from "../../../../../shared";

const defaultTitles = {
    [Feature.recentObservations]: "Recent",
    [Feature.commonTaxa]: "Most common",
    [Feature.favourites]: "Most favourited",
    [Feature.stats]: "General stats"
};

export const useFeatureTitles = (features: any) => {
    const [titles, setTitles] = useState(defaultTitles);

    useEffect(() => {
        setTitles({
            [Feature.recentObservations]: features.recentObservations?.title || defaultTitles[Feature.recentObservations],
            [Feature.commonTaxa]: features.commonTaxa?.title || defaultTitles[Feature.commonTaxa],
            [Feature.favourites]: features.favourites?.title || defaultTitles[Feature.favourites],
            [Feature.stats]: features.stats?.title || defaultTitles[Feature.stats]
        });
    }, [features]);

    return titles;
};

export const convertFeaturesToObj = (features: TaxonPanelFeatures) => {
    const featuresObj: any = {};
    features.forEach((row) => {
        const { feature, ...other } = row;
        featuresObj[feature] = other;
    });

    return featuresObj;
}
