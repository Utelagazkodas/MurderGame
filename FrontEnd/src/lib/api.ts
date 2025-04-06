import { onMount } from "svelte"
import {
    getIP,
    IPADRESS,


} from "./ip.js"
import { setCookie, getCookie, removeCookie } from "typescript-cookie"
import type { GameData, player } from "$lib/classes.js"
import { writable, type Writable } from "svelte/store"
import { isMeeting } from "./util.js"
import { pushState } from "$app/navigation"
import { get } from "svelte/store"

export let gameState: Writable<{ players: player[], gamedata: GameData, player?: player }> = writable()



export let globalId: string = ""

let refreshIntervalId: number

export let unixTime = writable(Math.floor(Date.now() / 1000));

export let votedForId: Writable<string> = writable("")


export async function init() {
    await getIP()

    let t = getCookie("id")

    await refresh()

    let params = new URLSearchParams(window.location.search)

    if (params.has("id") && params.get("id")?.length == get(gameState).gamedata.idLength) {
        t = params.get("id")!
    }

    removeIdFromUrl()


    if (t) {

        if (!(await setId(t, undefined))) {
            console.log(t)
            removeCookie("id")
        }

    }



    setInterval(() => {
        unixTime.set(Math.floor(Date.now() / 1000));
        if (Math.floor(Date.now() / 1000) >= get(gameState).gamedata.meetingStart + get(gameState).gamedata.meetingLength) {
            refresh()
        }
    }, 1000);



    if (get(gameState)) {
        refreshIntervalId = setInterval(refresh, 5000);
    }
    else {
        refreshIntervalId = setInterval(async () => {
            await refresh()

            if (get(gameState)) {
                clearInterval(refreshIntervalId)
                refreshIntervalId = setInterval(refresh, 5000);
            }
        }, 1000);
    }
}

export async function setId(id: string, event?: Event): Promise<Boolean> {
    if (event) {
        event.preventDefault()
    }



    if (get(gameState) && id != "" && id.length == get(gameState).gamedata.idLength) {
        globalId = id

        if (!(await refresh())) {
            globalId = ""
            return false
        }

        setCookie("id", id, { expires: 365 })
        return true
    }
    else {
        refresh()
        return false
    }
}

// refresh
export async function refresh(event?: Event): Promise<boolean> { // returns true if logged in
    let currentState = get(gameState);


    if (event) {
        event.preventDefault
    }

    let resp: Response



    if (currentState && globalId.length == currentState.gamedata.idLength) {
        resp = await fetch(`${IPADRESS}players/${globalId}`);
    } else {
        resp = await fetch(IPADRESS + "players");
    }


    if (resp.ok) {

        gameState.set(JSON.parse(await resp.text()))
        currentState = get(gameState)

        if (currentState.player) {
            votedForId.set(currentState.player.voteID ? currentState.player.voteID : "")
            return true
        }
    }
    return false
}

//kill
export async function kill(playerToKill: player, event?: Event): Promise<boolean> { // return true if sucessfully killed someone
    const currentState = get(gameState);

    if (event) {
        event.preventDefault()
    }

    if (currentState.gamedata.gameWon != 0) {
        console.error("you cant kill someone, the game is over")
        return false
    }

    if (!currentState || !currentState.player || !currentState.player.isKiller) {
        console.error("You cant kill someone because you are either not logged in or you are not the killer")
        return false
    }
    if (isMeeting(currentState.gamedata)) {
        console.error("You cant kill during a meeting")
    }

    const resp = await fetch(`${IPADRESS}kill/${playerToKill.publicID}`, { method: "POST", body: globalId })

    refresh()
    console.log(await resp.text())
    if (resp.ok) {
        console.log("sucesfully killed someone")
        return true
    }
    console.error("failed to kill someone")
    return false
}

// exit
export async function logout(event?: Event) {

    globalId = ""

    removeCookie("id")

    refresh()

    console.log("You logged out")
}

// vote
export async function vote(playerToVote: player, event?: Event): Promise<boolean> { // returns true if it is sucesfull
    const currentState = get(gameState);
    if (currentState.gamedata.gameWon != 0) {
        console.error("you cant vote, the game is over")
        return false
    }
    if (event) {
        event.preventDefault()
    }

    if (currentState && currentState.player && currentState.player.revealDeath == null && isMeeting(currentState.gamedata)) {
        const resp = await fetch(`${IPADRESS}vote/${playerToVote.publicID}`, { method: "POST", body: globalId })
        refresh()

        console.log(await resp.text())
        if (resp.ok) {
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
export async function callMeeting(event?: Event): Promise<boolean> {
    const currentState = get(gameState);
    if (currentState.gamedata.gameWon != 0) {
        console.error("you cant call meeting, the game is over")
        return false
    }

    if (event) {
        event.preventDefault()
    }

    if (currentState && currentState.player && currentState.player.revealDeath == null && currentState.player.canCallMeeting > 0 && !isMeeting(get(gameState).gamedata)) {
        const resp = await fetch(`${IPADRESS}meeting`, { method: "POST", body: globalId })
        refresh()

        console.log(await resp.text())
        if (resp.ok) {
            console.log("sucesfully voted for someone")
            return true
        }
        console.log("failed to vote for someone")
        return false
    }
    console.error("You cant call meeting because you are not logged in or dead or it is already a meeting")
    return false
}

function removeIdFromUrl() {
    const url = new URL(window.location.href)
    url.searchParams.delete('id')
    pushState(url, {})
}