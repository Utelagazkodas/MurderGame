import { writable, type Writable } from "svelte/store";

export let thisUser: Writable<user | undefined> = writable(undefined)

export let otherUsers: Writable<user[] | undefined> = writable(undefined)

export let IPADRESS = "http://0.0.0.0:3000/"

export async function getIP() {
    let resp = await fetch(`http://${window.location.hostname}:${window.location.port}/ip.json`)
    if (resp.ok) {

        IPADRESS =JSON.parse(await resp.text())
    }  
}

export class user {
    public id?: string
    public isKiller?: boolean
    public name: string
    public alive: boolean
    public publicID: string

    constructor(_name: string, _alive: boolean, _publicID: string, _id?: string, _isKiller?: boolean) {
        this.name = _name
        this.alive = _alive
        this.id = _id
        this.isKiller = _isKiller
        this.publicID = _publicID
    }
}