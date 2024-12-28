export function request(req: Request, inf : Deno.ServeHandlerInfo<Deno.NetAddr>) : Response{

    switch (req.method) {
        case "GET":
            
            break;
        case "POST":
            break;
    }

    return new Response("asd")
}

function get(req: Request, inf : Deno.ServeHandlerInfo<Deno.NetAddr>) : Response{
    return new Response("asd")
}