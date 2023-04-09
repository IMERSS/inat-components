import React, {useState} from "react";
import { C, getSourceFile, DataSource, Feature, GeneralClasses } from '../../__shared';
import { RecentObservations } from '../recent-observations/recent-observations';
import { CommonTaxa } from '../common-taxa/common-taxa';
import { Favourites } from "../favourites/favourites"
import { Summary } from "../summary/summary";
import Years from "../year-dropdown/year-dropdown";
import Tabs from "../tabs/tabs";
import { useFeatureTitles } from "../hooks/hooks";
import styles from "../shared/css/general.module.scss";

export type TaxonPanelProps = {
    taxon: {
        id: number;
        str: string;
    };
    place: {
        id: number;
        str: string;
    }
    dataSourceBaseUrl: string;
    dataSource: DataSource;
    itemWidth?: number;
    features: {
        [Feature.recentObservations]?: {
            title: string;
            numResults?: number;
            desc?: string;
            className?: string;
        };
        [Feature.commonTaxa]?: {
            title: string;
            numResults?: number;
            numYears?: number;
            desc?: string;
            className?: string;
        };
        [Feature.favourites]?: {
            title: string;
            numResults?: number;
            numYears?: number;
            desc?: string;
            className?: string;
        };
        [Feature.stats]?: {
            title: string;
            numTopObservers?: number;
            numYears?: number;
            desc?: string;
            className?: string;
        };
    };
    generalClasses: GeneralClasses;
}

const TaxonPanel = ({ taxon, place, features, dataSource, dataSourceBaseUrl, itemWidth, generalClasses }: TaxonPanelProps) => {
    const [tab, setTab] = useState(Feature.recentObservations);
    const [year, setYear] = useState<string>("all");
    const titles = useFeatureTitles(features);

    const getProps = (feature: Feature): any => {
        const props: any = {
            source: dataSource,
            itemWidth,
            tabDesc: features?.[feature]?.desc,
            generalClasses,
            className: features?.[feature]?.className
        };
        if (dataSource === DataSource.url) {
            props.dataUrl = dataSourceBaseUrl + '/' + getSourceFile(feature, taxon, place, year);
        } else {
            props.placeId = place.id;
            props.taxonId = taxon.id;
        }

        return props;
    };

    const getCurrentTab = () => {
        switch (tab) {
            case Feature.recentObservations: {
                return (
                    <RecentObservations {...getProps(Feature.recentObservations)} />
                );
            }
            case Feature.commonTaxa: {
                return (
                    <CommonTaxa {...getProps(Feature.commonTaxa)} />
                );
            }

            case Feature.favourites: {
                return (
                    <Favourites {...getProps(Feature.favourites)} />
                );
            }

            case Feature.stats: {
                return <Summary {...getProps(Feature.stats)} />;
            }
        }
    };

    const tabsClass = generalClasses?.tabsElement || '';
    const yearDropdownClass = generalClasses?.yearsDropdown || '';

    const getNumYears = () => {
        let numYears = C.DEFAULT_NUM_YEARS;
        switch (tab) {
            case Feature.commonTaxa: {
                numYears = features?.commonTaxa?.numYears || C.DEFAULT_NUM_YEARS;
                break;
            }
            case Feature.favourites: {
                numYears = features?.favourites?.numYears || C.DEFAULT_NUM_YEARS;
                break;
            }
            case Feature.stats: {
                numYears = features?.stats?.numYears || C.DEFAULT_NUM_YEARS;
                break;
            }
        }
        return numYears;
    }

    return (
        <div className={styles.page}>
            <Tabs
                selectedTab={tab}
                onChangeTab={setTab}
                features={features}
                className={tabsClass}
            />
            <div>
                {tab !== Feature.recentObservations && (
                    <div style={{ float: "right" }} className={yearDropdownClass}>
                        <Years value={year} onChange={setYear} numYears={getNumYears()} />
                    </div>
                )}
                <h1 className={generalClasses?.pageHeadings}>{titles[tab]}</h1>
            </div>
            {getCurrentTab()}
        </div>
    );
}

export default TaxonPanel;
