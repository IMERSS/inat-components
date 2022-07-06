import React, {useState} from "react";
import {getCurrentYear} from "../../../../shared/src/utils";
import styles from "./year-dropdown.module.scss";

interface YearsProps {
    value: string;
    onChange: (year: string) => void;
    className?: string;
}

const Years = ({ value, onChange, className }: YearsProps) => {
    const [years] = useState(() => {
        const currentYear = getCurrentYear();
        const years: any = [];
        for (let i = currentYear; i>=currentYear-10; i--) {
            years.push(i);
        }
        return years;
    });

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
