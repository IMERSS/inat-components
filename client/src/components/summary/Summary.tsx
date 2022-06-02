import React, {useEffect, useState} from "react";
import {getSummary} from "../../utils/api";
import {numberWithCommas} from "../../utils/numberUtils";
import Loader from "../loader/Loader";

export type SummaryProps = {
    taxonId: string;
    placeId: string;
};

export const Summary = ({ taxonId, placeId }: SummaryProps) => {
    const [data, setSummaryData] = useState<any>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSummary(taxonId, placeId, (resp: any) => {
            setSummaryData(resp);
            setLoading(false);
        });
    }, [placeId, taxonId]);

    return (
        <div style={{ position: 'relative' }}>
            <Loader loading={loading} />

            <ul>
                <li>Total number of observers: <b>{data.numObservers ? numberWithCommas(data.numObservers): ""}</b></li>
            </ul>
        </div>
    );
}