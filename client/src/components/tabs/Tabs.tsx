import React from "react";
import {Tab} from "../../general";
import styles from "./Tabs.module.scss";

export type TabsProps = {
    selectedTab: Tab;
    onChangeTab: (tab: Tab) => void;
}

const Tabs = ({ selectedTab, onChangeTab }: TabsProps) => {
    return (
        <ul className={styles.tabs}>
            <li onClick={() => onChangeTab(Tab.recent)} className={selectedTab === Tab.recent ? styles.selected : ""}>
                Recent
            </li>
            <li onClick={() => onChangeTab(Tab.mostCommon)} className={selectedTab === Tab.mostCommon ? styles.selected : ""}>
                Most Common
            </li>
            <li onClick={() => onChangeTab(Tab.favourites)} className={selectedTab === Tab.favourites ? styles.selected : ""}>
                Favourites
            </li>
            <li onClick={() => onChangeTab(Tab.stats)} className={selectedTab === Tab.stats ? styles.selected : ""}>
                Stats
            </li>
        </ul>
    );
};

export default Tabs;
