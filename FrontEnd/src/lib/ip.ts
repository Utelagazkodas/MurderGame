export let IPADRESS = "http://0.0.0.0:3000/"

export async function getIP() : Promise<boolean> {
    let resp = await fetch(`./ip`)
    if (resp.ok) {

        IPADRESS = await resp.text()
        return true
    }  
    return false
}
