/// <reference types="react" />
import { Tab } from "../../typings";
export declare type TabsProps = {
    selectedTab: Tab;
    onChangeTab: (tab: Tab) => void;
};
declare const Tabs: ({ selectedTab, onChangeTab }: TabsProps) => JSX.Element;
export default Tabs;
