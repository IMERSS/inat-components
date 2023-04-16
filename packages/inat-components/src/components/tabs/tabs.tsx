import React from "react";
import { Feature } from "../../../../../shared";
import styles from "./tabs.module.scss";
import {useFeatureTitles} from "../hooks/hooks";

export type TabsProps = {
    selectedTab: Feature;
    onChangeTab: (tab: Feature) => void;
    features: any;
    className?: string;
}

const Tabs = ({ selectedTab, onChangeTab, features, className }: TabsProps) => {
    const titles = useFeatureTitles(features);

    let classes = styles.tabs;
    if (className) {
        classes += ` ${className}`;
    }

    return (
        <ul className={classes}>
            {features.recentObservations && (
                <li onClick={() => onChangeTab(Feature.recentObservations)}
                    className={selectedTab === Feature.recentObservations ? styles.selected : ""}>
                    {titles[Feature.recentObservations]}
                </li>
            )}
            {features.commonTaxa && (
                <li onClick={() => onChangeTab(Feature.commonTaxa)}
                    className={selectedTab === Feature.commonTaxa ? styles.selected : ""}>
                    {titles[Feature.commonTaxa]}
                </li>
            )}
            {features.favourites && (
                <li onClick={() => onChangeTab(Feature.favourites)}
                    className={selectedTab === Feature.favourites ? styles.selected : ""}>
                    {titles[Feature.favourites]}
                </li>
            )}
            {features.stats && (
                <li onClick={() => onChangeTab(Feature.stats)} className={selectedTab === Feature.stats ? styles.selected : ""}>
                    {titles[Feature.stats]}
                </li>
            )}
        </ul>
    );
}

export default Tabs;
