import React, {useState} from "react";
import {getSourceFile, Tab, DataSource, Feature} from "@imerss/inat-components-shared";
import { RecentObservations, RecentObservationsProps } from '../recent-observations/recent-observations';
import {CommonTaxa} from '../common-taxa/common-taxa';
import {Favourites} from "../favourites/favourites"
import {Summary} from "../summary/summary";
import Years from "../year-dropdown/year-dropdown";
import Tabs from "../tabs/tabs";
import {useFeatureTitles} from "../hooks/hooks";
import styles from '../shared/css/general.module.scss';

const TaxonPanel = ({ taxonId, placeId, dataSource, features, sourceFolder }: any) => {
    const [tab, setTab] = useState(Tab.recent);
    const [year, setYear] = useState<string>("all");
    const titles = useFeatureTitles(features);


    const getCurrentTab = () => {
        switch (tab) {
            case Tab.recent: {
                const props: Partial<RecentObservationsProps> = {
                    source: dataSource
                };
                if (dataSource === DataSource.url) {
                    props.dataUrl = sourceFolder + '/' + getSourceFile(Feature.recentObservations, taxonId, placeId);
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
                    props.dataUrl = sourceFolder + '/' + getSourceFile(Feature.commonTaxa, taxonId, placeId, year);
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
                    props.dataUrl = sourceFolder + '/' + getSourceFile(Feature.favourites, taxonId, placeId, year);
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
                    props.dataUrl = sourceFolder + '/' + getSourceFile(Feature.stats, taxonId, placeId, year);
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
                features={features}
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
