<script lang="ts">
  import {
    callMeeting,
    gameState,
    kill,
    logout,
    setId,
    unixTime,
  } from "$lib/api.js";
  import { derived, writable, type Writable } from "svelte/store";
  import type { player } from "$lib/classes.js";
  import KillPopUp from "../components/KillPopUp.svelte";
  import OtherPlayer from "../components/OtherPlayer.svelte";
  import { isMeeting, secondsToDate } from "$lib/util";
  import CountDownSegment from "../components/CountDownSegment.svelte";

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
</script>

<div class="max-w-screen p-3 lg:px-96 lg:py-10">
  {#if !$gameState.player}
    <div class="flex place-content-evenly items-center flex-wrap *:my-2">
      <form
        onsubmit={async (event) => {
          if(!(await setId(id, event))){
            resetIdTextInput()
          }
        }}
        class="text-gray-700 flex place-content-center h-10"
      >
        <input
          type="text"
          bind:value={id}
          maxlength={16}
          placeholder="írd ide a kódot"
          class="rounded-xl w-60"
        />
        <button type="submit" class="bg-gray-200 ml-4 p-1 rounded-md"
          >Belépés</button
        >
      </form>

      <div
        class="h-full border-gray-800 border-2 rounded-lg bg-gray-700 py-3 px-6 text-lg text-white"
      >
        Hátralévő idő:
        <br />{secondsToDate(
          $gameState.gamedata.gameStart +
            $gameState.gamedata.gameLength -
            $unixTime
        ).smallString}
      </div>
    </div>
  {/if}

  {#if $gameState.player}
    <div class="w-full flex justify-between text-white items-center mt-2">
      <div
        class="bg-gray-700 py-3 px-6 border-gray-800 border-2 rounded-lg relative"
      >
        <div class="{$deadStrikeThrough} text-4xl tracking-wider">
          {$gameState.player.name}
        </div>

        <div
          class="text-lg tracking-normal text-{$color} {$deadStrikeThrough} pl-14 -mt-1"
        >
          {#if $gameState.player.isKiller}
            <div title="Te vagy a gyilkos!">Gyilkos</div>
          {:else}
            <div title="Ártatlan vagy">Ártatlan</div>

            {#if $gameState.player.revealDeath != null && $gameState.player.revealDeath - $unixTime > 0}
            <div class="text-red-500 no-underline" >
              {secondsToDate($gameState.player.revealDeath-$unixTime).altSmallString}
            </div>
            {/if}
          {/if}
        </div>

        <button
          onclick={(event) => {
            logout(event);
          }}
          class="p-2 border border-gray-800 bg-gray-800 rounded-full aspect-square h-max absolute -right-4 top-3"
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

      <div
        class="h-full border-gray-800 border-2 rounded-lg bg-gray-700 py-3 px-6 text-lg"
      >
        Hátralévő idő:
        <br />{secondsToDate(
          $gameState.gamedata.gameStart +
            $gameState.gamedata.gameLength -
            $unixTime
        ).smallString}
      </div>
    </div>

    <br />

    <!-- MEETING PANEL -->
    <div
      class="w-full flex place-content-center h-40 bg-gray-700 rounded-xl border-gray-950 p-4 *:mx-1 lg:py-6 lg:px-4 lg:h-52"
    >
      {#if isMeeting($gameState.gamedata)}
        <div class="flex-1 text-white flex place-content-evenly">
          <CountDownSegment
            number={secondsToDate(
              $gameState.gamedata.meetingStart +
                $gameState.gamedata.meetingLength -
                $unixTime
            ).mins}
            text="Perc"
          />
          <CountDownSegment
            number={secondsToDate(
               $gameState.gamedata.meetingStart +
                $gameState.gamedata.meetingLength -
                $unixTime
            ).secs}
            text="Másodperc"
          />
        </div>
      {:else}
        <div class="flex-1 text-white flex place-content-evenly relative">
          <CountDownSegment number={0} text="Perc" />
          <CountDownSegment number={0} text="Másodperc" />
          <div
            class="absolute w-full backdrop-blur-sm h-[calc(100%+16px)] rounded-2xl -top-2 bg-gray-600/50 flex items-center place-content-center text-3xl tracking-tighter text-center"
          >
            Nincs Meeting
          </div>
        </div>
      {/if}

      <div
        class="flex-1 flex place-content-center items-center relative text-center"
      >
        {#if $gameState.player.canCallMeeting <= 0 || $gameState.player.revealDeath != null || $gameState.gamedata.gameWon != 0}
          <div
            class="aspect-square min-h-full bg-red-500 rounded-full flex items-center place-content-center text-xl z-10 border-l-8 border-b-8 border-red-900"
          >
            Meeting
          </div>
          <div
            class="absolute w-full backdrop-blur-sm h-[calc(100%+16px)] rounded-2xl -top-2 bg-gray-600/50 flex items-center place-content-center text-xl lg:text-3xl tracking-tighter z-10 text-white"
          >
            Nem tudsz meetinget hívni
          </div>
        {:else if isMeeting($gameState.gamedata)}
          <div
            class="aspect-square min-h-full bg-red-500 rounded-full flex items-center place-content-center text-xl z-10 border-l-8 border-b-8 border-red-900"
          >
            Meeting
          </div>
          <div
            class="absolute w-full backdrop-blur-sm h-[calc(100%+16px)] rounded-2xl -top-2 bg-gray-600/50 flex items-center place-content-center text-3xl tracking-tighter z-10 text-white"
          >
            Meeting van
          </div>
        {:else}
          <button
            class="aspect-square min-h-full bg-red-500 rounded-full flex items-center place-content-center text-xl z-10 border-l-8 border-b-8 border-red-900"
            onclick={callMeeting}
            >Meeting
          </button>
        {/if}
      </div>
    </div>
  {/if}

  <hr class="my-3 mx-10" />

  {#if $gameState.players}
    <div class="flex flex-col items-center text-lg text-center">
      {#each $gameState.players as player, i}
        <OtherPlayer {killUser} killPopUp={killerPopup} thisPlayer={player} />
      {/each}
    </div>
  {/if}
</div>

<KillPopUp open={killerPopup} playerToKill={killUser} />
