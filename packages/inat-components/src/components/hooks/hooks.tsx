import {useEffect, useState} from "react";
import {Tab} from "../../__shared";

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
            [Tab.recent]: features.recentObservations?.title || defaultTitles[Tab.recent],
            [Tab.commonTaxa]: features.commonTaxa?.title || defaultTitles[Tab.commonTaxa],
            [Tab.favourites]: features.favourites?.title || defaultTitles[Tab.favourites],
            [Tab.stats]: features.stats?.title || defaultTitles[Tab.stats]
        });
    }, [features]);

    return titles;
};
