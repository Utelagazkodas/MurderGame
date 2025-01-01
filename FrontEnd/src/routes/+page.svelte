<script lang="ts">
  import { onMount } from "svelte";
  import { getIP, IPADRESS, otherUsers, thisUser, type user } from "../lib/store.js";
  import { setCookie, getCookie, removeCookie } from "typescript-cookie";

  let id = $state("");
  let idSet = $state(false);

  onMount(() => {
    getIP()


    let t = getCookie("id")

    if (t) {
      id = t
      setId()
    }
  })

  let setId = async (event?: Event) => {
    if (event) {
      event.preventDefault();
    }

    if (id.length == 16) {
      let resp = await fetch(IPADRESS + "id/" + id);

      if (resp.ok) {
        let respText = await resp.text();
        idSet = true;

        thisUser.set(JSON.parse(respText));

        setCookie("id", id)

        refresh()
      }
    }
  };

  let refresh = async (event?: Event) => {
    if (event) {
      event.preventDefault();
    }

    let resp = await fetch(IPADRESS + "players");
    if (resp.ok) {
      let respText = await resp.text();

      otherUsers.set(JSON.parse(respText));

      if ($otherUsers) {
        for (let i = 0; i < $otherUsers.length; i++) {
          if ($thisUser?.publicID == $otherUsers[i].publicID) {
            $otherUsers.splice(i, 1);
          }
        }
      }
    }
  };

  let kill = async (event: Event, userToKill: user) => {
    event.preventDefault()

    let resp = await fetch(IPADRESS + "kill/" + userToKill.publicID, {
      method: "POST",
      body: $thisUser?.id,
    })

    if (!resp.ok) {
      console.error(`error killing ${userToKill.name}`)
    }

    refresh(event);
  }


  let exit = (event? : Event)=>{
    if(event){
      event.preventDefault()
    }

    thisUser.set(undefined)
    otherUsers.set(undefined)
    id= ""
    idSet = false
    removeCookie("id")
  }

</script>

<div
  class="w-screen h-screen flex place-content-center items-center bg-gray-800"
>
  <div
    class="max-w-screen max-h-screen bg-gray-700 rounded-2xl p-6 m-5 h-[90vh] aspect-9/16 md:aspect-13/16 border border-gray-400 text-gray-200"
  >
    <div>W6 (+Léna) gyilkosos játék dolog</div>

    {#if !idSet}
      <form onsubmit={setId}>
        <input
          type="text"
          bind:value={id}
          maxlength={16}
          placeholder="írd ide a kódot"
        />
      </form>
    {/if}

    {#if $thisUser}
      <button onclick={exit}> Kilépés </button>
      <br />
      Szia {$thisUser.name}
      {#if !$thisUser.alive}
        halott vagy:(
      {/if}
      <br />

      {#if !$thisUser.isKiller}
        NEM te vagy a gyilkos
      {:else}
        TE VAGY A GYILKOS
      {/if}
      <hr />

      <button aria-label="Refresh" onclick={refresh}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-refresh-cw"
          ><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path
            d="M21 3v5h-5"
          /><path
            d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"
          /><path d="M8 16H3v5" /></svg
        >
      </button>

      {#if $otherUsers}
        {#each $otherUsers as user}
          <br />
          {user.name}
          {#if user.alive}
            él
            {#if $thisUser.isKiller}
              <button
                onclick={(event) => {
                  kill(event, user);
                }}>megölés</button
              >
            {/if}
          {:else}
            HALOTT
          {/if}
        {/each}
      {/if}
    {/if}
  </div>
</div>
