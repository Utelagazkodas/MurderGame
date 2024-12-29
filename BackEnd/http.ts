import { searchID, IDLENGTH, allPlayers } from "./main.ts";
import { formatURL } from "./util.ts";

export function request(req: Request, inf : Deno.ServeHandlerInfo<Deno.NetAddr>) : Response{
    let resp : Response = new Response

    switch (req.method) {
        case "GET":
            resp = get(req,inf)
            break;
        case "POST":
            break;
    }

    resp.headers.set('Access-Control-Allow-Origin', '*'); // Allows requests from any origin

    return resp
}

function get(req: Request, inf : Deno.ServeHandlerInfo<Deno.NetAddr>) : Response{
    const formatted : string = formatURL(req.url)

    if(formatted.startsWith("/id/") && formatted.length == IDLENGTH + 4){
        console.time("searchID Query Time");
        const t = searchID.all({ id: formatted.slice(4, formatted.length) });
        console.timeEnd("searchID Query Time");

        if(t.length != 1){
            
            return new Response("id doesnt exist", {status: 404})
        }
    
        return new Response(JSON.stringify(t[0]), {status: 200})
    }
    if(formatted == "/players"){
        
        console.time("allPlayers Query Time");
        const t = allPlayers.all();
        console.timeEnd("allPlayers Query Time");

        return new Response(JSON.stringify(t), {status: 200})
    }
    
    return new Response("404", {status: 404})
   

}