import "jsr:@std/dotenv/load";
import { request } from "./http.ts";

import { Database } from "jsr:@db/sqlite";


const db = new Database("database.db");

export const searchID = db.prepare("SELECT * FROM players WHERE id = (:id)")
export const allPlayers = db.prepare("SELECT nickname, alive, publicID, name FROM players")
export const publicAllPlayers = db.prepare("SELECT nickname, alive, publicID FROM players")
export const killPlayer = db.prepare("UPDATE players SET alive=0 WHERE publicID= (:publicID) AND alive=1")

const PORT = 3000

export const validIDs : string[] = []

export let killerID: string

export const IDLENGTH = Number(Deno.env.get("IDLENGTH"))



// let stmt = db.prepare("SELECT id, name, isKiller FROM players").all()
// console.log(stmt)


    db.prepare("SELECT id, isKiller FROM players").all().forEach((user)=>{
        validIDs.push(user.id)
        if(user.isKiller)
        {
            killerID = user.id
        }
    })

//Deno.serve((req : Request, inf : Deno.ServeHandlerInfo<Deno.NetAddr>) => request(req, inf));

Deno.serve({port: PORT}, (req : Request, inf : Deno.ServeHandlerInfo<Deno.NetAddr>) => request(req, inf));

