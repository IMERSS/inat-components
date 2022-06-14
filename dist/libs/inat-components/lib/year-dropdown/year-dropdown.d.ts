/// <reference types="react" />
interface YearsProps {
    value: string;
    onChange: (year: string) => void;
    className?: string;
}
declare const Years: ({ value, onChange, className }: YearsProps) => JSX.Element;
export default Years;
