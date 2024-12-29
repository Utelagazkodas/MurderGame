import { request } from "./http.ts";

import { Database } from "jsr:@db/sqlite";

import {generate} from "@alikia/random-key";
import {randomNumber} from "@izmus/random-number"


const db = new Database("database.db");

export const searchID = db.prepare("SELECT * FROM players WHERE id = (:id)")
export const allPlayers = db.prepare("SELECT name, alive FROM players")

export const IDLENGTH = 16


// let stmt = db.prepare("SELECT * FROM players").all()
// console.log(stmt)

if (false){
    let name : string | null = null

    let players : string[] = []

    while (name != ""){
        name = prompt("Name of the player: ")



        if(name == null || name == ""){
            break
        }

        if(name.length > 32){
            console.error("name too long")
            continue
        }

        players.push(name)
    }   

    if(players.length < 3){
        throw "At least 3 players are required"
    }

    const killer = randomNumber([0, players.length-1])

    db.exec("DELETE FROM players")

    const insertStmt = db.prepare("INSERT INTO players (id, name, isKiller, alive) VALUES ((:id), (:name), (:isKiller), 1)");
    for (let i = 0; i < players.length; i++) {
        const key : string = await generate(IDLENGTH)
        const killerString = killer == i ? 1 : 0
        console.log(players[i])
        insertStmt.run({id : key, name : players[i], isKiller: killerString})
    }  
}



Deno.serve((req : Request, inf : Deno.ServeHandlerInfo<Deno.NetAddr>) => request(req, inf));

