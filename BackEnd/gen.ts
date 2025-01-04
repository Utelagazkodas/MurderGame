import "jsr:@std/dotenv/load";
import { generate } from "@alikia/random-key";
import { randomNumber } from "@izmus/random-number"
import { Database } from "jsr:@db/sqlite";
const db = new Database("database.db");

export const IDLENGTH : number = Number(Deno.env.get("IDLENGTH"))
let numOfPlayers: number = 0

const players: { privateName: string, publicName: string, privateId: string }[] = []


while (numOfPlayers < 3) {
    try {
        numOfPlayers = Number(prompt("How many players?"))
    } catch (error) {
        console.error(error)
    }
}

for (let i = 0; i < numOfPlayers; i++) {
    let name: string | null = null
    let t: { privateName: string, publicName: string, privateId: string } = { privateName: "", publicName: "", privateId: "" }

    while (name == null) {
        name = prompt(`Private name of ${i}th player: `)
    }

    t.privateName = name
    name = null

    while (name == null) {
        name = prompt(`Public name of ${i}th player: `)
    }
    t.publicName = name

    t.privateId = await generate(IDLENGTH)

    console.log(t.privateId)

    players.push(t)
}


const killer = randomNumber([0, players.length - 1])

db.exec("DELETE FROM players")

const insertStmt = db.prepare("INSERT INTO players (id, name, isKiller, alive, publicID, nickname) VALUES ((:id), (:name), (:isKiller), 1, (:publicID), (:nickname))");
for (let i = 0; i < players.length; i++) {
    const key: string = players[i].privateId
    const publicID: string = await generate(IDLENGTH)
    const killerString = killer == i ? 1 : 0
    console.log(players[i])
    insertStmt.run({ id: key, name: players[i].privateName, isKiller: killerString, publicID: publicID, nickname: players[i].publicName })
}  

db.close()
Deno.exit()