import { request } from "./http.ts";

import { Database } from "jsr:@db/sqlite";

import {generate} from "@alikia/random-key";
import {randomNumber} from "@izmus/random-number"


const db = new Database("database.db");

export const searchID = db.prepare("SELECT * FROM players WHERE id = (:id)")
export const allPlayers = db.prepare("SELECT name, alive, publicID FROM players")
export const killPlayer = db.prepare("UPDATE players SET alive=0 WHERE publicID= (:publicID) ")

export const IDLENGTH : number = 16
const PORT = 3000


// let stmt = db.prepare("SELECT id, name, isKiller FROM players").all()
// console.log(stmt)

if (confirm("Generate new game?")){
    let name : string | null = null

    const players : string[] = []

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

    const insertStmt = db.prepare("INSERT INTO players (id, name, isKiller, alive, publicID) VALUES ((:id), (:name), (:isKiller), 1, (:publicID))");
    for (let i = 0; i < players.length; i++) {
        const key : string = await generate(IDLENGTH)
        const publicID : string = await generate(IDLENGTH)
        const killerString = killer == i ? 1 : 0
        console.log(players[i])
        insertStmt.run({id : key, name : players[i], isKiller: killerString, publicID : publicID})
    }  
}

export const killerID = db.prepare("SELECT id FROM players WHERE isKiller = 1").all()[0].id

//Deno.serve((req : Request, inf : Deno.ServeHandlerInfo<Deno.NetAddr>) => request(req, inf));

Deno.serve({port: PORT}, (req : Request, inf : Deno.ServeHandlerInfo<Deno.NetAddr>) => request(req, inf));

