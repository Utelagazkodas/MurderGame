<script lang="ts">
  import { gameState, kill, logout, setId} from "$lib/api.js";
  import { writable } from "svelte/store";
  import type { player } from "$lib/classes.js";
  import RockPopUp from "../components/RockPopUp.svelte";
  import KillPopUp from "../components/KillPopUp.svelte";

  let id : string = $state("")

  export function resetIdTextInput(){
    id = ""
  }

  let killerPopup = writable(false)
  let killUser : player | undefined = $state()

  let rockPopup = writable(false)

</script>

<div
  class="max-w-screen   p-5 lg:px-96 lg:py-10"
>

    {#if  !$gameState.player}
      <form onsubmit={async (event)=>{await setId(id, event)}} class="text-gray-700">
        <input
          type="text"
          bind:value={id}
          maxlength={16}
          placeholder="írd ide a kódot"
          class="rounded-xl"
        />
        <button type="submit" class="bg-gray-200 ml-4 p-1 rounded-md">Belépés</button>
      </form>
    {/if}

    {#if  $gameState.player}
      <div class="w-full flex justify-between text-lg text-white">
        Szia {$gameState.player.name}

        <button onclick={(event)=>{
          logout(event)
        }} class="p-2 border border-gray-800 bg-gray-700 rounded-full" aria-label="logout">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 20 24"
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
      </div>

      <br />

      {#if !$gameState.player.isKiller}
        <span class="text-green-300"> Nem te vagy a gyilkos </span>
        {#if $gameState.player.revealDeath}
          viszont
          <span class="font-bold text-red-700">halott vagy </span> :(
        {/if}
      {:else}
        <span class="text-red-400"> TE VAGY A GYILKOS </span> screenshotold le
        ->
        <button
          class="text-blue-300"
          onclick={() => {
            rockPopup.set(true)
          }}>kép</button
        >
        <br />
        ezzel tudsz majd ölni, és egy pár órával utána itt öld meg a piros X-el amikor
        bejelenti
        
        <RockPopUp open={rockPopup}/>

        <KillPopUp open={killerPopup} playerToKill={killUser}/>
      {/if}

      {#if $gameState.players}
        <!-- Other players -->
        <div
          class="flex flex-col items-center text-lg *:w-full *:m-2 text-center *:rounded-full *:border-2 *:p-0.5"
        >
          {#each $gameState.players as player, i}
            {#if player.alive}
              <!-- alive other player -->
              <div class="bg-green-500 flex justify-center">
                <span class="mr-2">{player.name} (alias {player.nickname})</span>
                {#if $gameState.player.isKiller}
                  <button
                    onclick={(event) => {
                      if (killUser == undefined) {
                        killUser = player
                      }
                    }}
                    aria-label="kill"
                    class=" flex items-center mx-5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-x text-red-500 rounded-full border-2 border-red-500"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                {/if}
              </div>
            {:else}
              <!-- dead other player -->
              <div class="bg-red-500">
                {player.name} (alias {player.nickname})
              </div>
            {/if}
          {/each}
        </div>
        <!-- /other players -->
      {/if}
    {:else if $gameState.players}
      <div
        class="flex flex-col items-center text-lg *:w-full *:m-2 text-center *:rounded-full *:border-2 *:p-0.5"
      >
        {#each $gameState.players as player, i}
          {#if player.alive}
            <!-- alive other player -->
            <div class="bg-green-500 flex justify-center">
              <span class="mr-2">{player.nickname}</span>
            </div>
          {:else}
            <!-- dead other player -->
            <div class="bg-red-500">
              {player.nickname}
            </div>
          {/if}
        {/each}
      </div>
    {/if}
  
</div>
