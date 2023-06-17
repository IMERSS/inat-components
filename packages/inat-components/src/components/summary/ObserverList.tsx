import React from "react";
import { numberWithCommas, Observer, C, GeneralClasses } from "../../__shared";
import styles from "./summary.module.scss";

export const ObserverList = ({ observers, generalClasses, className = '' }: { observers: Observer[], generalClasses?: GeneralClasses, className?: string }) => {
	let classes = styles.top;
	if (className) {
		classes += ` ${className}`;
	}
	return (
		<ul className={classes}>
			{observers.map((obs) => (
				<li key={obs.id}>
					<a href={`${C.BASE_URL}/people/${obs.userName}`} target="_blank" rel="noreferrer">
						{obs.iconUrl ? <img src={obs.iconUrl || ""} className={styles.avatar} alt="User icon"/> :
							<div className={styles.noAvatar}/>}
						<h3>{obs.userName}</h3>
						<label className={generalClasses?.observationCount}>{numberWithCommas(obs.numObservations)}</label>
					</a>
				</li>
			))}
		</ul>
	);
};
