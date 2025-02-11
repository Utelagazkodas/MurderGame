<script lang="ts">
  import { gameState, kill, unixTime } from "$lib/api";
  import type { player } from "$lib/classes";
  import type { Writable } from "svelte/store";
  import PopUp from "./PopUp.svelte";
  import { secondsToDate } from "$lib/util";

  let {
    open,
    playerToKill,
  }: { open: Writable<boolean>; playerToKill: Writable<player | undefined> } =
    $props();

  if ($playerToKill?.revealDeath != null) {
    open.set(false);
  }
</script>

<PopUp
  {open}
  onClose={() => {
    playerToKill.set(undefined);
  }}
>
  {#if $gameState && $gameState.player && $gameState.player.isKiller && ($gameState.gamedata.lastKill + $gameState.gamedata.killCoolDown < $unixTime || $gameState.player.extraKills > 0)}
    <div
      class="text-gray-200 bg-gray-700 p-3 rounded-lg border-2 border-gray-200 h-max absolute top-[50%] -translate-y-[50%] text-center m-3"
    >
      Biztos meg akarod ölni? <br /> Szerintem {$playerToKill?.name} nagyon szomorú
      lenne
      {#if $gameState.player?.extraKills > 0 && $gameState.gamedata.lastKill + $gameState.gamedata.killCoolDown > $unixTime}
        Ezzel viszont felhasználsz egy Extra ölést és úgy már
        {#if $gameState.player?.extraKills == 1}
          nem fog maradni
        {:else}
          csak {$gameState.player?.extraKills - 1} fog maradni
        {/if}
      {/if}

      <div class="*:rounded *:border-2 *:p-1 *:m-1">
        <button
          class="bg-red-500 text-black"
          onclick={(event) => {
            if ($playerToKill && $playerToKill.revealDeath == null) {
              kill($playerToKill, event);
              open.set(false);
              playerToKill.set(undefined);
            }
          }}
        >
          IGEN
        </button>
        <button
          class="bg-green-500 text-black"
          onclick={() => {
            open.set(false);
            playerToKill.set(undefined);
          }}
        >
          Nem, mert egy jó ember vagyok és meg akarom kímélni {$playerToKill?.name}
          életét
        </button>
      </div>
    </div>
  {:else if $gameState && $gameState.player && $gameState.player.isKiller && $gameState.gamedata.lastKill + $gameState.gamedata.killCoolDown > $unixTime && $gameState.player.extraKills <= 0}
    <div
      class="text-gray-200 bg-gray-700 p-3 rounded-lg border-2 border-gray-200 h-max absolute top-[50%] -translate-y-[50%] text-center m-3"
    >
  Nem tudsz ölni még kell egy kicsit várnod
  <br>
  {secondsToDate($gameState.gamedata.lastKill + $gameState.gamedata.killCoolDown - $unixTime).altSmallString}
    </div>
  {:else}
    Error
  {/if}
</PopUp>
