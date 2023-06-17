import React from "react";
import { numberWithCommas, DataSource, getSummary, GeneralClasses } from "../../__shared";
import { ObserverList } from './ObserverList';
import Loader from "../loader/loader";
import { SeasonalityGraph } from "../seasonality-graph/seasonality-graph";
import styles from "./summary.module.scss";
import { useLoadSourceData } from "../../hooks/useLoadSourceData";

export type SummaryProps = {
    taxonId: number;
    placeId: number;
    year: number;
    source: DataSource;
    dataUrl?: string;
    generalClasses?: GeneralClasses;
    className?: string;
    tabDesc?: string;
    observersListClass?: string;
    statsCountSummaryClass?: string;
};

export const Summary = ({
    source,
    dataUrl,
    taxonId,
    placeId,
    year,
    generalClasses,
    className,
    tabDesc,
    observersListClass,
    statsCountSummaryClass
}: SummaryProps) => {
    const { loading, results: summaryData } = useLoadSourceData({
        year,
        taxonId,
        placeId,
        dataUrl,
        source,
        isSummaryData: true,

        // shim to standardize the response from the `action` method with a top-level `results` property. This
        // just lets the useLoadSourceData hook work for all tab components
        action: async (data) => {
            const results = await getSummary(data);

            return { results };
        }
    });

    let countSummaryClasses = styles.countSummary;
    if (statsCountSummaryClass) {
        countSummaryClasses += ` ${statsCountSummaryClass}`;
    }
    let descClasses = styles.tabDesc;
    if (generalClasses?.tabDesc) {
        descClasses += ` ${generalClasses.tabDesc}`;
    }

    let classList = styles.summaryPage;
    if (className) {
        classList += ` ${className}`;
    }

    return (
        <div className={classList}>
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
                    {summaryData.observers?.top && (
                        <ObserverList
                            observers={summaryData.observers.top}
                            className={observersListClass}
                            generalClasses={generalClasses}
                        />
                    )}
                </div>
            </section>
        </div>
    );
}
