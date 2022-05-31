import React, { useEffect, useState } from 'react';
import { Observation } from "../observation/Observation";
import generalStyles from "../../css/general.module.css";
import { PageProps } from "../../general";
import * as C from "../../constants";

export const Favourites = ({ year, placeId, taxonId }: PageProps) => {
    const [observations, setObservations] = useState<any>([]);

    useEffect(() => {
        const getData = async () => {
            let url = `${C.BASE_URL}/v1/observations?verifiable=true&order_by=votes&order=desc&page=1&spam=false&place_id=${placeId}&taxon_id=${taxonId}&locale=en-US&per_page=${C.PER_PAGE}`;
            if (year) {
                url += `&d1=${year}-01-01&d1=${year}-12-31`;
            }
            const response = await fetch(url);
            const obs = await response.json();
            setObservations(obs.results);
        };
        getData();
    }, [year, placeId, taxonId]);

    return (
        <div className={generalStyles.grid}>
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