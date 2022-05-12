import React, { useEffect, useState } from 'react';
import { Observation } from "../observation/Observation";
import styles from "./RecentObservations.module.css";
import * as C from "../../constants";

export const RecentObservations = () => {
    // const [totalResults, setTotalResults] = useState(null); // note this only includes photos
    const [observations, setObservations] = useState<any>([]);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(
                `${C.BASE_URL}/v1/observations?photos=true&per_page=${C.PER_PAGE}&taxon_id=${C.TAXON_ID}&place_id=${C.REGION_ID}&order=desc&order_by=observed_on`
            );
            const obs = await response.json();
            setObservations(obs.results);
            // setTotalResults(obs.total_results);
        };
        getData();
    }, []);

    return (
        <div>
            <h1>Recent observations</h1>

            <div className={styles.grid}>
                {observations.map((obs: any) => {
                    return (
                        <Observation
                            key={obs.id}
                            imageUrl={obs.observation_photos[0].photo.url.replace(/square/, "medium")}
                            taxonName={obs.taxon ? obs.taxon.name : ""}
                            observationId={obs.id}
                            seenBy={obs.user.login}
                            obsDate={obs.observed_on_string}
                            linkUrl={obs.uri}
                        />
                    );
                })}
            </div>
        </div>
    );
};
