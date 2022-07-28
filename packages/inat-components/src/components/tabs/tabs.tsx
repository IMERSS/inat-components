import React from "react";
import {Tab} from "../../__shared";
import styles from "./tabs.module.scss";
import {useFeatureTitles} from "../hooks/hooks";

export type TabsProps = {
    selectedTab: Tab;
    onChangeTab: (tab: Tab) => void;
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
                <li onClick={() => onChangeTab(Tab.recent)}
                    className={selectedTab === Tab.recent ? styles.selected : ""}>
                    {titles[Tab.recent]}
                </li>
            )}
            {features.commonTaxa && (
                <li onClick={() => onChangeTab(Tab.commonTaxa)}
                    className={selectedTab === Tab.commonTaxa ? styles.selected : ""}>
                    {titles[Tab.commonTaxa]}
                </li>
            )}
            {features.favourites && (
                <li onClick={() => onChangeTab(Tab.favourites)}
                    className={selectedTab === Tab.favourites ? styles.selected : ""}>
                    {titles[Tab.favourites]}
                </li>
            )}
            {features.stats && (
                <li onClick={() => onChangeTab(Tab.stats)} className={selectedTab === Tab.stats ? styles.selected : ""}>
                    {titles[Tab.stats]}
                </li>
            )}
        </ul>
    );
}

export default Tabs;
