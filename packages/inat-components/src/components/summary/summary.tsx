import React, {useEffect, useState} from "react";
import {BaseClasses, numberWithCommas, DataSource, getSummary, FavouritesRespData} from "../../__shared";
import { ObserverList } from './ObserverList';
import Loader from "../loader/loader";
import {SeasonalityGraph} from "../seasonality-graph/seasonality-graph";
import styles from "./summary.module.scss";

export type SummaryProps = {
    source: DataSource;
    taxonId: number;
    placeId: number;
    year: string | number;
    data?: FavouritesRespData;
    dataUrl?: string;
    classes?: BaseClasses;
    tabDesc?: string;
};

export const Summary = ({ source, data, dataUrl, taxonId, placeId, year, classes, tabDesc }: SummaryProps) => {
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

    let countSummaryClasses = styles.countSummary;
    if (classes?.statsCountSummary) {
        countSummaryClasses += ` ${classes.statsCountSummary}`;
    }
    let descClasses = styles.tabDesc;
    if (classes?.tabDesc) {
        descClasses += ` ${classes.tabDesc}`;
    }

    return (
        <div className={styles.summaryPage}>
            {tabDesc && <p className={descClasses}>{tabDesc}</p>}
            <Loader loading={loading} />
            <ul className={countSummaryClasses}>
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
                    {summaryData.observers?.top && <ObserverList observers={summaryData.observers.top} className={classes?.observersList} />}
                </div>
            </section>
        </div>
    );
}