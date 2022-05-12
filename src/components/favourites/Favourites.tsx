import React, { useEffect, useState } from 'react';
import { Observation } from "../observation/Observation";
import styles from "./Favourites.module.css";
import * as C from "../../constants";

export const Favourites = () => {
    const [observations, setObservations] = useState<any>([]);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(
                `${C.BASE_URL}/v1/observations?verifiable=true&order_by=votes&order=desc&page=1&spam=false&place_id=${C.REGION_ID}&taxon_id=${C.TAXON_ID}&d1=2022-01-01&locale=en-US&per_page=${C.PER_PAGE}`
            );
            const obs = await response.json();
            setObservations(obs.results);
        };
        getData();
    }, []);

    return (
        <div>
            <h1>Favourite observations of 2022</h1>

            <div className={styles.grid}>
                {observations.map((obs: any) => {
                    console.log(obs);
                    // obs.faves.length

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