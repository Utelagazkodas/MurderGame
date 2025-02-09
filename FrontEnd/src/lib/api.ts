import { onMount } from "svelte"
import {
    getIP,
    IPADRESS,


} from "./ip.js"
import { setCookie, getCookie, removeCookie } from "typescript-cookie"
import type { GameData, player } from "$lib/classes.js"
import { writable, type Writable } from "svelte/store"
import { isMeeting } from "./util.js"

export let gameState: Writable<{ players: player[], gamedata: GameData, player?: player }> = writable()

let localGameState : { players: player[], gamedata: GameData, player?: player }
gameState.subscribe((val)=>{
    localGameState = val
    if(val && val.player){
    console.log(val.player?.canCallMeeting)
    }
})

export let globalId: string = ""

let refreshIntervalId: number

export let unixTime = writable(Math.floor(Date.now() / 1000));

export let votedForId : Writable<string> = writable("")


export async function init(){ 
    await getIP()

    let t = getCookie("id")

    await refresh()

    setInterval(() => {
        unixTime.set(Math.floor(Date.now() / 1000));
      }, 1000);

    if (t) {
        
        if(!(await setId(t, undefined))){
            console.log(t)
           removeCookie("id") 
        }
        
    }

    if(localGameState){
        refreshIntervalId= setInterval(refresh, 5000);
    }
    else {
        refreshIntervalId= setInterval(async () => {
            await refresh()

            if(localGameState){
                clearInterval(refreshIntervalId)
                refreshIntervalId= setInterval(refresh, 5000);
            }
        }, 1000);
    }
}

export async function setId(id: string, event?: Event): Promise<Boolean> {
    if (event) {
        event.preventDefault()
    }



    if (localGameState && id != "" && id.length == localGameState.gamedata.idLength) {
        globalId = id

        if (!(await refresh())) {
            globalId = ""
            return false
        }

        setCookie("id", id, {expires: 365})
        return true
    }
    else {
        refresh()
        return false
    }
}

// refresh
export async function refresh(event?: Event): Promise<boolean> { // returns true if logged in
    if (event) {
        event.preventDefault
    }

    let resp: Response

    if (localGameState&&globalId.length == localGameState.gamedata.idLength) {
        resp = await fetch(`${IPADRESS}players/${globalId}`);
    } else {
        resp = await fetch(IPADRESS + "players");
    }

    if (resp.ok) {

        gameState.set(JSON.parse(await resp.text()))

        if (localGameState.player) {
            votedForId.set(localGameState.player.voteID ? localGameState.player.voteID : "")
            return true
        }
    }
    return false
}

//kill
export async function kill(playerToKill: player, event?: Event) : Promise<boolean> { // return true if sucessfully killed someone
    if (event) {
        event.preventDefault()
    }

    if(!localGameState || !localGameState.player || !localGameState.player.isKiller){
        console.error("You cant kill someone because you are either not logged in or you are not the killer")
        return false
    }
    if(isMeeting(localGameState.gamedata)){
        console.error("You cant kill during a meeting")
    }

    const resp = await fetch(`${IPADRESS}kill/${playerToKill.publicID}`, {method: "POST", body: globalId})

    console.log(await resp.text())
    if(resp.ok){
        console.log("sucesfully killed someone")
        return true
    }
    console.error("failed to kill someone")
    return false
}

// exit
export async function logout(event?: Event) {

    globalId=""

    removeCookie("id")

    refresh()

    console.log("You logged out")
}

// vote
export async function vote(playerToVote : player, event? : Event) : Promise<boolean>{ // returns true if it is sucesfull
    if(event){
        event.preventDefault()
    }

    if(localGameState && localGameState.player && localGameState.player.revealDeath == null && isMeeting(localGameState.gamedata)){
        const resp = await fetch(`${IPADRESS}vote/${playerToVote.publicID}`, {method: "POST", body: globalId})

        console.log(await resp.text())
        if(resp.ok){
            console.log("sucesfully voted for someone")

            votedForId.set(playerToVote.publicID)
            return true
        }
        console.log("failed to vote for someone")
        return false
    }
    console.error("You cant vote because you are not logged in or dead")
    return false
}

// call meeting
export async function callMeeting(event? : Event) : Promise<boolean> {
    if(event){
        event.preventDefault()
    }

    if(localGameState && localGameState.player && localGameState.player.revealDeath == null && localGameState.player.canCallMeeting > 0 && !isMeeting(localGameState.gamedata)){
        const resp = await fetch(`${IPADRESS}meeting`, {method: "POST", body: globalId})

        console.log(await resp.text())
        if(resp.ok){
            console.log("sucesfully voted for someone")
            return true
        }
        console.log("failed to vote for someone")
        return false
    }
    console.error("You cant call meeting because you are not logged in or dead or it is already a meeting")
    return false
}