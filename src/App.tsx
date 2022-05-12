import React, { useState } from 'react';
import { RecentObservations } from "./components/recentObservations/RecentObservations";
// import { PopularSpecies } from "./components/popularSpecies/"
import { Favourites } from "./components/favourites/Favourites"
import './App.css';

const enum Page {
    recent = "recent",
    favourites = "favourites",
    popularSpecies = "popularSpecies",
    stats = "stats"
}

function App() {
    const [page, setPage] = useState(Page.favourites);

    return (
        <div className="App">
            <select onChange={(e) => setPage(e.target.value as Page)}>
                <option value={Page.recent}>Recent</option>
                <option value={Page.favourites}>Most favourited</option>
                <option value={Page.popularSpecies}>Most Popular Species</option>
                <option value={Page.stats}>Stats</option>
            </select>
            {page === Page.recent && <RecentObservations />}
            {page === Page.favourites && <Favourites />}
        </div>
    );
}

export default App;
