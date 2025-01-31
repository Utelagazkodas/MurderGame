import { endMeeting, IDLENGTH, killerPublicID, revealDead, voteOutPlayer } from "./main.ts";
import { GAMELENGTH, GAMESTART, KILLCOOLDOWN, kv, MEETINGLENGTH, REVEALDEATH, getVotes } from "./main.ts";
import { GameData, getUnixTime } from "./util.ts";

export async function getGameData(): Promise<GameData> {
    console.log("Fetching game data...")

    const meetingStart = Number((await kv.get(["meetingStart"])).value)
    const gameWon = Number((await kv.get(["gameWon"])).value)
    const lastKill = Number((await kv.get(["lastKill"])).value)

    console.log(`Game Data - Meeting Start: ${meetingStart}, Game Won: ${gameWon}, Last Kill: ${lastKill}`)

    return { 
        idLength : IDLENGTH,
        meetingStart: meetingStart, 
        gameWon : gameWon, 
        lastKill: lastKill, 
        killCoolDown: KILLCOOLDOWN, 
        gameLength: GAMELENGTH, 
        gameStart: GAMESTART, 
        revealDeath: REVEALDEATH, 
        killerID: await isGameGoing() ? undefined : killerPublicID,
        isMeeting : await isMeeting()
    }
}

export async function isMeeting(): Promise<boolean> {
    console.log("Checking if a meeting is ongoing...")
    const meetingStartTemp = Number((await kv.get(["meetingStart"])).value)
    if (meetingStartTemp == -1) {
        console.log("No active meeting.")
        return false
    }
    if(meetingStartTemp + MEETINGLENGTH < getUnixTime()){
        console.log("Meeting timeout reached, ending meeting")
        EndMeeting()
        

        return false
    }
    console.log("Meeting is still active.")
    return true
}

export function EndMeeting():void{
    console.log("Ending meeting and processing votes...")

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

    console.log(`Vote results: ${JSON.stringify(players)}`)

    if (most !== null && !tie) {
        console.log("Voting out player:", most)
        voteOutPlayer.run({ publicID: most })

        if(most == killerPublicID){
            kv.set(["gameWon"], 1)
            revealDead.run()
            console.log("Voted out killer, citisens won")
        }
    } else {
        console.log("Vote resulted in a tie. No one was voted out.")
    }

    console.log("Clearing votes after meeting.")

    endMeeting.run()
}

export async function isGameGoing(){
    console.log("Checking if the game is still active...")
    const gameWon = Number((await kv.get(["gameWon"])).value)

    if(gameWon == 0 && getUnixTime() > GAMESTART + GAMELENGTH){
        console.log("Game time exceeded. Marking game as citisens won.")
        kv.set(["gameWon"], 1)
        revealDead.run()
        return false
    }

    console.log(`Game ongoing status: ${gameWon == 0}`)
    return gameWon == 0
}