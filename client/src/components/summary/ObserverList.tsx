import React from "react";
import {Observer} from "../../api/summary";
import styles from "./Summary.module.scss";
import * as C from "../../constants";
import {numberWithCommas} from "../../utils/numberUtils";

export const ObserverList = ({ observers }: { observers: Observer[]}) => (
    <ul className={styles.top}>
        {observers.map((obs) => (
            <li key={obs.id}>
                <a href={`${C.BASE_URL}/people/${obs.userName}`} target="_blank" rel="noreferrer">
                    {obs.iconUrl ? <img src={obs.iconUrl || ""} className={styles.avatar} alt="User icon" /> : <div className={styles.noAvatar} />}
                    <h3>{obs.userName}</h3>
                    <label>{numberWithCommas(obs.numObservations)}</label>
                </a>
            </li>
        ))}
    </ul>
);
