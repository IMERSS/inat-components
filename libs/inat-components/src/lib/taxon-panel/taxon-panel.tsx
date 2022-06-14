import React, {useState} from 'react';
import { RecentObservations, RecentObservationsProps } from '../recent-observations/recent-observations';
import {CommonTaxa} from '../common-taxa/common-taxa';
import {Favourites} from "../favourites/favourites"
import {Summary} from "../summary/summary";
import Years from "../year-dropdown/year-dropdown";

// import SettingsRow from "../settings-row/SettingsRow";

import * as C from "../../constants";
import {Tab} from "../../typings";
import Tabs from "../tabs/tabs";

// TODO
import {getDemoFileUrl} from "./demo.config";

import styles from '../shared/css/general.module.scss';
import {DataSource, INatApi} from "../../typings";


const TaxonPanel = ({ taxonId, placeId, dataSource }: any) => {
    const [tab, setTab] = useState(Tab.recent);
    const [year, setYear] = useState<string>("all");

    const getTitle = () => {
        const map = {
            [Tab.recent]: "Recent observations",
            [Tab.mostCommon]: "Most common",
            [Tab.favourites]: "Most favourited",
            [Tab.stats]: "General stats",
        };
        return map[tab];
    }

    const getCurrentTab = () => {
        switch (tab) {
            case Tab.recent: {
                const props: Partial<RecentObservationsProps> = {
                    source: dataSource
                };
                if (dataSource === DataSource.url) {
                    props.dataUrl = getDemoFileUrl(INatApi.recentObservations, taxonId, placeId);
                } else {
                    props.placeId = placeId;
                    props.taxonId = taxonId;
                }

                return (
                    <RecentObservations {...props} />
                );
            }

            case Tab.mostCommon: {
                const props: any = {
                    source: dataSource,
                    year
                };
                if (dataSource === DataSource.url) {
                    props.dataUrl = getDemoFileUrl(INatApi.commonTaxa, taxonId, placeId, year);
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
                    props.dataUrl = getDemoFileUrl(INatApi.favourites, taxonId, placeId, year);
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
                    props.dataUrl = getDemoFileUrl(INatApi.stats, taxonId, placeId, year);
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
            <Tabs selectedTab={tab} onChangeTab={setTab} />
            <div>
                {tab !== Tab.recent && (
                    <div style={{ float: "right" }}>
                        <Years value={year} onChange={setYear} />
                    </div>
                )}
                <h1>{getTitle()}</h1>
            </div>
            {getCurrentTab()}
        </div>
    );
}

export default TaxonPanel;
