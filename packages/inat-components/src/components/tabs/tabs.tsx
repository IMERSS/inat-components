import React from "react";
import { Feature, TaxonPanelFeatures } from "../../__shared";
import styles from "./tabs.module.scss";
import { useFeatureTitles } from "../hooks/hooks";

export type TabsProps = {
    selectedTab: Feature;
    onChangeTab: (tab: Feature) => void;
    features: TaxonPanelFeatures;
    className?: string;
}

const Tabs = ({ selectedTab, onChangeTab, features, className }: TabsProps) => {
    const titles = useFeatureTitles(features);

    let classes = styles.tabs;
    if (className) {
        classes += ` ${className}`;
    }

    const items = features.map((item) => {
        if (item.feature == Feature.recentObservations) {
            return (
                <li onClick={() => onChangeTab(Feature.recentObservations)}
                    className={selectedTab === Feature.recentObservations ? styles.selected : ""}>
                    {titles[Feature.recentObservations]}
                </li>
            );
        } else if (item.feature == Feature.commonTaxa) {
            return (
                <li onClick={() => onChangeTab(Feature.commonTaxa)}
                    className={selectedTab === Feature.commonTaxa ? styles.selected : ""}>
                    {titles[Feature.commonTaxa]}
                </li>
            );
        } else if (item.feature == Feature.favourites) {
            return (
                <li onClick={() => onChangeTab(Feature.favourites)}
                    className={selectedTab === Feature.favourites ? styles.selected : ""}>
                    {titles[Feature.favourites]}
                </li>
            );
        } else if (item.feature == Feature.stats) {
            return (
                <li onClick={() => onChangeTab(Feature.stats)} className={selectedTab === Feature.stats ? styles.selected : ""}>
                    {titles[Feature.stats]}
                </li>
            );
        }

        // possibly a user has included something wacky
        return undefined;
    });

    return (
        <ul className={classes}>
            {items}
        </ul>
    );
}

export default Tabs;
