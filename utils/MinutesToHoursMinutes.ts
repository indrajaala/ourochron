export function minutesToHoursMinutes(m) {

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    const minutes = m % 60;
    const hours = Math.floor(m / 60);

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}