import React, { useEffect, useState } from 'react';
import { Observation } from "../observation/Observation";
import generalStyles from "../../css/general.module.scss";
import { PageProps } from "../../general";
import Loader from "../loader/Loader";
import {getFavourites} from "../../utils/api";
import styles from "./Favourites.module.scss";

export const Favourites = ({ year, placeId, taxonId }: PageProps) => {
    const [observations, setObservations] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getFavourites(taxonId, placeId, year, (obs: any) => {
            setLoading(false);
            setObservations(obs);
        });
    }, [year, placeId, taxonId]);

    return (
        <div style={{ position: 'relative' }}>
            <Loader loading={loading} />
            <div className={generalStyles.grid}>
                {observations.map((obs: any) => {
                    return (
                        <Observation
                            key={obs.id}
                            imageUrl={obs.observation_photos[0].photo.url.replace(/square/, "medium")}
                            linkUrl={obs.uri}>
                            <div className={generalStyles.obsLabel}>
                                <h3>{obs.taxon ? obs.taxon.name : ""}</h3>
                                <div>{obs.user.login}</div>
                                <div>{obs.observed_on_string}</div>
                                <label className={styles.numFaves}>{obs.faves.length}</label>
                            </div>
                        </Observation>
                    );
                })}
            </div>
        </div>
    );
};