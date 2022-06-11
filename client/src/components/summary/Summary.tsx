import React, {useEffect, useState} from "react";
import {getSummary} from "../../api/summary";
import {numberWithCommas} from "../../utils/numberUtils";
import { ObserverList } from "./ObserverList";
import Loader from "../loader/Loader";
import {Seasonality} from "../seasonalityGraph/Seasonality";
import styles from "./Summary.module.scss";
import {DataSource} from "../../typings";
import {FavouritesRespData} from "../../api/favourites";

export type SummaryProps = {
    source: DataSource;
    taxonId: number;
    placeId: number;
    year: string | number;
    data?: FavouritesRespData;
    dataUrl?: string;
};

export const Summary = ({ source, data, dataUrl, taxonId, placeId, year }: SummaryProps) => {
    const [summaryData, setSummaryData] = useState<any>({});
    const [loading, setLoading] = useState(false);

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
            const data = await getSummary({ taxonId, placeId, year });
            setSummaryData(data);
            setLoading(false);
        })();
    }, [source, year, placeId, taxonId]);

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
            setSummaryData(json);
            setLoading(false);
        })();
    }, [source, dataUrl]);

    return (
        <div style={{ position: 'relative' }}>
            <Loader loading={loading} />

            <ul className={styles.countSummary}>
                <li>Total number of observers: <b>{summaryData.observers?.totalCount ? numberWithCommas(summaryData.observers.totalCount): ""}</b></li>
                <li>Total number of observations: <b>{summaryData.observations?.totalCount ? numberWithCommas(summaryData.observations.totalCount): ""}</b></li>
            </ul>

            <div style={{ width: 600, height: 400, float: "right"}}>
                <h1>Seasonality</h1>
                {summaryData.seasonalityData && <Seasonality data={summaryData.seasonalityData.monthOfYear} />}
            </div>

            <div style={{ width: 300 }}>
                <h1>Top observers</h1>
                {summaryData.observers?.top && <ObserverList observers={summaryData.observers.top} />}
            </div>
        </div>
    );
}