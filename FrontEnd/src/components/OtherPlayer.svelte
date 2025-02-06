<script lang="ts">
  import { gameState, kill, vote, votedForId } from "$lib/api";
  import type { player } from "$lib/classes";
  import { isMeeting } from "$lib/util";
  import { derived, type Writable } from "svelte/store";

  let {
    thisPlayer,
    killUser,
  }: { thisPlayer: player; killUser: Writable<player | undefined> } = $props();
</script>

<div
  class="w-full m-2 rounded-full border-2 max-w-[700px] p-0.5 text-center bg-{thisPlayer.alive
    ? 'green-500'
    : 'red-500'}"
>
  {#if thisPlayer.alive}
    <!-- alive other player -->
    <div class="flex justify-center">
      <span class="mr-2"
        >{thisPlayer.name
          ? thisPlayer.name
          : thisPlayer.nickname}</span
      >
      {#if $gameState.player && $gameState.player.isKiller && !isMeeting($gameState.gamedata) && thisPlayer.revealDeath == null}
        <button
          onclick={(event) => {
            if ($killUser == undefined) {
              killUser.set(thisPlayer);
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
      {:else if $gameState && $gameState.player && isMeeting($gameState.gamedata)}
        <button
          onclick={(event) => {
            vote(thisPlayer, event)
          }}
          aria-label="vote"
          class=" flex items-center mx-5"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-vote text-{thisPlayer.publicID == $votedForId ? "green-800" : "green-300"}"><path d="m9 12 2 2 4-4"/><path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"/><path d="M22 19H2"/></svg>
        </button>
      {/if}
    </div>
  {:else}
    <!-- dead other player -->
    <div>
      {thisPlayer.name
        ? `${thisPlayer.name} (${thisPlayer.nickname})`
        : thisPlayer.nickname}
    </div>
  {/if}
</div>
