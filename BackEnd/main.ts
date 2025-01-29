import "jsr:@std/dotenv/load";
import { request } from "./http.ts";

import { Database } from "jsr:@db/sqlite";
import { getUnixTime } from "./util.ts";
import { isGameGoing } from "./gameutils.ts";


// KV DATABASE
export const kv = await Deno.openKv("gamedata/gamedata.kv")




export const validIDs: string[] = []
export const publicIDs : string[] = []
export let killerID: string

// extract kv constants
const kvconst = await Deno.openKv("gamedata/consts.kv")
export const IDLENGTH = Number((await kvconst.get(["IDLENGTH"])).value)
export const NAMELENGTH = Number((await kvconst.get(["NAMELENGTH"])).value)
export const MEETINGLENGTH = Number((await kvconst.get(["MEETINGLENGTH"])).value)
export const KILLCOOLDOWN = Number((await kvconst.get(["KILLCOOLDOWN"])).value)
export const GAMELENGTH = Number((await kvconst.get(["GAMELENGTH"])).value)
export const GAMESTART = Number((await kvconst.get(["GAMESTART"])).value)
export const REVEALDEATH = Number((await kvconst.get(["REVEALDEATH"])).value)
kvconst.close()



// initiates the sqlite database
const db = new Database("gamedata/database.db", {create: false});

// SQLITE DATABASE QUERIES
export const searchID = db.prepare("SELECT * FROM players WHERE id = (:id)")

export const allPlayers = db.prepare("SELECT nickname, (unixepoch() < revealDeath OR revealDeath = NULL) AS alive, publicID, name, voteID, canCallMeeting FROM players WHERE  id IS NOT (:id)")
export const allPlayersKiller = db.prepare("SELECT nickname, (unixepoch() < revealDeath OR revealDeath = NULL) AS alive, publicID, name, voteID, canCallMeeting, revealDeath FROM players where id IS NOT (:id)")
export const publicAllPlayers = db.prepare("SELECT nickname, (unixepoch() < revealDeath OR revealDeath = NULL) AS alive, publicID, voteID, canCallMeeting FROM players")

export const killPlayer = db.prepare(`UPDATE players SET revealDeath=unixepoch()+ ${REVEALDEATH} WHERE publicID= (:publicID) AND revealDeath=NULL`)
export const voteOutPlayer = db.prepare("UPDATE players SET revealDeath=-1 WHERE publicID= (:publicID) AND revealDeath=NULL")

export const votePlayer = db.prepare("UPDATE players SET voteID=(:voteID) WHERE id= (:privateID) AND revealDeath IS NULL")

export const callMeeting = db.prepare("UPDATE players SET canCallMeeting=canCallMeeting-1 WHERE canCallMeeting>0 AND id = (:privateID) AND revealDeath IS NULL")

export const getVotes = db.prepare("SELECT voteID from players WHERE revealDeath IS NULL")
export const endMeeting = db.prepare("UPDATE players SET voteID=NULL")

export const extraKill = db.prepare("UPDATE players SET extraKills=extraKills-1 WHERE extraKills>0")

export const getAlive = db.prepare("SELECT COUNT() FROM players WHERE revealDeath IS NULL") // returns the amount of alive players

console.log(getAlive.run())

// env variables
const PORT : number = Number(Deno.env.get("PORT"))

let alive : number = 0
const t = await isGameGoing()

db.prepare("SELECT id, publicID, isKiller, revealDeath FROM players").all().forEach( (user) => {
    validIDs.push(user.id)
    publicIDs.push(user.publicID)
    if (user.isKiller) {
        killerID = user.id

        if(user.revealDeath != null && t){
            kv.set(["gameWon"], 1)
        }
    }

    if(user.revealDeath == null){
        alive+= 1
    }
})

// checks if the game is won
if(t && alive == 2){
    kv.set(["gameWon"], -1)
}
else if(t && getUnixTime() > GAMESTART + GAMELENGTH){
    kv.set(["gameWon"], 1)
}

// starts the http server
Deno.serve({ port: PORT}, (req: Request, inf: Deno.ServeHandlerInfo<Deno.NetAddr>) => request(req, inf));
