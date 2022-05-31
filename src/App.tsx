import React, { useState } from 'react';
import { RecentObservations } from './components/recentObservations/RecentObservations';
import { PopularTaxa } from './components/popularTaxa/Taxa';
import { Favourites } from "./components/favourites/Favourites"
import styles from './css/general.module.css';
import Years from "./components/yearDropdown/Years";
import Settings from "./components/settings/Settings";
import * as C from "./constants";

const enum Page {
    recent = "recent",
    favourites = "favourites",
    popularSpecies = "popularSpecies",
    stats = "stats"
}

function App() {
    const [page, setPage] = useState(Page.recent);
    const [year, setYear] = useState("all");
    const [taxonId, setTaxonId] = useState(C.DEFAULT_TAXON_ID);
    const [placeId, setPlaceId] = useState(C.DEFAULT_PLACE_ID);

    const getTitle = () => {
        const map = {
            [Page.recent]: "Recent observations",
            [Page.favourites]: "Most favourited",
            [Page.popularSpecies]: "Popular species",
            [Page.stats]: "General stats",
        };
        return map[page];
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
                <select onChange={(e) => setPage(e.target.value as Page)}>
                    <option value={Page.recent}>Recent</option>
                    <option value={Page.favourites}>Most favourited</option>
                    <option value={Page.popularSpecies}>Most Popular Species</option>
                    <option value={Page.stats}>Stats</option>
                </select>

                <div>
                    {page !== Page.recent && (
                        <div style={{ float: "right" }}>
                            <Years value={year} onChange={setYear} />
                        </div>
                    )}
                    <h1>{getTitle()}</h1>
                </div>

                {page === Page.recent && <RecentObservations taxonId={taxonId} placeId={placeId} />}
                {page === Page.favourites && <Favourites year={year} taxonId={taxonId} placeId={placeId} />}
                {page === Page.popularSpecies && <PopularTaxa year={year} taxonId={taxonId} placeId={placeId} />}
            </div>
        </>
    );
}

export default App;
