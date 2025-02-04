<script lang="ts">
  import { gameState, kill, logout, setId } from "$lib/api.js";
  import { derived, writable, type Writable } from "svelte/store";
  import type { player } from "$lib/classes.js";
  import KillPopUp from "../components/KillPopUp.svelte";
  import OtherPlayer from "../components/OtherPlayer.svelte";
  import { isMeeting } from "$lib/util";

  let id: string = $state("");

  export function resetIdTextInput() {
    id = "";
  }

  let killerPopup = writable(false);
  let killUser: Writable<player | undefined> = writable();

  let color = derived(gameState, ($gameState) =>
    $gameState.player?.isKiller ? "red-500" : "green-500"
  );

  let deadStrikeThrough = derived(gameState, ($gameState) =>
    $gameState.player?.revealDeath == null ? "" : "line-through"
  );

  let unixTime = writable(Math.floor(Date.now() / 1000));

setInterval(() => {
  unixTime.set(Math.floor(Date.now() / 1000));
}, 1000);
</script>

<div class="max-w-screen p-5 lg:px-96 lg:py-10">
  {#if !$gameState.player}
    <form
      onsubmit={async (event) => {
        await setId(id, event);
      }}
      class="text-gray-700"
    >
      <input
        type="text"
        bind:value={id}
        maxlength={16}
        placeholder="írd ide a kódot"
        class="rounded-xl"
      />
      <button type="submit" class="bg-gray-200 ml-4 p-1 rounded-md"
        >Belépés</button
      >
    </form>
  {/if}

  {#if $gameState.player}
    <div class="w-full flex justify-between text-white items-center">
      <div class="bg-gray-700 py-1 px-5 border-gray-800 rounded-lg">
        <div class="{$deadStrikeThrough} text-2xl tracking-wider">
          {$gameState.player.name}
        </div>

        <div
          class="text-lg tracking-normal text-{$color} {$deadStrikeThrough} pl-2"
        >
          {#if $gameState.player.isKiller}
            Gyilkos
          {:else}
            Ártatlan
          {/if}
        </div>
      </div>

      <button
        onclick={(event) => {
          logout(event);
        }}
        class="p-2 border border-gray-800 bg-gray-700 rounded-full aspect-square h-max"
        aria-label="logout"
      >
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


    <div class="w-full flex place-content-center h-40 bg-gray-800 rounded-xl border-gray-950 p-1">
      <div class="flex-1  text-white">{$unixTime}</div>
      <button class="flex-1 bg-red-300"> Meeting </button>
    </div>

  {/if}

  <hr class="my-3 mx-10" />

  {#if $gameState.players}
    <div class="flex flex-col items-center text-lg text-center">
      {#each $gameState.players as player, i}
        <OtherPlayer {killUser} thisPlayer={player} />
      {/each}
    </div>
  {/if}
</div>

<KillPopUp open={killerPopup} playerToKill={$killUser} />
