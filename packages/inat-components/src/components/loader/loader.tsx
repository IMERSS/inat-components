import React from "react";
import LoadingSpinner from "react-spinners/MoonLoader.js";
import styles from "../shared/css/general.module.css";

export type LoaderProps = {
    loading: boolean;
};

const Loader = ({ loading }: LoaderProps) => {
    if (!loading) {
        return null;
    }

    return (
        <div className={styles.loader}>
            <div className={styles.loaderBg} />
            <LoadingSpinner color="#000000" />
        </div>
    );
};

export default Loader;
