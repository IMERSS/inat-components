import React, { useEffect, useState } from 'react';
import { Observation } from "../observation/Observation";
import Loader from "../loader/Loader";
import generalStyles from "../../css/general.module.scss";
import * as C from "../../constants";
import {getRecentObservations} from "../../utils/api";

export enum DataSource {
    autoLoad = "autoLoad",
    dataProp = "dataProp",
    url = "url"
}

export type RecentObservationsProps = {
    source?: DataSource;
    taxonId?: number;
    placeId?: number;
    perPage?: number;
    data?: any; // TODO type
    dataUrl?: string;
    components?: {
        loader?: JSX.Element;
    };
}

export const RecentObservations = ({
    source,
    taxonId,
    placeId,
    data,
    perPage = C.PER_PAGE,
    components
}: RecentObservationsProps) => {
    const [loading, setLoading] = useState(false);
    const [observations, setObservations] = useState<any>(() => (source === DataSource.dataProp) ? data : []);

    useEffect(() => {
        if (source !== DataSource.autoLoad) {
            return;
        }
        if (!taxonId) {
            console.error("Please see documentation. By default the component will auto-load the data from iNat. Please supply a taxonId prop.");
            return;
        }
        if (!placeId) {
            console.error("Please see documentation. By default the component will auto-load the data from iNat. Please supply a placeId prop.");
            return;
        }

        setLoading(true);
        getRecentObservations({ taxonId, placeId, perPage, onSuccess: (obs: any) => {
            setObservations(obs);
            setLoading(false);
        }});
    }, [source, taxonId, placeId]);

    const Load = components?.loader ? components.loader as any : Loader;
    return (
        <div style={{ position: "relative" }}>
            <Load loading={loading} />
            <div className={generalStyles.grid}>
                {observations.map((obs: any) => {
                    let name = obs?.taxon?.name || "";
                    if (obs?.taxon.preferred_common_name) {
                        name = obs?.taxon.preferred_common_name;
                    }

                    return (
                        <Observation
                            key={obs.id}
                            imageUrl={obs.observation_photos[0].photo.url.replace(/square/, "medium")}
                            linkUrl={obs.uri}>
                            <div className={generalStyles.obsLabel}>
                                <h3>{name}</h3>
                                <div>{obs.observed_on_string}</div>
                                <div>{obs.user.login}</div>
                            </div>
                        </Observation>
                    );
                })}
            </div>
        </div>
    );
};
