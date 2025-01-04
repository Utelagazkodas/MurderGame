<script lang="ts">
  import { onMount } from "svelte";
  import {
    getIP,
    IPADRESS,
    otherUsers,
    thisUser,
    type user,
  } from "../lib/store.js";
  import { setCookie, getCookie, removeCookie } from "typescript-cookie";

  let id = $state("");
  let idSet = $state(false);

  let refreshIntervalId : number
  onMount(() => {
    getIP();

    let t = getCookie("id");

    if (t) {
      id = t;
      setId();
    }
  });

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

        setCookie("id", id);

        refresh();

        refreshIntervalId = setInterval(refresh, 5000);
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

      let t : user[] =JSON.parse(respText);

      if (t) {
        for (let i = 0; i < t.length; i++) {
          if ($thisUser?.publicID == t[i].publicID) {
            t.splice(i, 1);
          }
        }

        otherUsers.set(t)
      }


    }
  };

  let kill = async (event: Event, userToKill: user) => {
    event.preventDefault();

    let resp = await fetch(IPADRESS + "kill/" + userToKill.publicID, {
      method: "POST",
      body: $thisUser?.id,
    });

    if (!resp.ok) {
      console.error(`error killing ${userToKill.name}`);
    }

    refresh(event);
  };

  let exit = (event?: Event) => {
    if (event) {
      event.preventDefault();
    }

    thisUser.set(undefined);
    otherUsers.set(undefined);
    id = "";
    idSet = false;
    removeCookie("id");
    clearInterval(refreshIntervalId)
  };
</script>

<div
  class="w-screen h-screen flex place-content-center items-center bg-gray-800"
>
  <div
    class="max-w-screen max-h-screen bg-gray-700 rounded-2xl p-6 m-5 h-[90vh] aspect-9/16 md:aspect-12/9 border border-gray-400 text-gray-200"
  >
    

    {#if !idSet}
      <form onsubmit={setId} class="text-gray-700">
        <input
          type="text"
          bind:value={id}
          maxlength={16}
          placeholder="írd ide a kódot"
        />
      </form>
    {/if}

    {#if $thisUser}
      <button onclick={exit} aria-label="logout">
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
          class="lucide lucide-log-out"
          ><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline
            points="16 17 21 12 16 7"
          /><line x1="21" x2="9" y1="12" y2="12" /></svg
        >
      </button>
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
      

      {#if $otherUsers}
        <!-- Other users -->
        <div class="flex flex-col items-center text-lg *:w-full *:m-2 text-center  *:rounded-full *:border-2">
          {#each $otherUsers as user}
            

            {#if user.alive}
              <div class="bg-green-500">
                {user.name}
                {#if $thisUser.isKiller}
                  <button
                    onclick={(event) => {
                      kill(event, user);
                    }}>megölés</button
                  >
                {/if}
              </div>
            {:else}
              <div class="bg-red-500">
                {user.name}
              </div>
            {/if}
          {/each}
        </div>
        <!-- /other users -->
      {/if}
    {/if}
  </div>
</div>
