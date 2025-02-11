<script lang="ts">
  import { gameState, kill, unixTime, vote, votedForId } from "$lib/api";
  import type { player } from "$lib/classes";
  import { fallBack, isMeeting, secondsToDate } from "$lib/util";
  import { derived, type Writable } from "svelte/store";
  

  let {
    thisPlayer,
    killUser,
    killPopUp
  }: { thisPlayer: player, killUser: Writable<player | undefined>, killPopUp : Writable<boolean> } = $props();
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
        >{fallBack(thisPlayer.name, thisPlayer.nickname)}</span
      >
      {#if $gameState.player && $gameState.player.isKiller && !isMeeting($gameState.gamedata) && thisPlayer.revealDeath == null}
        <button
          onclick={(event) => {
            if ($killUser == undefined) {
              killUser.set(thisPlayer);
              killPopUp.set(true)
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
      {:else if $gameState && $gameState.player && isMeeting($gameState.gamedata) && $gameState.player.revealDeath == null}
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

      {#if thisPlayer.revealDeath && $gameState.player?.isKiller}
        <div class="text-red-500" >
          {secondsToDate(thisPlayer.revealDeath-$unixTime).altSmallString}
        </div>
      {/if}
    </div>
    <div class="text-gray-700 text-center w-full flex justify-center text-base">
      {#if isMeeting($gameState.gamedata)}
        {#each $gameState.players as player}
           {#if player.publicID == thisPlayer.voteID && thisPlayer.voteID != null}
            Rá szavazott: {fallBack(player.name, player.nickname)}
           {/if}
        {/each}
      {:else}
         {#if thisPlayer.canCallMeeting > 0}
         
         {thisPlayer.canCallMeeting}
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-megaphone -rotate-12"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
        
         {:else}
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-megaphone-off -rotate-12"><path d="M9.26 9.26 3 11v3l14.14 3.14"/><path d="M21 15.34V6l-7.31 2.03"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
         {/if}
      {/if}
    </div>
  {:else}
    <!-- dead other player -->
    <div class="line-through">
      {fallBack(thisPlayer.name, thisPlayer.nickname)}
    </div>
  {/if}
</div>
