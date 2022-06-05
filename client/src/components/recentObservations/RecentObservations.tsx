import React, { useEffect, useState } from 'react';
import { Observation } from "../observation/Observation";
import Loader from "../loader/Loader";
import {getRecentObservations, RecentObservationData, RecentObservationsRespData} from "../../utils/recentObservations";
import * as C from "../../constants";
import styles from "./RecentObservations.module.scss";
import generalStyles from "../../css/general.module.scss";

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
    data?: RecentObservationsRespData;
    dataUrl?: string;
    components?: {
        loader?: JSX.Element;
        label?: JSX.Element;
    };
    className?: string;
}

export const RecentObservationLabel = (obs: RecentObservationData) => (
    <div className={generalStyles.obsLabel}>
        <h3>{obs.taxonCommonName || obs.taxonName}</h3>
        <div>{obs.obsDate}</div>
        <div>{obs.observerUsername}</div>
    </div>
);

export const RecentObservations = ({
    taxonId,
    placeId,
    data,
    source = DataSource.autoLoad,
    perPage = C.PER_PAGE,
    components,
    className
}: RecentObservationsProps) => {
    const [loading, setLoading] = useState(false);
    const [observations, setObservations] = useState<any>(() => (source === DataSource.dataProp) ? data : []);

    useEffect(() => {
        if (source !== DataSource.autoLoad) {
            return;
        }
        if (!taxonId) {
            console.error("Please supply a `taxonId` prop for the `autoLoad` source prop option.");
            return;
        }
        if (!placeId) {
            console.error("Please supply a `placeId` prop for the `autoLoad` source prop option.");
            return;
        }

        (async () => {
            setLoading(true);
            const obs = await getRecentObservations({ taxonId, placeId, perPage });
            setObservations(obs.results);
            setLoading(false);
        })();
    }, [source, taxonId, placeId]);

    const Load = components?.loader ? components.loader as any : Loader;
    const Label = components?.label ? components.label as any : RecentObservationLabel;

    let classes = styles.panel;
    if (className) {
        classes += ` ${className}`;
    }
    return (
        <div className={classes}>
            <Load loading={loading} />
            <div className={generalStyles.grid}>
                {observations.map((obs: RecentObservationData) => (
                    <Observation
                        key={obs.id}
                        imageUrl={obs.imageUrl.replace(/square/, "medium")}
                        linkUrl={obs.obsUrl}>
                        <Label {...obs} />
                    </Observation>
                ))}
            </div>
        </div>
    );
};
