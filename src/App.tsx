import React, { useState } from 'react';
import { RecentObservations } from './components/recentObservations/RecentObservations';
import { PopularTaxa } from './components/popularTaxa/Taxa';
import { Favourites } from "./components/favourites/Favourites"
import styles from './css/general.module.css';

const enum Page {
    recent = "recent",
    favourites = "favourites",
    popularSpecies = "popularSpecies",
    stats = "stats"
}

function App() {
    const [page, setPage] = useState(Page.recent);

    return (
        <div className={styles.page}>
            <select onChange={(e) => setPage(e.target.value as Page)}>
                <option value={Page.recent}>Recent</option>
                <option value={Page.favourites}>Most favourited</option>
                <option value={Page.popularSpecies}>Most Popular Species</option>
                <option value={Page.stats}>Stats</option>
            </select>
            {page === Page.recent && <RecentObservations />}
            {page === Page.favourites && <Favourites />}
            {page === Page.popularSpecies && <PopularTaxa />}
        </div>
    );
}

export default App;
