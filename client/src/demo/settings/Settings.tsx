import React from "react";
import styles from "./Settings.module.css";

export type SettingsProp = {
    taxonId: number;
    placeId: number;
    onChangeTaxon: (taxonId: number) => void;
    onChangePlace: (placeId: number) => void;
};

const Settings = ({ taxonId, onChangeTaxon, placeId, onChangePlace }: SettingsProp) => {
    return (
        <section className={styles.row}>
            <div>
                <h4>Taxon</h4>
                <select defaultValue={taxonId} onChange={(e) => onChangeTaxon(parseInt(e.target.value, 10))}>
                    <option value="47157">Lepidoptera</option>
                    <option value="47208">Coleoptera</option>
                    <option value="47822">Diptera</option>
                    <option value="48112">Mantodea</option>
                </select>
            </div>
            <div>
                <h4>Place</h4>
                <select defaultValue={placeId} onChange={(e) => onChangePlace(parseInt(e.target.value, 10))}>
                    <option value="7085">BC</option>
                    <option value="6834">Alberta</option>
                </select>
            </div>
        </section>
    )
};

export default Settings;
