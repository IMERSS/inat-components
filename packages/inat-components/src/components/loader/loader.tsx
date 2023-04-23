import React from "react";
import LoadingSpinner from "react-spinners/MoonLoader.js";
import styles from "../shared/css/general.module.scss";

export type LoaderProps = {
    loading: boolean;
};

const Loader = ({ loading }: LoaderProps) => {
    let loaderClasses = styles.loader;
    // if (loading) {
    //     loaderClasses += ` ${styles.loading}`;
    // }
    if (!loading) {
        return null;
    }

    return (
        <div className={loaderClasses}>
            <div className={styles.loaderBg} />
            <LoadingSpinner color="#000000" />
        </div>
    );
};

export default Loader;
