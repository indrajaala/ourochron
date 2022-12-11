export function isLeapYear(year) {
    return new Date(year, 1, 29).getDate() === 29;
}