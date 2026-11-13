export const numberWithCommas = (x: number) => (x || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
