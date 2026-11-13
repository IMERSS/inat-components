import React from "react";
import styles from "./error.module.css";

/**
 * Shown in place of a tab's results when they could not be loaded. A site may supply its own, as `components.error`.
 */
export const LoadError = () => (
	<p className={styles.error}>
		The observations could not be loaded from iNaturalist. Please try again later.
	</p>
);

export default LoadError;
