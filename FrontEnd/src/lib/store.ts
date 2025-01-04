import { writable, type Writable } from "svelte/store";

export let thisUser: Writable<user | undefined> = writable(undefined)
export let killerPopup = writable(false)

export let otherUsers: Writable<user[] | undefined> = writable(undefined)

export let IPADRESS = "http://0.0.0.0:3000/"

export async function getIP() {
    let resp = await fetch(`./ip`)
    if (resp.ok) {

        IPADRESS = await resp.text()
    }  
}

export class user {
    public id?: string
    public isKiller?: boolean
    public name?: string
    public alive: boolean
    public publicID: string
    public nickname : string

    constructor(_nickname: string, _alive: boolean, _publicID: string, _name? : string ,_id?: string,_isKiller?: boolean) {
        this.nickname = _nickname
        this.alive = _alive
        this.id = _id
        this.isKiller = _isKiller
        this.publicID = _publicID
        this.name = _name


    }
}