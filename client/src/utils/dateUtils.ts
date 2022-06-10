import {format} from "date-fns";

export const getCurrentYear = () => new Date().getFullYear();

// not 100% this shows the date in the right timezone, but it's fine for BC
export const formatDate = (date: string, dateFormat = "MMM do, h:mm b"): any => {
    let formattedDate = "";
    try {
        formattedDate = format(Date.parse(date), dateFormat);
    } catch (e) {
        console.log("in validate: ", date);
    }
    return formattedDate;
}