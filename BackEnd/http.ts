import { search, IDLENGTH } from "./main.ts";

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
    if(req.url.includes("favicon")){
        return new Response()
    }

    const formatted : string = req.url.slice(req.url.length-IDLENGTH, req.url.length)
   
    const t = search.all({id: formatted})

    if(t.length != 1){
        return new Response("error")
    }

    return new Response(JSON.stringify(t[0]))
}