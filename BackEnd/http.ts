import "jsr:@std/dotenv/load";
import { allPlayersKiller, extraKill, IDLENGTH, KILLCOOLDOWN, kv, publicIDs, REVEALDEATH, validIDs, votePlayer } from "./main.ts";
import { searchID, allPlayers, killerID, killPlayer, publicAllPlayers, callMeeting } from "./main.ts";
import { formatURL, GameData, getUnixTime, player, } from "./util.ts";
import { getGameData, isGameGoing, isMeeting } from "./gameutils.ts";

export async function request(req: Request, inf: Deno.ServeHandlerInfo<Deno.NetAddr>): Promise<Response> {
    let resp: Response = new Response


    switch (req.method) {
        case "GET":
            resp = await get(req, inf)
            break;
        case "POST":
            resp = await post(req, inf)
            break;
    }

    resp.headers.set('Access-Control-Allow-Origin', '*'); // Allows requests from any origin
    return resp
}


async function get(req: Request, _inf: Deno.ServeHandlerInfo<Deno.NetAddr>) {

    const formatted: string = formatURL(req.url, false)


    if (formatted.startsWith("id/") && formatted.length == IDLENGTH + 3) {
        console.time("searchID Query Time");
        const id = searchID.all({ id: formatted.slice(3, formatted.length) });
        console.timeEnd("searchID Query Time");

        if (id.length != 1) {

            return new Response("id doesnt exist", { status: 404 })
        }

        return new Response(JSON.stringify(id[0]), { status: 200 })
    }

    if (formatted.startsWith("players")) {
        // deno-lint-ignore no-explicit-any
        const resp: { players: any[], gamedata: GameData, player?: player } = { players: [], gamedata: await getGameData() }

        if (formatted.startsWith("players/") && formatted.length == IDLENGTH + 8) {
            const auth = formatted.slice(8, formatted.length)
            if (validIDs.includes(auth)) {

                if (killerID == auth) {
                    console.time("killerPlayers Query Time");
                    resp.players = allPlayersKiller.all({ id: auth });
                    console.timeEnd("killerPlayers Query Time");
                }
                else {
                    console.time("allPlayers Query Time");
                    resp.players = allPlayers.all({ id: auth });
                    console.timeEnd("allPlayers Query Time");

                    resp.gamedata.lastKill = -1
                }

                resp.player = searchID.all({ id: auth })[0]

                return new Response(JSON.stringify(resp), { status: 200, headers: { "content-type": "application/json" } })
            }
            return new Response("Unauthorized", { status: 401 })
        }

        resp.gamedata.lastKill = -1

        console.time("allPublicPlayers Query Time");
        resp.players = publicAllPlayers.all();
        console.timeEnd("allPublicPlayers Query Time");


        return new Response(JSON.stringify(resp), { status: 200, headers: { "content-type": "application/json" } })
    }


    return new Response("404", { status: 404 })


}

async function post(req: Request, _inf: Deno.ServeHandlerInfo<Deno.NetAddr>): Promise<Response> {

    if (!isGameGoing()) {
        new Response("Game ended", { status: 500 })
    }

    const formatted: string = formatURL(req.url, false)


    // handles 
    if (((formatted.startsWith("kill/") || formatted.startsWith("vote/")) && formatted.length == IDLENGTH + 5) || formatted.startsWith("meeting")) {
        if (!req.body) {
            return new Response("Request body is required", { status: 400 })
        }
        const auth = await req.text()

        if (validIDs.includes(auth)) {
            //killing
            if (formatted.startsWith("kill/") && auth == killerID) {
                if (await isMeeting()) {
                    return new Response("You cant kill during a meeting", { status: 409 })

                }

                if (Number((await kv.get(["lastKill"])).value) + KILLCOOLDOWN < getUnixTime()) {

                    if (killPlayer.run({ publicID: formatted.slice(5, formatted.length) }) != 0) {
                        return new Response("Killed someone")
                    }
                    else {
                        return new Response("PlayerID not found or already dead", { status: 404 })
                    }
                }
                else{
                    if(publicIDs.includes(formatted.slice(5, formatted.length))){
                        if(extraKill.run() != 0){
                            killPlayer.run({ publicID: formatted.slice(5, formatted.length) })
                            return new Response("Killed someone with extra kill")
                        }
                        return new Response("You dont have extra kills and you are on cooldown or the person is already dead", {status : 500}) 
                    }
                    return new Response("playerID not found", {status: 500})
                }

            }

            //voting
            if (formatted.startsWith("vote/")) {
                if (!(await isMeeting())) {
                    return new Response("You can only vote during a meeting", { status: 409 })
                }

                if (!publicIDs.includes(formatted.slice(5, formatted.length))) {
                    return new Response("Public id does not exist", { status: 404 })
                }

                if (votePlayer.run({ voteID: formatted.slice(5, formatted.length), privateID: auth }) != 0) {
                    return new Response("Voted for someone")
                }
                else {
                    return new Response("PlayerID already dead", { status: 404 })
                }
            }

            //meeting
            if (formatted.startsWith("meeting")) {
                if (await isMeeting()) {
                    return new Response("A meeting is already going", { status: 409 })
                }


                if (callMeeting.run({ privateID: auth }) != 0) {
                    kv.set(["meetingStart"], getUnixTime())
                    return new Response("Called Meeting")
                }
                else {
                    return new Response("You cant call meeting", { status: 404 })
                }
            }
        }
        else {
            return new Response("Unauthorized", { status: 401 })
        }
    }



    return new Response("404, bad post format", { status: 404 })


}