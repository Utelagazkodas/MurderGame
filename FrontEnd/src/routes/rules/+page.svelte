<script>
  import { gameState } from "$lib/api";
  import { secondsToDate } from "$lib/util";
  import { writable } from "svelte/store";

  let killerPopup = writable(false);
</script>

<div class=" text-white">
  <h1 class="text-3xl text-center p-5 font-medium tracking-tight">
    A Játék Szabályai
  </h1>

  <div class="text-lg text-justify px-4 lg:px-56">
    A játék időtartalma: {secondsToDate($gameState.gamedata.gameLength)
      .fullString}
    <br />
    <br />

    Ez alatt az idő alatt a gyilkosnak meg kell ölnie annyi embert hogy csak 1
    maradjon rajta kívül. Ha a gyilkost kiszavazzák vagy az idő lejár akkor a
    gyilkos veszít. A gyilkos ennek a
    <button
      class="text-blue-400"
      onclick={() => {
        killerPopup.set(true);
      }}>képnek</button
    >
    a felmutatásával tud ölni.
    <br />
    A gyilkosnak várnia kell {secondsToDate($gameState.gamedata.killCoolDown)
      .fullString}ot hogy újra ölhessen
    <br />
    Viszont kap {$gameState.gamedata.StartingExtraKills} extra gyilkosságot amit
    akármikor felhasználhat még akkor is ha amúgy nem tudna ölni.
    <br />
    <br />
    Minden halál ennyi idő után tűnik fel: {secondsToDate(
      $gameState.gamedata.revealDeath
    ).fullString}
    <br />
    Ez után lehet bejelenteni viszont onnantól mindenki más is látni fogja itt.
    <br />
    <br />

    <h2 class="text-2xl tracking-tight pb-2">Meetingek</h2>
    <div class="pl-3">
        Minden játékos hívhat a játék során {$gameState.gamedata.StartingMeetings} Meetinget. A meeting elején minden akkor halott játkos aki addig nem fedte fel hogy halott felfedi és ők már nem szavazhatnak.
        <br>
        Egy meeting {secondsToDate($gameState.gamedata.meetingLength).fullString}. Miután az idő letelt az a játékos akire a legtöbben szavaztak meghal. Ha holt verseny van a legtöbb szavazatért akkor senki nem hal meg.
    </div>
  </div>
</div>

<dialog
  class="overflow-hidden top-0 h-screen w-screen bg-gray-900/65 backdrop-blur text-right"
  open={$killerPopup}
>
  <!-- Relative container for the image and button -->
  <div class="relative h-screen w-auto mx-auto flex justify-center">
    <!-- Image -->
    <img
      src="/stone.jpeg"
      class="z-10 h-screen w-auto object-contain p-2 rounded-2xl"
      alt="stone"
    />

    <!-- Close Button -->
    <button
      aria-label="close"
      class="absolute top-2 right-2 z-20 p-0.5 rounded"
      onclick={() => {
        killerPopup.set(!$killerPopup);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-x text-gray-200"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  </div>
</dialog>
