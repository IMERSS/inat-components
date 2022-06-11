import React, {useEffect, useState} from "react";
import {getSummary} from "../../api/summary";
import {numberWithCommas} from "../../utils/numberUtils";
import { ObserverList } from "./ObserverList";
import Loader from "../loader/Loader";
import {Seasonality} from "../seasonalityGraph/Seasonality";
import styles from "./Summary.module.scss";

export type SummaryProps = {
    taxonId: number;
    placeId: number;
};

export const Summary = ({ taxonId, placeId }: SummaryProps) => {
    const [data, setSummaryData] = useState<any>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const data = await getSummary(taxonId, placeId);
            setSummaryData(data);
            setLoading(false);
        })();
    }, [placeId, taxonId]);

    return (
        <div style={{ position: 'relative' }}>
            <Loader loading={loading} />

            <ul className={styles.countSummary}>
                <li>Total number of observers: <b>{data.observers?.totalCount ? numberWithCommas(data.observers.totalCount): ""}</b></li>
                <li>Total number of observations: <b>{data.observations?.totalCount ? numberWithCommas(data.observations.totalCount): ""}</b></li>
            </ul>

            <div style={{ width: 600, height: 400, float: "right"}}>
                <h1>Seasonality</h1>
                {data.seasonalityData && <Seasonality data={data.seasonalityData.monthOfYear} />}
            </div>

            <div style={{ width: 300 }}>
                <h1>Top observers</h1>
                {data.observers?.top && <ObserverList observers={data.observers.top} />}
            </div>
        </div>
    );
}