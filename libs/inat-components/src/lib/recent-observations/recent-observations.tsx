import React, { useEffect, useState } from 'react';
import { Observation } from "../observation/observation";
import Loader from "../loader/loader";
import {getRecentObservations, RecentObservationData, RecentObservationsRespData} from "../api/recent-observations";
import * as C from "../../constants";
import styles from "./recent-observations.module.scss";
import generalStyles from "../shared/css/general.module.scss";
import {DataSource} from "../../typings";
import {NoResults} from "../no-results/no-results";
import {formatDate} from "../utils/date-utils";

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
        <div>{formatDate(obs.obsDate)}</div>
        <div>
            <a href={`${C.BASE_URL}/people/${obs.observerUsername}`}
               target="_blank"
               rel="noreferrer"
               onClick={(e) => e.stopPropagation()}>
                {obs.observerUsername}
            </a>
        </div>
    </div>
);

export const RecentObservations = ({
   taxonId,
   placeId,
   data,
   dataUrl,
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
    }, [source, taxonId, placeId, perPage]);

    useEffect(() => {
        if (source !== DataSource.url) {
            return;
        }

        if (!dataUrl) {
            console.error("Please supply a `dataUrl` prop for the `url` source prop option.");
            return;
        }

        (async () => {
            setLoading(true);
            const obs = await fetch(dataUrl);
            const json = await obs.json();
            setObservations(json.results);
            setLoading(false);
        })();
    }, [source, dataUrl]);

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
                {!loading && observations.length === 0 && <NoResults />}
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
