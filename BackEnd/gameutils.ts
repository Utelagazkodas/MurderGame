import { endMeeting, voteOutPlayer } from "./main.ts";
import { GAMELENGTH, GAMESTART, KILLCOOLDOWN, kv, MEETINGLENGTH, REVEALDEATH, getVotes } from "./main.ts";
import { GameData, getUnixTime } from "./util.ts";

export async function getGameData(): Promise<GameData> {
    // collects all the game data, and constants
    return { meetingStart: Number((await kv.get(["meetingStart"])).value), gameWon: Number((await kv.get(["gameWon"])).value), lastKill: Number((await kv.get(["lastKill"])).value), killCoolDown: KILLCOOLDOWN, gameLength: GAMELENGTH, gameStart: GAMESTART, revealDeath: REVEALDEATH }
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

export async function isGameGoing(){
    let t = Number((await kv.get(["gameWon"])).value)

    if(t == 0 && getUnixTime() > GAMESTART + GAMELENGTH){
        kv.set(["gameWon"], 1)
        return false
    }

    return t == 0
}