

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
