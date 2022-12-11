export function currentTime() {
    const currentTime = new Date();

    const currentOffset = currentTime.getTimezoneOffset();

    const ISTOffset = 330;   // IST offset UTC +5:30

    const ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);

// ISTTime now represents the time in IST coordinates

    const hours = ISTTime.getHours()
    const minutes = ISTTime.getMinutes()
    return {hours, minutes}
}