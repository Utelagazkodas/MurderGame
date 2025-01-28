import "jsr:@std/dotenv/load";
import { request } from "./http.ts";

import { Database } from "jsr:@db/sqlite";



// initiates the sqlite database
const db = new Database("gamedata/database.db", {create: false});

// SQLITE DATABASE QUERIES
export const searchID = db.prepare("SELECT * FROM players WHERE id = (:id)")
export const allPlayers = db.prepare("SELECT nickname, alive, publicID, name, voteID, canCallMeeting FROM players")
export const publicAllPlayers = db.prepare("SELECT nickname, alive, publicID, voteID, canCallMeeting FROM players")
export const killPlayer = db.prepare("UPDATE players SET alive=0 WHERE publicID= (:publicID) AND alive=1")

// KV DATABASE
export const kv = await Deno.openKv("gamedata/gamedata.kv")




export const validIDs: string[] = []
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

console.log("IDLENGTH:", IDLENGTH);
console.log("NAMELENGTH:", NAMELENGTH);
console.log("MEETINGLENGTH:", MEETINGLENGTH);
console.log("KILLCOOLDOWN:", KILLCOOLDOWN);
console.log("GAMELENGTH:", GAMELENGTH);
console.log("GAMESTART:", GAMESTART);



// env variables
const PORT : number = Number(Deno.env.get("PORT"))



db.prepare("SELECT id, isKiller FROM players").all().forEach((user) => {
    validIDs.push(user.id)
    if (user.isKiller) {
        killerID = user.id
    }
})

// starts the http server
Deno.serve({ port: PORT}, (req: Request, inf: Deno.ServeHandlerInfo<Deno.NetAddr>) => request(req, inf));
