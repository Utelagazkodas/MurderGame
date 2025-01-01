import { searchID, IDLENGTH, allPlayers, killerID, killPlayer } from "./main.ts";
import { formatURL } from "./util.ts";

export async function request(req: Request, inf : Deno.ServeHandlerInfo<Deno.NetAddr>) : Promise<Response>{
    let resp : Response = new Response

    switch (req.method) {
        case "GET":
            resp = get(req,inf)
            break;
        case "POST":
            resp = await post(req,inf)
            break;
    }

    resp.headers.set('Access-Control-Allow-Origin', '*'); // Allows requests from any origin

    return resp
}

function get(req: Request, inf : Deno.ServeHandlerInfo<Deno.NetAddr>) : Response{

    const formatted : string = formatURL(req.url, false)
    console.log(req.url,formatted)


    if(formatted.startsWith("id/") && formatted.length == IDLENGTH + 3){
        console.time("searchID Query Time");
        const t = searchID.all({ id: formatted.slice(3, formatted.length) });
        console.timeEnd("searchID Query Time");

        if(t.length != 1){
            
            return new Response("id doesnt exist", {status: 404})
        }
    
        return new Response(JSON.stringify(t[0]), {status: 200})
    }
    if(formatted == "players"){
        
        console.time("allPlayers Query Time");
        const t = allPlayers.all();
        console.timeEnd("allPlayers Query Time");

        return new Response(JSON.stringify(t), {status: 200})
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