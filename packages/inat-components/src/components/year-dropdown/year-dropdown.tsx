import React, { useEffect, useState } from "react";
import { getCurrentYear } from "../../__shared";
import styles from "./year-dropdown.module.scss";

interface YearsProps {
    value: string;
    onChange: (year: string) => void;
    numYears: number;
    className?: string;
}

const Years = ({ value, onChange, numYears, className }: YearsProps) => {
    const [years, setYears] = useState([]);

    useEffect(() => {
        const currentYear = getCurrentYear();
        const years: any = [];
        for (let i = currentYear; i>currentYear-numYears; i--) {
            years.push(i);
        }
        setYears(years);
    }, [numYears]);

    let classes = styles.dropdown;
    if (className) {
        classes += ` ${className}`;
    }

    return (
        <select className={classes} onChange={(e) => onChange(e.target.value)} defaultValue={value}>
            <option value="all">All years</option>
            {years.map((year) => <option value={year} key={year}>{year}</option>)}
        </select>
    )
}

export default Years;
