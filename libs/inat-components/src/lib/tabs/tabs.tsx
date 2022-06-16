import React from "react";
import {Tab} from "../../typings";
import styles from "./tabs.module.scss";

export type TabsProps = {
    selectedTab: Tab;
    onChangeTab: (tab: Tab) => void;
    features: any;
}

const Tabs = ({ selectedTab, onChangeTab, features }: TabsProps) => (
    <ul className={styles.tabs}>
        {features.recentObservations && (
            <li onClick={() => onChangeTab(Tab.recent)} className={selectedTab === Tab.recent ? styles.selected : ""}>
                Recent
            </li>
        )}
        {features.mostCommon && (
            <li onClick={() => onChangeTab(Tab.mostCommon)} className={selectedTab === Tab.mostCommon ? styles.selected : ""}>
                Most Common
            </li>
        )}
        {features.favourites && (
            <li onClick={() => onChangeTab(Tab.favourites)} className={selectedTab === Tab.favourites ? styles.selected : ""}>
                Favourites
            </li>
        )}
        {features.stats && (
            <li onClick={() => onChangeTab(Tab.stats)} className={selectedTab === Tab.stats ? styles.selected : ""}>
                Stats
            </li>
        )}
    </ul>
);

export default Tabs;
