import React from "react";
import { TAXA, PLACES } from "../demo.config";
import styles from "./Settings.module.css";
import {DataSource} from "../../components/recentObservations/RecentObservations";

export type SettingsProp = {
    taxonId: number;
    placeId: number;
    dataSource: DataSource;
    onChangeTaxon: (taxonId: number) => void;
    onChangePlace: (placeId: number) => void;
    onChangeDataSource: (source: DataSource) => void;
};

const Settings = ({ taxonId, onChangeTaxon, placeId, onChangePlace, dataSource, onChangeDataSource }: SettingsProp) => {
    return (
        <section className={styles.row}>
            <div>
                <h4>Taxon</h4>
                <select defaultValue={taxonId} onChange={(e) => onChangeTaxon(parseInt(e.target.value, 10))}>
                    {TAXA.map(({ taxonId, label }) => <option key={taxonId} value={taxonId}>{label}</option>)}
                </select>
            </div>
            <div>
                <h4>Place</h4>
                <select defaultValue={placeId} onChange={(e) => onChangePlace(parseInt(e.target.value, 10))}>
                    {PLACES.map(({ placeId, label }) => <option key={placeId} value={placeId}>{label}</option>)}
                </select>
            </div>
            <div>
                <h4>Data Source</h4>
                <select defaultValue={dataSource} onChange={(e) => onChangeDataSource(e.target.value as DataSource)}>
                    <option value={DataSource.autoLoad}>Auto-load</option>
                    <option value={DataSource.url}>Static JSON files</option>
                </select>
            </div>
        </section>
    )
};

export default Settings;
