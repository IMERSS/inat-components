import React, { useEffect, useState } from 'react';
import { Observation } from "../observation/Observation";
import generalStyles from "../../css/general.module.scss";
import {getRecentObservations} from "../../utils/api";

export const RecentObservations = ({ taxonId, placeId, setLoading }: any) => {
    const [observations, setObservations] = useState<any>([]);

    useEffect(() => {
        setLoading(true);
        getRecentObservations(taxonId, placeId, (obs: any) => {
            setObservations(obs);
            setLoading(false);
        });
    }, [taxonId, placeId, setLoading]);

    return (
        <div className={generalStyles.grid}>
            {observations.map((obs: any) => {
                return (
                    <Observation
                        key={obs.id}
                        imageUrl={obs.observation_photos[0].photo.url.replace(/square/, "medium")}
                        linkUrl={obs.uri}>
                        <div className={generalStyles.obsLabel}>
                            <h3>{obs.taxon ? obs.taxon.name : ""}</h3>
                            <div>{obs.observed_on_string}</div>
                            <div>{obs.user.login}</div>
                        </div>
                    </Observation>
                );
            })}
        </div>
    );
};
