import "jsr:@std/dotenv/load";
import { allPlayersKiller, extraKill, getCitisens, IDLENGTH, killAllCitisens, KILLCOOLDOWN, kv, publicIDs, revealDead, validIDs, votePlayer } from "./main.ts";
import { searchID, allPlayers, killerPrivateID, killPlayer, publicAllPlayers, callMeeting } from "./main.ts";
import { formatURL, GameData, getUnixTime, player, } from "./util.ts";
import { getGameData, isGameGoing, isMeeting } from "./gameutils.ts";

export async function request(req: Request, inf: Deno.ServeHandlerInfo<Deno.NetAddr>): Promise<Response> {
    let resp: Response = new Response
    console.log(`Incoming request: ${req.method} ${req.url}`)

    switch (req.method) {
        case "GET":
            resp = await get(req, inf)
            break
        case "POST":
            resp = await post(req, inf)
            break
        default:
            return new Response("Method is not supported", {status: 405})
            
    }

    resp.headers.set('Access-Control-Allow-Origin', '*'); // Allows requests from any origin
    return resp
}


async function get(req: Request, _inf: Deno.ServeHandlerInfo<Deno.NetAddr>) {

    const formatted: string = formatURL(req.url, false)


    if (formatted.startsWith("players")) {

        const resp: { players: player[], gamedata: GameData, player?: player } = { players: [], gamedata: await getGameData() }

        if (formatted.startsWith("players/") && formatted.length == IDLENGTH + 8) {
            const auth = formatted.slice(8, formatted.length)
            if (validIDs.includes(auth)) {

                if (killerPrivateID == auth) {

                    resp.players = allPlayersKiller.all({ id: auth });

                }
                else {

                    resp.players = allPlayers.all({ id: auth });


                    resp.gamedata.lastKill = -1
                }

                resp.player = searchID.all({ id: auth })[0]

                return new Response(JSON.stringify(resp), { status: 200, headers: { "content-type": "application/json" } })
            }
            return new Response("Unauthorized", { status: 401 })
        }

        resp.gamedata.lastKill = -1


        resp.players = publicAllPlayers.all();



        return new Response(JSON.stringify(resp), { status: 200, headers: { "content-type": "application/json" } })
    }


    return new Response("404", { status: 404 })


}

async function post(req: Request, _inf: Deno.ServeHandlerInfo<Deno.NetAddr>): Promise<Response> {

    if (!(await isGameGoing())) {
        console.log("Game has ended, rejecting POST request.")
        
        return new Response("Game ended", { status: 500 })
    }

    const formatted: string = formatURL(req.url, false)

    console.log(`POST request for: ${formatted}`)


    // handles post
    if (((formatted.startsWith("kill/") || formatted.startsWith("vote/")) && formatted.length == IDLENGTH + 5) || formatted.startsWith("meeting")) {
        if (!req.body) {
            console.log("POST request missing body")
            return new Response("Request body is required", { status: 400 })
        }
        const auth = await req.text()
        

        if (validIDs.includes(auth)) {
            //killing
            if (formatted.startsWith("kill/") && auth == killerPrivateID) {
                console.log("Killer attempting to kill")
                if (await isMeeting()) {
                    console.log("Kill blocked: meeting in progress")
                    return new Response("You cant kill during a meeting", { status: 409 })

                }

                if (Number((await kv.get(["lastKill"])).value) + KILLCOOLDOWN < getUnixTime()) {

                    if (killPlayer.run({ publicID: formatted.slice(5, formatted.length) }) != 0) {
                        console.log(`Player killed: ${formatted.slice(5)}`)

                        if(getCitisens.all()[0]["COUNT()"] == 1){
                            kv.set(["gameWon"], -1)
                            killAllCitisens.run()
                            console.log("Killer won by killing everyone")
                        }

                        kv.set(["lastKill"], getUnixTime())

                        return new Response("Killed someone")
                    }
                    else {
                        console.log("Kill failed: PlayerID not found or already dead or killer")
                        return new Response("PlayerID not found or already dead or killer", { status: 404 })
                    }
                }
                else{
                    if(publicIDs.includes(formatted.slice(5, formatted.length))){
                        if(extraKill.run() != 0){
                            killPlayer.run({ publicID: formatted.slice(5, formatted.length) })
                            console.log(`Extra kill used on: ${formatted.slice(5)}`)
                            return new Response("Killed someone with extra kill")
                        }
                        console.log("Kill failed: No extra kills or cooldown active")
                        return new Response("You dont have extra kills and you are on cooldown or the person is already dead", {status : 500}) 
                    }
                    console.log("Kill failed: PlayerID not found")
                    return new Response("playerID not found", {status: 500})
                }

            }

            //voting
            if (formatted.startsWith("vote/")) {
                console.log("Vote attempt by:", auth)
                if (!(await isMeeting())) {
                    console.log("Vote blocked: No active meeting")
                    return new Response("You can only vote during a meeting", { status: 409 })
                }


                if (!publicIDs.includes(formatted.slice(5, formatted.length))) {
                    console.log("Vote failed: Invalid public ID")
                    return new Response("Public id does not exist", { status: 404 })
                }

                if (votePlayer.run({ voteID: formatted.slice(5, formatted.length), privateID: auth }) != 0) {
                    console.log(`Player voted for: ${formatted.slice(5)}`)
                    return new Response("Voted for someone")
                }
                else {
                    console.log("Vote failed: Target already dead")
                    return new Response("PlayerID already dead", { status: 404 })
                }
            }

            //meeting
            if (formatted.startsWith("meeting")) {
                console.log("Meeting call attempt by:", auth)
                if (await isMeeting()) {
                    console.log("Meeting call blocked: Already in progress")
                    return new Response("A meeting is already going", { status: 409 })
                }


                if (callMeeting.run({ privateID: auth }) != 0) {
                    revealDead.run()
                    kv.set(["meetingStart"], getUnixTime())
                    console.log("Meeting started")
                    return new Response("Called Meeting")
                }
                else {
                    console.log("Meeting call failed")
                    return new Response("You cant call meeting", { status: 404 })
                }
            }
        }
        else {
            console.log("Unauthorized attempt:", auth)
            return new Response("Unauthorized", { status: 401 })
        }
    }


    console.log("POST request not recognized:", formatted)
    return new Response("404, bad post format", { status: 404 })


}
