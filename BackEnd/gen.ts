import "jsr:@std/dotenv/load";
import { generate } from "@alikia/random-key";
import { randomNumber } from "@izmus/random-number"
import { Database } from "jsr:@db/sqlite";
import { getUnixTime } from "./util.ts";


export const IDLENGTH : number = Number(Deno.env.get("IDLENGTH"))
export const NAMELENGTH : number = Number(Deno.env.get("NAMELENGTH"))
let numOfPlayers: number = 0

const players: { privateName: string, publicName: string, privateId: string }[] = []


while (numOfPlayers < 5 || !numOfPlayers) {
    try {
        numOfPlayers = Number(prompt("How many players? (at least 5 are required)"))
    } catch (error) {
        console.error(error)
    }
}

// the player inputs the players
for (let i = 0; i < numOfPlayers; i++) {
    let name: string | null = null
    const t: { privateName: string, publicName: string, privateId: string } = { privateName: "", publicName: "", privateId: "" }

    while (name == null || name.length >= NAMELENGTH || name.length == 0) {
        name = prompt(`Private name of ${i+1}th player: `)
    }

    t.privateName = name
    name = null

    while (name == null || name.length >= NAMELENGTH || name.length == 0) {
        name = prompt(`Public name of ${i+1}th player: `)
    }
    t.publicName = name

    t.privateId = await generate(IDLENGTH)

    console.log(t.privateId)

    players.push(t)
}


// ---- deletes then creates the database ----
try {
    await Deno.remove("gamedata", {recursive: true})
} catch (_error) {/**/}

await Deno.mkdir("gamedata")

// KEY VALUE DATABASE
const kvgd = await Deno.openKv("gamedata/gamedata.kv") // key value game data
await kvgd.set(["meetingStart"], -1) // -1 is no meeting is going, any other is a unix timestamp in seconds
await kvgd.set(["gameWon"], 0) // 0 is going -1 is killer won, 1 is citizens won
await kvgd.set(["lastKill"], -1) // -1 is no kill has happened else its a unix timestamp


// KEY VALUE CONSTANTS
const kvconst = await Deno.openKv("gamedata/consts.kv")
await kvconst.set(["IDLENGTH"], IDLENGTH)
await kvconst.set(["NAMELENGTH"], NAMELENGTH)
await kvconst.set(["MEETINGLENGTH"], Number(Deno.env.get("MEETINGLENGTH")))
await kvconst.set(["KILLCOOLDOWN"], Number(Deno.env.get("KILLCOOLDOWN")))
await kvconst.set(["GAMELENGTH"], Number(Deno.env.get("GAMELENGTH")))
await kvconst.set(["GAMESTART"], getUnixTime())
await kvconst.set(["REVEALDEATH"], Number(Deno.env.get("REVEALDEATH")))



// sqlite database
const db = new Database("gamedata/database.db", {create: true});
db.exec(`CREATE TABLE players (id VARCHAR(${IDLENGTH}) NOT NULL PRIMARY KEY, name VARCHAR(${NAMELENGTH}) NOT NULL,  isKiller BOOLEAN NOT NULL, revealDeath INT, publicID VARCHAR(${IDLENGTH}) NOT NULL, nickname VARCHAR(${NAMELENGTH}) NOT NULL, voteID VARCHAR(${IDLENGTH}), canCallMeeting INT, extraKills INT)`)

// generates the killer
const killer = randomNumber([0, players.length - 1])



// puts the players into the sqlite database
const insertStmt = db.prepare(`INSERT INTO players (id, name, isKiller, revealDeath, publicID, nickname, canCallMeeting, voteID, extraKills) VALUES ((:id), (:name), (:isKiller), NULL,(:publicID), (:nickname), ${Number(Deno.env.get("MEETINGCALLS"))} , NULL, (:extraKills))`);
for (let i = 0; i < players.length; i++) {
    const key: string = players[i].privateId
    const publicID: string = await generate(IDLENGTH)
    const killerString = killer == i ? 1 : 0
    // if this user is the killer then give them extra kills but if the extra kills are negative then give them 0
    const extraKills = killer == i ? (Number(Deno.env.get("EXTRAKILLS")) > 0 ? Number(Deno.env.get("EXTRAKILLS")): 0 ) : null
    console.log(players[i])
    insertStmt.run({ id: key, name: players[i].privateName, isKiller: killerString, publicID: publicID, nickname: players[i].publicName, extraKills :  extraKills})
}  

db.close()
kvgd.close()
kvconst.close()
Deno.exit()