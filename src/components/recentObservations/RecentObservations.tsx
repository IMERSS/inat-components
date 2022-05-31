import React, { useEffect, useState } from 'react';
import { Observation } from "../observation/Observation";
import styles from "./RecentObservations.module.css";
import * as C from "../../constants";

export const RecentObservations = ({ taxonId, placeId }: any) => {
    const [observations, setObservations] = useState<any>([]);

    useEffect(() => {
        const getData = async () => {
            let url = `${C.BASE_URL}/v1/observations?photos=true&per_page=${C.PER_PAGE}&taxon_id=${taxonId}&place_id=${placeId}&order=desc&order_by=observed_on`;
            const response = await fetch(url);
            const obs = await response.json();
            setObservations(obs.results);
        };
        getData();
    }, [taxonId, placeId]);

    return (
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
    );
};
