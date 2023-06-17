import React, { useState } from "react";
import { C, getSourceFile, DataSource, DataSourceEnum, Feature, GeneralClasses, TaxonPanelFeatures } from "../../__shared";
import { RecentObservations } from '../recent-observations/recent-observations';
import { CommonTaxa } from '../common-taxa/common-taxa';
import { Favourites } from "../favourites/favourites"
import { Summary } from "../summary/summary";
import Years from "../year-dropdown/year-dropdown";
import Tabs from "../tabs/tabs";
import { convertFeaturesToObj, useFeatureTitles } from "../hooks/hooks";
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
    features: TaxonPanelFeatures;
    generalClasses: GeneralClasses;
    itemWidth?: number;
}

const TaxonPanel = ({ taxon, place, features, dataSource, dataSourceBaseUrl, itemWidth, generalClasses }: TaxonPanelProps) => {
    const [tab, setTab] = useState(features[0].feature);
    const [year, setYear] = useState<string>("all");
    const featuresObj = convertFeaturesToObj(features);
    const titles = useFeatureTitles(featuresObj);

    const getProps = (feature: Feature): any => {
        const props: any = {
            source: dataSource,
            itemWidth,
            tabDesc: featuresObj[feature]?.desc,
            generalClasses,
            className: featuresObj[feature]?.className
        };
        if (dataSource === DataSourceEnum.url) {
            props.dataUrl = dataSourceBaseUrl + '/' + getSourceFile(feature, taxon, place, year);
        } else {
            props.placeId = place.id;
            props.taxonId = taxon.id;
        }

        if (feature !== Feature.stats) {
            props.numResults = featuresObj[feature]?.numResults;
        }

        if (feature !== Feature.recentObservations) {
            props.year = year;
        }

        return props;
    };

    const getCurrentTab = () => {
        switch (tab) {
            case Feature.recentObservations:
                return <RecentObservations {...getProps(Feature.recentObservations)} />;
            case Feature.commonTaxa:
                return <CommonTaxa {...getProps(Feature.commonTaxa)} />;
            case Feature.favourites:
                return <Favourites {...getProps(Feature.favourites)} />;

            case Feature.stats:
                return (
                    <Summary
                        {...getProps(Feature.stats)}
                        observersListClass={featuresObj[Feature.stats]?.observersListClass}
                        statsCountSummaryClass={featuresObj[Feature.stats]?.statsCountSummaryClass}
                    />
                );
        }
    };

    const tabsClass = generalClasses?.tabsElement || '';
    const yearDropdownClass = generalClasses?.yearsDropdown || '';

    return (
        <div className={styles.page}>
            {features.length > 1 && <Tabs
                selectedTab={tab}
                onChangeTab={setTab}
                features={features}
                className={tabsClass}
            />}
            <div>
                {tab !== Feature.recentObservations && (
                    <div style={{ float: "right" }} className={yearDropdownClass}>
                        <Years
                            value={year}
                            numYears={featuresObj[tab]?.numYears || C.DEFAULT_NUM_YEARS}
                            onChange={setYear}
                        />
                    </div>
                )}
                <h1 className={generalClasses?.pageHeadings}>{titles[tab]}</h1>
            </div>
            {getCurrentTab()}
        </div>
    );
}

export default TaxonPanel;
