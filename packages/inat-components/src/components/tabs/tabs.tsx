import React from "react";
import {Tab} from "../../typings";
import styles from "./tabs.module.scss";
import {useFeatureTitles} from "../hooks/hooks";

export type TabsProps = {
    selectedTab: Tab;
    onChangeTab: (tab: Tab) => void;
    features: any; // TODO
}

const Tabs = ({ selectedTab, onChangeTab, features }: TabsProps) => {
    const titles = useFeatureTitles(features);

    return (
        <ul className={styles.tabs}>
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
