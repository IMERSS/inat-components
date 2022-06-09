import {format} from "date-fns";

export const getCurrentYear = () => new Date().getFullYear();

// not 100% this shows the date in the right timezone, but it's fine for BC
export const formatDate = (date: string, dateFormat = "MMM do, h:mm b"): any => {
    return format(Date.parse(date), dateFormat);
}