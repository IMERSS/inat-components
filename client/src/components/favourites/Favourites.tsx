import React, { useEffect, useState } from 'react';
import { Observation } from "../observation/Observation";
import generalStyles from "../../css/general.module.scss";
import Loader from "../loader/Loader";
import {getFavourites} from "../../utils/favourites";
import {DataSource} from "../../typings";
import {FavouritesRespData, FavouritesData} from "../../utils/favourites";
import * as C from "../../constants";
import styles from "../recentObservations/RecentObservations.module.scss";

export type FavouritesProps = {
    year: string;
    source?: DataSource;
    taxonId?: number;
    placeId?: number;
    perPage?: number;
    data?: FavouritesRespData;
    dataUrl?: string;
    components?: {
        loader?: JSX.Element;
        label?: JSX.Element;
    };
    className?: string;
}

export const FavouritesLabel = (data: FavouritesData) => (
    <div className={generalStyles.obsLabel}>
        <h3>{data.taxonCommonName || data.taxonName}</h3>
        <div>{data.observerUsername}</div>
        <div>{data.obsDate}</div>
        <label className={generalStyles.count}>{data.numFaves}</label>
    </div>
);

export const Favourites = ({
    year,
    source,
    taxonId,
    placeId,
    perPage = C.PER_PAGE,
    data,
    dataUrl,
    components,
    className
}: FavouritesProps) => {
    const [observations, setObservations] = useState<any>(() => (source === DataSource.dataProp) ? data : []);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (source !== DataSource.autoLoad) {
            return;
        }

        // console.log({ source, year, placeId, taxonId, perPage });

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
            const resp = await getFavourites({ taxonId, placeId, year, perPage });
            setObservations(resp.results);
            setLoading(false);
        })();
    }, [source, year, placeId, taxonId, perPage]);

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
    const Label = components?.label ? components.label as any : FavouritesLabel;

    let classes = styles.panel;
    if (className) {
        classes += ` ${className}`;
    }
    return (
        <div className={classes}>
            <Load loading={loading} />
            <div className={generalStyles.grid}>
                {observations.map((obs: any) => (
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