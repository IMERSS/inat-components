import React, {useEffect, useState} from "react";
import {DataSource} from "../../";
import {getSummary, FavouritesRespData} from "../../../../shared/src/api";
import {numberWithCommas} from "../../../../shared/src/utils";
import { ObserverList } from './ObserverList';
import Loader from "../loader/loader";
import {SeasonalityGraph} from "../seasonality-graph/seasonality-graph";
import styles from "./summary.module.scss";

export type SummaryProps = {
    source: DataSource;
    taxonId: number;
    placeId: number;
    year: string | number;
    data?: FavouritesRespData; /// TODO this right? Sure looks wrong
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
        <div className={styles.summaryPage}>
            <Loader loading={loading} />

            <ul className={styles.countSummary}>
                <li>Total number of observers: <b>{summaryData.observers?.totalCount ? numberWithCommas(summaryData.observers.totalCount): ""}</b></li>
                <li>Total number of observations: <b>{summaryData.observations?.totalCount ? numberWithCommas(summaryData.observations.totalCount): ""}</b></li>
            </ul>

            <section>
                <div className={styles.seasonalityBlock}>
                    <h1>Seasonality</h1>
                    {summaryData.seasonalityData && <SeasonalityGraph data={summaryData.seasonalityData.monthOfYear} />}
                </div>

                <div className={styles.observersBlock}>
                    <h1>Top observers</h1>
                    {summaryData.observers?.top && <ObserverList observers={summaryData.observers.top} />}
                </div>
            </section>
        </div>
    );
}