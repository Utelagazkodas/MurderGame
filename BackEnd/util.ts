import { endMeeting, voteOutPlayer } from "./main.ts";
import { GAMELENGTH, GAMESTART, KILLCOOLDOWN, kv, MEETINGLENGTH, REVEALDEATH, getVotes } from "./main.ts";

const formatCache: string[] = ["http://localhost:8000"]

export function formatURL(url: string, dashAtFront: boolean = true): string {
    let n = 0
    const offset = dashAtFront ? 0 : 1

    for (let i = 0; i < formatCache.length; i++) {
        if (url.startsWith(formatCache[i])) {
            return url.slice(formatCache[i].length + offset, url.length)
        }

    }

    for (let i = 0; i < url.length; i++) {

        if (url[i] == "/") {
            n += 1
            if (n == 3) {
                const ret = url.slice(i + offset, url.length)
                formatCache.push(url.slice(0, i))
                return ret
            }
        }
    }
    throw "error, wrong type of string at " + url
}

export function getUnixTime(): number {
    return Math.round(Date.now() / 1000)
}

export async function getGameData(): Promise<GameData> {
    // collects all the game data, and constants
    return { meetingStart: Number(await kv.get(["meetingStart"])), gameWon: Number(await kv.get(["gameWon"])), lastKill: Number(await kv.get(["lastKill"])), killCoolDown: KILLCOOLDOWN, gameLength: GAMELENGTH, gameStart: GAMESTART, revealDeath: REVEALDEATH }
}

export async function isMeeting(): Promise<boolean> {
    const t = Number(await kv.get(["meetingStart"]))
    if (t == -1) {
        return false
    }
    if(t + MEETINGLENGTH < getUnixTime()){
        EndMeeting()
        

        return false
    }

    return true
}

export function EndMeeting():void{
    kv.set(["meetingStart"], -1)

    const votes = getVotes.all();
    const players: { [key: string]: number } = {};
    let most: string | null = null;
    let highestVotes = 0;
    let tie = false;

    votes.forEach((element) => {
        if (element.voteID) {
            players[element.voteID] = (players[element.voteID] || 0) + 1;

            if (players[element.voteID] > highestVotes) {
                most = element.voteID;
                highestVotes = players[element.voteID];
                tie = false; // Reset tie since we have a new leader
            } else if (players[element.voteID] === highestVotes && most !== element.voteID) {
                tie = true; // If another player matches highestVotes, it's a tie
            }
        }
    });

    if (most !== null && !tie) {
        voteOutPlayer.run({ publicID: most });
    }

    endMeeting.run()
}

// CLASSES

export class GameData {
    meetingStart: number
    gameWon: number
    lastKill: number
    killCoolDown: number
    gameLength: number
    gameStart: number
    revealDeath: number

    constructor(
        meetingStart: number,
        gameWon: number,
        lastKill: number,
        killCoolDown: number,
        gameLength: number,
        gameStart: number,
        revealDeath: number
    ) {
        this.meetingStart = meetingStart
        this.gameWon = gameWon
        this.lastKill = lastKill
        this.killCoolDown = killCoolDown
        this.gameLength = gameLength
        this.gameStart = gameStart
        this.revealDeath = revealDeath
    }
}

export class player{
    id? : string
    name? : string
    isKiller? : boolean
    revealDeath? : number
    publicID? : string
    nickname? : string
    voteID? : string
    alive? : boolean
    canCallMeeting? : boolean
    extraKills? : number
}
