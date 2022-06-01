import React, { useState } from "react";

interface YearsProps {
    value: string;
    onChange: (year: string) => void;
}

const Years = ({ value, onChange }: YearsProps) => {
    const [years] = useState(() => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear; i>=currentYear-10; i--) {
            years.push(i);
        }
        return years;
    });

    return (
        <select onChange={(e) => onChange(e.target.value)} defaultValue={value}>
            <option>All years</option>
            {years.map((year) => <option value={year} key={year}>{year}</option>)}
        </select>
    )
}

export default Years;
