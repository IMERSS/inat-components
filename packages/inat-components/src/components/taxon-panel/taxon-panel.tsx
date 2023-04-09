import React, {useState} from "react";
import { C, getSourceFile, Tab, DataSource, Feature, ConfigFile, BaseClasses, TabDescs } from '../../__shared';
import { RecentObservations, RecentObservationsProps } from '../recent-observations/recent-observations';
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
    dataSource: DataSource; // dump this for now?
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
    generalClasses: {
        tabs?: string; // this the whole group of tabs? `tabsElement`?
        yearsDropdown?: string;
        pageHeadings?: string;
        observationLabelTitle?: string;
        observationLabelDate?: string;
        observationLabelName?: string;
        observersList?: string;
        statsCountSummary?: string;
        tabDesc?: string;
    };
}


/**
 * TODO
 * ----
 * This component got too big too fast. The existing interface isn't great: you pass in taxonId, placeId as
 * separate props, then ALSO include them within the `config` prop. This allows the component to work for both LOCAL
 * dev. This top-level component sorts out all the appropriate props + passes them to the individual tab components
 * which either pings iNat directly or loads from the prefab source. Handy for local dev, but makes for a confusing
 * interface for consumers.
 *
 * Options:
 * - rethink local dev + have a separate component?
 * - have 2 different sets of interfaces you can use for the component - one for local dev, one for consumers in the real world?
 *
 * I don't like the fussiness of the taxonInfo data + how it constructs the URL filename, either. Means more props.
 */
const TaxonPanel = ({ taxonId, placeId, dataSource, config, baseUrl, itemWidth, classes, tabDescs }: TaxonPanelProps) => {
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
                    classes,
                    tabDesc: tabDescs?.recentDesc
                };
                if (dataSource === DataSource.url) {
                    props.dataUrl = baseUrl + '/' + getSourceFile(Feature.recentObservations, taxonInfo, placeInfo);
                } else {
                    props.placeId = placeId;
                    props.taxonId = taxonId;
                }
                if (classes?.recentObservationsPanel) {
                    props.className = classes?.recentObservationsPanel;
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
                    year,
                    tabDesc: tabDescs?.mostCommonDesc
                };
                if (dataSource === DataSource.url) {
                    props.dataUrl = baseUrl + '/' + getSourceFile(Feature.commonTaxa, taxonInfo, placeInfo, year);
                } else {
                    props.placeId = placeId;
                    props.taxonId = taxonId;
                }
                if (classes?.commonTaxaPanel) {
                    props.className = classes?.commonTaxaPanel;
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
                    year,
                    tabDesc: tabDescs?.mostFavouritedDesc
                };
                if (dataSource === DataSource.url) {
                    props.dataUrl = baseUrl + '/' + getSourceFile(Feature.favourites, taxonInfo, placeInfo, year);
                } else {
                    props.placeId = placeId;
                    props.taxonId = taxonId;
                }
                if (classes?.favouritesPanel) {
                    props.className = classes?.favouritesPanel;
                }
                return (
                    <Favourites {...props} />
                );
            }

            case Tab.stats: {
                const props: any = {
                    classes,
                    source: dataSource,
                    year,
                    tabDesc: tabDescs?.generalStatsDesc
                };
                if (dataSource === DataSource.url) {
                    props.dataUrl = baseUrl + '/' + getSourceFile(Feature.stats, taxonInfo, placeInfo, year);
                } else {
                    props.placeId = placeId;
                    props.taxonId = taxonId;
                }
                if (classes?.statsPanel) {
                    props.className = classes?.statsPanel;
                }
                return <Summary {...props} />;
            }
        }
    };

    const tabsClass = classes?.tabs || '';
    const yearDropdownClass = classes?.yearsDropdown || '';

    const getNumYears = () => {
        let numYears = C.DEFAULT_NUM_YEARS;
        switch (tab) {
            case Tab.commonTaxa: {
                numYears = config.features?.commonTaxa?.numYears || C.DEFAULT_NUM_YEARS;
                break;
            }
            case Tab.favourites: {
                numYears = config.features?.favourites?.numYears || C.DEFAULT_NUM_YEARS;
                break;
            }
            case Tab.stats: {
                numYears = config.features?.stats?.numYears || C.DEFAULT_NUM_YEARS;
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
                features={config.features}
                className={tabsClass}
            />
            <div>
                {tab !== Tab.recent && (
                    <div style={{ float: "right" }} className={yearDropdownClass}>
                        <Years value={year} onChange={setYear} numYears={getNumYears()} />
                    </div>
                )}
                <h1 className={classes?.pageHeadings}>{titles[tab]}</h1>
            </div>
            {getCurrentTab()}
        </div>
    );
}

export default TaxonPanel;
