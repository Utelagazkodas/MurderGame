<script lang="ts">
  import { gameState, kill } from "$lib/api";
  import type { player } from "$lib/classes";
  import { isMeeting } from "$lib/util";
  import { derived, type Writable } from "svelte/store";

  let {
    thisPlayer,
    killUser,
  }: { thisPlayer: player; killUser: Writable<player | undefined> } = $props();
</script>

<div class="w-full m-2 rounded-full border-2 max-w-[700px] p-0.5 text-center bg-{thisPlayer.alive ? "green-500" : "red-500"}">
  {#if thisPlayer.alive }
    <!-- alive other player -->
    <div class="flex justify-center">
      <span class="mr-2">{thisPlayer.name ? `${thisPlayer.name} (${thisPlayer.nickname})` : thisPlayer.nickname}</span>
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
      {/if}
    </div>
  {:else}
    <!-- dead other player -->
    <div>
      {thisPlayer.name ? `${thisPlayer.name} (${thisPlayer.nickname})` : thisPlayer.nickname}
    </div>
  {/if}
</div>
