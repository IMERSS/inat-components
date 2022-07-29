import React, {useState} from "react";
import {getSourceFile, Tab, DataSource, Feature, ConfigFile, BaseClasses} from "../../__shared";
import {RecentObservations, RecentObservationsProps} from '../recent-observations/recent-observations';
import {CommonTaxa} from '../common-taxa/common-taxa';
import {Favourites} from "../favourites/favourites"
import {Summary} from "../summary/summary";
import Years from "../year-dropdown/year-dropdown";
import Tabs from "../tabs/tabs";
import {useFeatureTitles} from "../hooks/hooks";
import styles from '../shared/css/general.module.scss';

export type TaxonPanelProps = {
    taxonId: number;
    placeId: number;
    dataSource: DataSource;
    config: ConfigFile;
    baseUrl: string;
    itemWidth?: number;
    classes?: BaseClasses;
}

const TaxonPanel = ({ taxonId, placeId, dataSource, config, baseUrl, itemWidth, classes }: TaxonPanelProps) => {
    const [tab, setTab] = useState(Tab.recent);
    const [year, setYear] = useState<string>("all");
    const titles = useFeatureTitles(config.features);
    const [taxonInfo] = useState(() => config.taxa.find((i) => i.taxonId === taxonId));
    const [placeInfo] = useState(() => config.places.find((i) => i.placeId === placeId));

    const getCurrentTab = () => {
        switch (tab) {
            case Tab.recent: {
                const props: Partial<RecentObservationsProps> = {
                    source: dataSource,
                    itemWidth,
                    classes
                };
                if (dataSource === DataSource.url) {
                    props.dataUrl = baseUrl + '/' + getSourceFile(Feature.recentObservations, taxonInfo, placeInfo);
                } else {
                    props.placeId = placeId;
                    props.taxonId = taxonId;
                }
                return (
                    <RecentObservations {...props} />
                );
            }

            case Tab.commonTaxa: {
                const props: any = {
                    classes,
                    source: dataSource,
                    itemWidth,
                    year
                };
                if (dataSource === DataSource.url) {
                    props.dataUrl = baseUrl + '/' + getSourceFile(Feature.commonTaxa, taxonInfo, placeInfo, year);
                } else {
                    props.placeId = placeId;
                    props.taxonId = taxonId;
                }
                return (
                    <CommonTaxa {...props} />
                );
            }

            case Tab.favourites: {
                const props: any = {
                    classes,
                    itemWidth,
                    source: dataSource,
                    year
                };
                if (dataSource === DataSource.url) {
                    props.dataUrl = baseUrl + '/' + getSourceFile(Feature.favourites, taxonInfo, placeInfo, year);
                } else {
                    props.placeId = placeId;
                    props.taxonId = taxonId;
                }
                return (
                    <Favourites {...props} />
                );
            }

            case Tab.stats: {
                const props: any = {
                    classes,
                    source: dataSource,
                    year
                };
                if (dataSource === DataSource.url) {
                    props.dataUrl = baseUrl + '/' + getSourceFile(Feature.stats, taxonInfo, placeInfo, year);
                } else {
                    props.placeId = placeId;
                    props.taxonId = taxonId;
                }
                return <Summary {...props} />;
            }
        }
    };

    const tabsClass = classes?.tabs || '';
    const yearDropdownClass = classes?.yearsDropdown || '';

    return (
        <div className={styles.page}>
            <Tabs
                selectedTab={tab}
                onChangeTab={setTab}
                features={config.features}
                className={tabsClass}
            />
            <div>
                {tab !== Tab.recent && (
                    <div style={{ float: "right" }} className={yearDropdownClass}>
                        <Years value={year} onChange={setYear} />
                    </div>
                )}
                <h1 className={classes?.pageHeadings}>{titles[tab]}</h1>
            </div>
            {getCurrentTab()}
        </div>
    );
}

export default TaxonPanel;
