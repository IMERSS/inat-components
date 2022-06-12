import React, {useState} from 'react';
import {
    RecentObservations,
    RecentObservationsProps
} from '../recentObservations/RecentObservations';
import {CommonTaxa} from '../commonTaxa/Taxa';
import {Favourites} from "../favourites/Favourites"
import {Summary} from "../summary/Summary";
import Years from "../yearDropdown/Years";
import Settings from "../settingsRow/Settings";
import * as C from "../../constants";
import {Tab} from "../../general";
import Tabs from "../tabs/Tabs";
import {getDemoFileUrl} from "../../demo.config";
import styles from '../../css/general.module.scss';
import {DataSource, INatApi} from "../../typings";


const TaxonPanel = () => {
    const [tab, setTab] = useState(Tab.recent);
    const [year, setYear] = useState<string>("all");
    const [taxonId, setTaxonId] = useState(C.DEFAULT_TAXON_ID);
    const [placeId, setPlaceId] = useState(C.DEFAULT_PLACE_ID);
    const [dataSource, setDataSource] = useState(DataSource.autoLoad);

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
        <>
            <Settings
                taxonId={taxonId}
                onChangeTaxon={setTaxonId}
                placeId={placeId}
                onChangePlace={setPlaceId}
                dataSource={dataSource}
                onChangeDataSource={setDataSource}
            />
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
        </>
    );
}

export default TaxonPanel;
