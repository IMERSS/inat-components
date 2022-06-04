import React, { useState } from 'react';
import { RecentObservations } from '../components/recentObservations/RecentObservations';
import { CommonTaxa } from '../components/commonTaxa/Taxa';
import { Favourites } from "../components/favourites/Favourites"
import styles from '../css/general.module.scss';
import Years from "../components/yearDropdown/Years";
import Settings from "./settings/Settings";
import * as C from "../constants";
import {Tab} from "../general";
import Tabs from "../components/tabs/Tabs";
import {Summary} from "../components/summary/Summary";

function App() {
    const [tab, setTab] = useState(Tab.recent);
    const [year, setYear] = useState("all");
    const [taxonId, setTaxonId] = useState(C.DEFAULT_TAXON_ID);
    const [placeId, setPlaceId] = useState(C.DEFAULT_PLACE_ID);

    const getTitle = () => {
        const map = {
            [Tab.recent]: "Recent observations",
            [Tab.mostCommon]: "Most common",
            [Tab.favourites]: "Most favourited",
            [Tab.stats]: "General stats",
        };
        return map[tab];
    }

    return (
        <>
            <Settings
                taxonId={taxonId}
                onChangeTaxon={setTaxonId}
                placeId={placeId}
                onChangePlace={setPlaceId}
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

                {tab === Tab.recent && <RecentObservations taxonId={taxonId} placeId={placeId} />}
                {tab === Tab.mostCommon && <CommonTaxa year={year} taxonId={taxonId} placeId={placeId} />}
                {tab === Tab.favourites && <Favourites year={year} taxonId={taxonId} placeId={placeId} />}
                {tab === Tab.stats && <Summary taxonId={taxonId} placeId={placeId} />}
            </div>
        </>
    );
}

export default App;
