import "jsr:@std/dotenv/load";
import {  IDLENGTH, validIDs } from "./main.ts";
import { searchID, allPlayers, killerID, killPlayer, publicAllPlayers } from "./main.ts";
import { formatURL } from "./util.ts";

export async function request(req: Request, inf : Deno.ServeHandlerInfo<Deno.NetAddr>) : Promise<Response>{
    let resp : Response = new Response

    switch (req.method) {
        case "GET":
            resp = await get(req,inf)
            break;
        case "POST":
            resp = await post(req,inf)
            break;
    }

    resp.headers.set('Access-Control-Allow-Origin', '*'); // Allows requests from any origin

    return resp
}


async function get(req: Request, inf : Deno.ServeHandlerInfo<Deno.NetAddr>){

    const formatted : string = formatURL(req.url, false)


    if(formatted.startsWith("id/") && formatted.length == IDLENGTH + 3){
        console.time("searchID Query Time");
        const id = searchID.all({ id: formatted.slice(3, formatted.length) });
        console.timeEnd("searchID Query Time");

        if(id.length != 1){
            
            return new Response("id doesnt exist", {status: 404})
        }
    
        return new Response(JSON.stringify(id[0]), {status: 200})
    }
    if(formatted.startsWith("players")){
        let resp

        if(formatted.startsWith("players/") && formatted.length == IDLENGTH + 8){
        const auth = formatted.slice(8, formatted.length)
        if(validIDs.includes(auth)){
            console.time("allPlayers Query Time");
            resp = allPlayers.all();
            console.timeEnd("allPlayers Query Time");
            return new Response(JSON.stringify(resp), {status: 200})
        }
        return new Response("404", {status: 404})
        }    

        
        
        console.time("allPlayers Query Time");
        resp = publicAllPlayers.all();
        console.timeEnd("allPlayers Query Time");
        


        return new Response(JSON.stringify(resp), {status: 200})
    }
    
    return new Response("404", {status: 404})
   

}

async function post(req: Request, inf : Deno.ServeHandlerInfo<Deno.NetAddr>) : Promise<Response>{
    const formatted : string = formatURL(req.url, false)

    if(formatted.startsWith("kill/") && formatted.length == IDLENGTH + 5){
        if(!req.body){
            return new Response("Request body is required", {status: 400})
        }

        const auth = await req.text()
        
        if(auth == killerID){
            if(killPlayer.run({publicID : formatted.slice(5, formatted.length)}) != 0){
                return new Response("Killed someone")
            }
            else{
                return new Response("PlayerID not found or already dead", {status: 404})
            }
        }
        else{
            return new Response("Unauthorized", {status: 401})
        }
    }

    return new Response("404, bad post format", {status: 404})


}