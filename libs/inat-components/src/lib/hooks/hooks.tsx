import {useEffect, useState} from "react";
import {Tab} from "@imerss/shared";

const defaultTitles = {
    [Tab.recent]: "Recent",
    [Tab.commonTaxa]: "Most common",
    [Tab.favourites]: "Most favourited",
    [Tab.stats]: "General stats"
};

export const useFeatureTitles = (features: any) => {
    const [titles, setTitles] = useState(defaultTitles);

    useEffect(() => {
        setTitles({
            [Tab.recent]: features.recentObservations?.label || defaultTitles[Tab.recent],
            [Tab.commonTaxa]: features.commonTaxa?.label || defaultTitles[Tab.commonTaxa],
            [Tab.favourites]: features.favourites?.label || defaultTitles[Tab.favourites],
            [Tab.stats]: features.stats?.label || defaultTitles[Tab.stats]
        });
    }, [features]);

    return titles;
};
