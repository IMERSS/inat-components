import React, { useCallback } from 'react';
import styles from "./Observation.module.css";

export type ObservationProps = {
    imageUrl: string;
    taxonName: string;
    observationId: number;
    seenBy: string;
    obsDate: string;
    linkUrl: string;
};

export const Observation = ({ imageUrl, taxonName, seenBy, obsDate, linkUrl }: ObservationProps) => {
    const gotoObservation = useCallback(() => {
        window.location.href = linkUrl;
    }, [linkUrl]);

    return (
        <article className={styles.obs} onClick={gotoObservation}>
            <div style={{
                width: 200,
                height: 200,
                overflow: "hidden",
                borderRadius: 5,
                background: `url(${imageUrl}) 50% 50% no-repeat`,
                margin: '0 auto'
            }} />
            <div className={styles.textContent}>
                <h3>{taxonName}</h3>
                <div>{obsDate}</div>
                <div>{seenBy}</div>
            </div>
        </article>
    );
};
