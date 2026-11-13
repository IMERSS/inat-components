import React from "react";
import { numberWithCommas, C, DataSource, getSummary, GeneralClasses, BaseComponentProps } from "@imerss/inat-components-shared";
import { ObserverList } from './ObserverList';
import Loader from "../loader/loader";
import LoadError from "../error/error";
import { SeasonalityGraph } from "../seasonality-graph/seasonality-graph";
import styles from "./summary.module.css";
import { useLoadSourceData } from "../../hooks/useLoadSourceData";

export type SummaryProps = {
    taxonId?: number | string;
    placeId?: number | string;
    projectId?: number | string;
    year: number;
    source: DataSource;
    dataUrl?: string;
    generalClasses?: GeneralClasses;
    className?: string;
    tabDesc?: string;
    observersListClass?: string;
    statsCountSummaryClass?: string;
    // How many of the top observers to list
    numTopObservers?: number;
    components?: BaseComponentProps["components"];
};

export const Summary = ({
    source,
    dataUrl,
    taxonId,
    placeId,
    projectId,
    year,
    generalClasses,
    className,
    tabDesc,
    observersListClass,
    statsCountSummaryClass,
    numTopObservers = C.DEFAULT_NUM_TOP_OBSERVERS,
    components
}: SummaryProps) => {
    const { loading, results: summaryData, error } = useLoadSourceData({
        year,
        taxonId,
        placeId,
        projectId,
        dataUrl,
        source,
        // The hook passes this on to the action as `numResults`
        numResults: numTopObservers,
        isSummaryData: true,

        // shim to standardize the response from the `action` method with a top-level `results` property. This
        // just lets the useLoadSourceData hook work for all tab components
        action: async ({ numResults, ...data }: any) => {
            const results = await getSummary({ ...data, numTopObservers: numResults });

            return { results };
        }
    });

    const Load = components?.loader ? components.loader as any : Loader;
    const ErrorMessage = components?.error ? components.error as any : LoadError;

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
            <Load loading={loading} />
            {error && <ErrorMessage/>}
            <ul className={countSummaryClasses}>
                <li>Total number of observers: <b>{summaryData.observers?.totalCount ? numberWithCommas(summaryData.observers.totalCount): ""}</b></li>
                <li>Total number of observations: <b>{summaryData.observations?.totalCount ? numberWithCommas(summaryData.observations.totalCount): ""}</b></li>
            </ul>
            <section>
                <div className={styles.seasonalityBlock}>
                    <h1>Seasonality</h1>
                    <div className={styles.chart}>
                        {summaryData.seasonalityData && <SeasonalityGraph data={summaryData.seasonalityData.monthOfYear} />}
                    </div>
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
