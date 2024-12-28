import { request } from "./http.ts";

Deno.serve((req : Request, inf : Deno.ServeHandlerInfo<Deno.NetAddr>) => request(req, inf));

