export let IPADRESS : string | undefined = undefined

export async function getIP() : Promise<boolean> {
    let resp = await fetch(`./ip`)
    if (resp.ok) {

        IPADRESS = await resp.text()
        return true
    }  
    return false
}
