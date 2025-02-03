import "jsr:@std/dotenv/load";
import { request } from "./http.ts";

import { Database } from "jsr:@db/sqlite";
import { getUnixTime } from "./util.ts";
import { isGameGoing } from "./gameutils.ts";


// KV DATABASE
export const kv = await Deno.openKv("gamedata/gamedata.kv")
console.log("KV database initialized")



export const validIDs: string[] = []
export const publicIDs : string[] = []
export let killerPrivateID: string
export let killerPublicID : string

// extract kv constants
const kvconst = await Deno.openKv("gamedata/consts.kv")
export const IDLENGTH = Number((await kvconst.get(["IDLENGTH"])).value)
export const NAMELENGTH = Number((await kvconst.get(["NAMELENGTH"])).value)
export const MEETINGLENGTH = Number((await kvconst.get(["MEETINGLENGTH"])).value)
export const KILLCOOLDOWN = Number((await kvconst.get(["KILLCOOLDOWN"])).value)
export const GAMELENGTH = Number((await kvconst.get(["GAMELENGTH"])).value)
export const GAMESTART = Number((await kvconst.get(["GAMESTART"])).value)
export const REVEALDEATH = Number((await kvconst.get(["REVEALDEATH"])).value)
console.log("Game constants loaded", { IDLENGTH, NAMELENGTH, MEETINGLENGTH, KILLCOOLDOWN, GAMELENGTH, GAMESTART, REVEALDEATH })
kvconst.close()

export const STARTINGEXTRAKILLS = Number(Deno.env.get("EXTRAKILLS"))
export const STARTINGMEETINGS = Number(Deno.env.get("MEETINGCALLS"))




// initiates the sqlite database
const db = new Database("gamedata/database.db", {create: false})
console.log("SQLite database connected")

// SQLITE DATABASE QUERIES
export const searchID = db.prepare("SELECT * FROM players WHERE id = (:id)")

export const allPlayers = db.prepare("SELECT nickname, (unixepoch() < revealDeath OR revealDeath IS NULL) AS alive, publicID, name, voteID, canCallMeeting FROM players WHERE  id IS NOT (:id)")
export const allPlayersKiller = db.prepare("SELECT nickname, (unixepoch() < revealDeath OR revealDeath IS NULL) AS alive, publicID, name, voteID, canCallMeeting, revealDeath FROM players where id IS NOT (:id)")
export const publicAllPlayers = db.prepare("SELECT nickname, (unixepoch() < revealDeath OR revealDeath IS NULL) AS alive, publicID, voteID, canCallMeeting FROM players")

export const killPlayer = db.prepare(`UPDATE players SET revealDeath=unixepoch()+ ${REVEALDEATH} WHERE publicID=(:publicID) AND revealDeath IS NULL AND isKiller=0`)
export const voteOutPlayer = db.prepare("UPDATE players SET revealDeath=-1 WHERE publicID=(:publicID) AND revealDeath IS NULL")

export const votePlayer = db.prepare("UPDATE players SET voteID=(:voteID) WHERE id= (:privateID) AND revealDeath IS NULL")

export const callMeeting = db.prepare("UPDATE players SET canCallMeeting=canCallMeeting-1 WHERE canCallMeeting>0 AND id = (:privateID) AND revealDeath IS NULL")
export const revealDead = db.prepare("UPDATE players SET revealDeath=-1 WHERE revealDeath IS NOT NULL")
export const killAllCitisens = db.prepare("UPDATE players SET revealDeath=-1 WHERE isKiller=0")

export const getVotes = db.prepare("SELECT voteID from players WHERE revealDeath IS NULL")
export const endMeeting = db.prepare("UPDATE players SET voteID=NULL")

export const extraKill = db.prepare("UPDATE players SET extraKills=extraKills-1 WHERE extraKills>0")

export const getCitisens = db.prepare("SELECT COUNT() FROM players WHERE revealDeath IS NULL AND isKiller=0") // returns the amount of alive besides the killer

// env variables
const PORT : number = Number(Deno.env.get("PORT"))

let alive : number = 0

db.prepare("SELECT id, publicID, isKiller, revealDeath FROM players").all().forEach(async (user) => {
    validIDs.push(user.id)
    publicIDs.push(user.publicID)
    if (user.isKiller) {
        killerPrivateID = user.id
        killerPublicID = user.publicID

        if(user.revealDeath != null && await isGameGoing()){
            console.log("Killer is dead, game won")
            kv.set(["gameWon"], 1)
            revealDead.run()
        }
    }

    if(user.revealDeath == null){
        alive+= 1
    }
})

console.log(`Alive players count: ${alive}`)

// checks if the game is won
if(await isGameGoing() && alive <= 2){
    console.log("Game won by the killer")
    killAllCitisens.run()
    kv.set(["gameWon"], -1)
}
else if(await isGameGoing() && getUnixTime() > GAMESTART + GAMELENGTH){
    console.log("Game won by citisens due to time limit")
    kv.set(["gameWon"], 1)
    revealDead.run()
}

// starts the http server
Deno.serve({ port: PORT}, (req: Request, inf: Deno.ServeHandlerInfo<Deno.NetAddr>) => request(req, inf));
