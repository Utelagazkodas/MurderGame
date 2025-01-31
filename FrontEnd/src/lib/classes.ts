export interface GameData {
    idLength : number
    meetingStart: number
    gameWon: number
    lastKill: number
    killCoolDown: number
    gameLength: number
    gameStart: number
    revealDeath: number
    killerID : string
    isMeeting : boolean
}

export interface player{
    id : string
    name : string
    isKiller : boolean
    revealDeath : number
    publicID : string
    nickname : string
    voteID : string
    alive : boolean
    canCallMeeting : boolean
    extraKills : number
}