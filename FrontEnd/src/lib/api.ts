import { onMount } from "svelte"
import {
    getIP,
    IPADRESS,


} from "../lib/store.js"
import { setCookie, getCookie, removeCookie } from "typescript-cookie"
import type { GameData, player } from "$lib/classes.js"

export let idSet = $state(false)

export let gameState: { players: player[], gamedata: GameData, player?: player }
export let globalId: string = ""

let refreshIntervalId: number
onMount(async () => {
    await getIP()

    let t = getCookie("id")

    refresh()

    if (t) {
        setId(undefined, t)
    }
})

export async function setId(event?: Event, id?: string) {
    if (event) {
        event.preventDefault()
    }

    if(gameState){
        
    }
    else{
        refresh()
    }
}

// refresh
export async function refresh(event?: Event): Promise<boolean> {
    if (event) {
        event.preventDefault
    }

    let resp: Response

    if (globalId.length == gameState.gamedata.idLength) {
        resp = await fetch(`${IPADRESS}players/${globalId}`);
    } else {
        resp = await fetch(IPADRESS + "players");
    }

    if (resp.ok) {
        gameState = JSON.parse(await resp.text())

        if (gameState.player) {
            return true
        }
    }
    return false
}

//kill
export async function kill(event: Event, playerToKill: player) {
    event.preventDefault()


}

// exit
export async function logout(event?: Event) {

}

// vote
export async function vote() {

}

// call meeting
export async function canMeeting() {

}