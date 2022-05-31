import React, {useEffect, useState} from 'react';
import {Observation} from "../observation/Observation";
import generalStyles from "../../css/general.module.css";
import {PageProps} from "../../general";
import * as C from "../../constants";

export const PopularTaxa = ({ year, taxonId, placeId }: PageProps) => {
    const [taxa, setTaxa] = useState<any>([]);

    useEffect(() => {
        const getData = async () => {
            let url = `${C.BASE_URL}/v1/observations/species_counts?verifiable=true&spam=false&place_id=${placeId}&taxon_id=${taxonId}&locale=en-US&per_page=${C.PER_PAGE}`;
            if (year !== "all") {
                url += `&d1=${year}-01-01&d2=${year}-12-31`;
            }

            const response = await fetch(url);
            const resp = await response.json();
            const sortedTaxa = resp.results.sort((a: any, b: any) => {
                if (a.taxon.observations_count > b.taxon.observations_count) {
                    return -1;
                } else if (a.taxon.observations_count < b.taxon.observations_count) {
                    return 1;
                }
                return 0;
            })
            setTaxa(sortedTaxa);
        };

        getData();
    }, [year]);

    return (
        <div className={generalStyles.grid}>
            {taxa.map(({ taxon }: any) => {
                const url = `https://www.inaturalist.org/taxa/${taxon.id}`;

                return (
                    <Observation
                        key={taxon.id}
                        imageUrl={taxon.default_photo.url.replace(/square/, "medium")}
                        taxonName={taxon.name}
                        observationId={taxon.id}
                        seenBy={taxon.observations_count}
                        obsDate={""}
                        linkUrl={url}
                    />
                );
            })}
        </div>
    )
};