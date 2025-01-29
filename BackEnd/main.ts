import "jsr:@std/dotenv/load";
import { request } from "./http.ts";

import { Database } from "jsr:@db/sqlite";


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

export const callMeeting = db.prepare("UPDATE players SET canCallMeeting=0 WHERE canCallMeeting=1 AND id = (:privateID) AND revealDeath IS NULL")

export const getVotes = db.prepare("SELECT voteID from players WHERE revealDeath=NULL")
export const endMeeting = db.prepare("UPDATE players SET voteID=NULL")

// env variables
const PORT : number = Number(Deno.env.get("PORT"))



db.prepare("SELECT id, publicID, isKiller FROM players").all().forEach((user) => {
    validIDs.push(user.id)
    publicIDs.push(user.publicID)
    if (user.isKiller) {
        killerID = user.id
    }
})

// starts the http server
Deno.serve({ port: PORT}, (req: Request, inf: Deno.ServeHandlerInfo<Deno.NetAddr>) => request(req, inf));
