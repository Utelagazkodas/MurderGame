import { onMount } from "svelte"
import {
    getIP,
    IPADRESS,


} from "./ip.js"
import { setCookie, getCookie, removeCookie } from "typescript-cookie"
import type { GameData, player } from "$lib/classes.js"
import { writable, type Writable } from "svelte/store"

export let gameState: Writable<{ players: player[], gamedata: GameData, player?: player }> = writable()

let localGameState : { players: player[], gamedata: GameData, player?: player }
gameState.subscribe((val)=>{
    localGameState = val
})

export let globalId: string = ""

let refreshIntervalId: number

export async function init(){ 
    await getIP()

    let t = getCookie("id")

    await refresh()

    if (t) {
        
        if(!(await setId(t, undefined))){
            console.log(t)
           removeCookie("id") 
        }
        
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

    const resp = await fetch(`${IPADRESS}players/${playerToKill.publicID}`, {method: "POST", body: globalId})

    console.log(await resp.text())
    if(resp.ok){
        return true
    }
    return false
}

// exit
export async function logout(event?: Event) {

    globalId=""

    refresh()
}

// vote
export async function vote() {

}

// call meeting
export async function canMeeting() {

}