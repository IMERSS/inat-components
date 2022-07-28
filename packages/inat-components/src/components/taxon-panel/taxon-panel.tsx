import React, {useState} from "react";
import {getSourceFile, Tab, DataSource, Feature} from "../../__shared";
import {RecentObservations, RecentObservationsProps} from '../recent-observations/recent-observations';
import {CommonTaxa} from '../common-taxa/common-taxa';
import {Favourites} from "../favourites/favourites"
import {Summary} from "../summary/summary";
import Years from "../year-dropdown/year-dropdown";
import Tabs from "../tabs/tabs";
import {useFeatureTitles} from "../hooks/hooks";
import styles from '../shared/css/general.module.scss';

const TaxonPanel = ({ taxonId, placeId, dataSource, config, baseURL }: any) => {
    const [tab, setTab] = useState(Tab.recent);
    const [year, setYear] = useState<string>("all");
    const titles = useFeatureTitles(config.features);
    const [taxonInfo] = useState(() => config.taxa.find((i) => i.taxonId === taxonId));
    const [placeInfo] = useState(() => config.places.find((i) => i.placeId === placeId));

    const getCurrentTab = () => {
        switch (tab) {
            case Tab.recent: {
                const props: Partial<RecentObservationsProps> = {
                    source: dataSource
                };
                if (dataSource === DataSource.url) {
                    props.dataUrl = baseURL + '/' + getSourceFile(Feature.recentObservations, taxonInfo, placeInfo);
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
                    source: dataSource,
                    year
                };
                if (dataSource === DataSource.url) {
                    props.dataUrl = baseURL + '/' + getSourceFile(Feature.commonTaxa, taxonInfo, placeInfo, year);
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
                    source: dataSource,
                    year
                };
                if (dataSource === DataSource.url) {
                    props.dataUrl = baseURL + '/' + getSourceFile(Feature.favourites, taxonInfo, placeInfo, year);
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
                    source: dataSource,
                    year
                };
                if (dataSource === DataSource.url) {
                    props.dataUrl = baseURL + '/' + getSourceFile(Feature.stats, taxonInfo, placeInfo, year);
                } else {
                    props.placeId = placeId;
                    props.taxonId = taxonId;
                }
                return <Summary {...props} />;
            }
        }
    };

    return (
        <div className={styles.page}>
            <Tabs
                selectedTab={tab}
                onChangeTab={setTab}
                features={config.features}
            />
            <div>
                {tab !== Tab.recent && (
                    <div style={{ float: "right" }}>
                        <Years value={year} onChange={setYear} />
                    </div>
                )}
                <h1>{titles[tab]}</h1>
            </div>
            {getCurrentTab()}
        </div>
    );
}

export default TaxonPanel;
