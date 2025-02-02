export function secondsToDate(seconds: number): string {
    let remainder = seconds;

    let secs = remainder % 60;
    let secsText = secs > 0 ? ` ${secs} másodperc ` : "";
    remainder -= secs;

    let mins = Math.floor(remainder / 60) % 60;
    let minsText = mins > 0 ? ` ${mins} perc ` : "";
    remainder -= mins * 60;

    let hours = Math.floor(remainder / 3600) % 24;
    let hoursText = hours > 0 ? ` ${hours} óra ` : "";
    remainder -= hours * 3600;

    let days = Math.floor(remainder / (3600 * 24));
    let daysText = days > 0 ? ` ${days} nap ` : "";

    return daysText + hoursText + minsText + secsText;
}