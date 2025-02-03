export function secondsToDate(seconds: number): { 
    secs: number, 
    mins: number, 
    hours: number, 
    days: number, 
    secsString: string, 
    minsString: string, 
    hoursString: string, 
    daysString: string, 
    fullString: string 
} {
    let remainder = seconds;

    let secs = remainder % 60;
    let secsString = secs > 0 ? `${secs} másodperc` : "";
    remainder -= secs;

    let mins = Math.floor(remainder / 60) % 60;
    let minsString = mins > 0 ? `${mins} perc` : "";
    remainder -= mins * 60;

    let hours = Math.floor(remainder / 3600) % 24;
    let hoursString = hours > 0 ? `${hours} óra` : "";
    remainder -= hours * 3600;

    let days = Math.floor(remainder / (3600 * 24));
    let daysString = days > 0 ? `${days} nap` : "";

    let fullString = [daysString, hoursString, minsString, secsString].filter(Boolean).join(" ");

    return { secs, mins, hours, days, secsString, minsString, hoursString, daysString, fullString };
}
