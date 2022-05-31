import React, {useEffect, useState} from 'react';
import {Observation} from "../observation/Observation";
import generalStyles from "../../css/general.module.css";
import * as C from "../../constants";

export const PopularTaxa = () => {
    const [observations, setObservations] = useState<any>([]);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(
                `${C.BASE_URL}/v1/observations/species_counts?verifiable=true&spam=false&place_id=${C.REGION_ID}&taxon_id=${C.TAXON_ID}&d1=2022-01-01&locale=en-US&per_page=${C.PER_PAGE}`
            );
            const obs = await response.json();
            setObservations(obs.results);
        };
        getData();
    }, []);

    return (
        <div>
            <h1>Most popular species of 2022</h1>

            <div className={generalStyles.grid}>
                {observations.map(({ taxon }: any) => {
                    console.log(taxon);

                    const url = `https://www.inaturalist.org/taxa/${taxon.id}`;

                    return (
                        <Observation
                            key={taxon.id}
                            imageUrl={taxon.default_photo.url.replace(/square/, "medium")}
                            taxonName={taxon.name}
                            observationId={taxon.id}
                            seenBy={""}
                            obsDate={""}
                            linkUrl={url}
                        />
                    );
                })}
            </div>
        </div>
    )
};