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
          class=" flex items-center mx-5 size-7"
        >
        <svg fill="#ef2222" width="256px" height="256px" viewBox="-25.6 -25.6 307.20 307.20" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="#ef4444" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M234.627,29.37207a32.03555,32.03555,0,0,0-45.2539,0c-.03516.03418-.06934.06934-.10352.10352L15.41211,207.61914a11.9994,11.9994,0,0,0,5.88965,20.07324,159.19354,159.19354,0,0,0,35.88281,4.11035c34.207-.001,68.416-11.10253,100.5459-32.86816,32.292-21.875,51.085-46.68945,51.86914-47.73437a12.00045,12.00045,0,0,0-1.11426-15.68555l-15.99707-15.99707,42.28906-45.04A32.038,32.038,0,0,0,234.627,29.37207ZM143.66309,179.47461c-30.92676,20.78711-62.69434,30.19824-94.69727,28.126l97.62891-100.03614,20.37695,20.377q.28125.30468.58984.59375l.04981.04687,16.10742,16.10742A222.21934,222.21934,0,0,1,143.66309,179.47461ZM217.65723,57.6582c-.08985.08887-.17676.17871-.2627.27051l-41.88476,44.61035L163.3584,90.3877l43.02344-44.084A8.001,8.001,0,0,1,217.65723,57.6582Z"></path> </g></svg>
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
    
      {#if $gameState.gamedata.killerID && $gameState.gamedata.killerID == thisPlayer.publicID}
      <div class="line-through">
         Gyilkos
        </div>

        {:else}
         <div class="line-through ">
          Ártatlan
         </div>
      {/if}
      
    
  {/if}
</div>
