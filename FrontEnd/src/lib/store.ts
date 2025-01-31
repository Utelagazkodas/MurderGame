





export let IPADRESS = "http://0.0.0.0:3000/"

export async function getIP() {
    let resp = await fetch(`./ip`)
    if (resp.ok) {

        IPADRESS = await resp.text()
    }  
}
