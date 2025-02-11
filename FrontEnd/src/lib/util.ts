import type { GameData } from "./classes";
export function secondsToDate(seconds: number): { 
    secs: number, 
    mins: number, 
    hours: number, 
    days: number, 
    secsString: string, 
    minsString: string, 
    hoursString: string, 
    daysString: string, 
    fullString: string,
    smallString: string,
    altFullString: string,
    altSmallString : string
} {
    let remainder = seconds;

    if(seconds <0){
        remainder = 0
    }

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
    let altFullString = `${days} n ${hours} ó ${mins} p ${secs} m`;

    // Ensure two-digit formatting for smallString
    const pad = (num: number) => String(num).padStart(2, "0");
    let smallString = `${days} nap ${pad(hours)}:${pad(mins)}:${pad(secs)}`;

    let altSmallString = `${pad(hours+(days*24))}:${pad(mins)}:${pad(secs)}`

    return { secs, mins, hours, days, secsString, minsString, hoursString, daysString, fullString, smallString, altFullString, altSmallString };
}


export function isMeeting(data : GameData) : boolean{
    return data.meetingStart + data.meetingLength > getUnixTime()
}

export function getUnixTime(): number {
    return Math.round(Date.now() / 1000)
}

export function fallBack(value : unknown, fallback : unknown) : unknown {
    return value ? value : fallback
}

