<script lang="ts">
  import { onMount } from "svelte";
  import {
    getIP,
    IPADRESS,
    killerPopup,
    otherUsers,
    thisUser,
    type user,
  } from "../lib/store.js";
  import { setCookie, getCookie, removeCookie } from "typescript-cookie";

  let id = $state("");
  let idSet = $state(false);
  let killUser = $state<user | undefined>(undefined);

  let refreshIntervalId: number;
  onMount(async () => {
    await getIP();

    let t = getCookie("id");

    refresh();

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

    let resp;

    if ($thisUser && $thisUser.id != undefined) {
      resp = await fetch(`${IPADRESS}players/${$thisUser.id}`);
    } else {
      resp = await fetch(IPADRESS + "players");
    }

    if (resp.ok) {
      let respText = await resp.text();

      let t: user[] = JSON.parse(respText);

      if (t) {
        for (let i = 0; i < t.length; i++) {
          if ($thisUser?.publicID == t[i].publicID) {
            $thisUser.alive = t[i].alive;
            t.splice(i, 1);
          }
        }

        otherUsers.set(t);
      }
    }
  };

  let kill = async (event: Event, userToKill: user) => {
    event.preventDefault();

    if (killUser == undefined || killUser.publicID != userToKill.publicID) {
      killUser = userToKill;
    } else {
      let resp = await fetch(IPADRESS + "kill/" + userToKill.publicID, {
        method: "POST",
        body: $thisUser?.id,
      });

      if (!resp.ok) {
        console.error(`error killing ${userToKill.name}`);
      }

      refresh(event);
    }
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
    clearInterval(refreshIntervalId);

    refresh();
  };
</script>

<div
  class="max-w-screen h-screen bg-gray-600 p-5"
>

    {#if !idSet}
      <form onsubmit={setId} class="text-gray-700">
        <input
          type="text"
          bind:value={id}
          maxlength={16}
          placeholder="írd ide a kódot"
          class="rounded-xl"
        />
      </form>
    {/if}

    {#if $thisUser}
      <div class="w-full flex justify-between text-lg">
        Szia {$thisUser.name}

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
      </div>

      <br />

      {#if !$thisUser.isKiller}
        <span class="text-green-300"> Nem te vagy a gyilkos </span>
        {#if !$thisUser.alive}
          viszont
          <span class="font-bold text-red-700">halott vagy </span> :(
        {/if}
      {:else}
        <span class="text-red-400"> TE VAGY A GYILKOS </span> screenshotold le
        ->
        <button
          class="text-blue-300"
          onclick={() => {
            killerPopup.set(!$killerPopup);
          }}>kép</button
        >
        <br />
        ezzel tudsz majd ölni, és egy pár órával utána itt öld meg a piros X-el amikor
        bejelenti
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

        <dialog
          open={killUser != undefined && $killerPopup == false}
          class="top-0 bg-transparent"
        >
          <div
            class="w-screen top-0 h-screen backdrop-blur bg-gray-900/65 flex items-center justify-center"
          >
            <div
              class="text-gray-200 bg-gray-700 p-3 rounded-lg border-2 border-gray-200"
            >
              Biztos meg akarod ölni? <br /> Szerintem {killUser?.name} nagyon szomorú
              lenne

              <div class="*:rounded *:border-2 *:p-1">
                <button
                  class="bg-red-500"
                  onclick={(event) => {
                    if (killUser) {
                      kill(event, killUser);
                      killUser = undefined;
                    }
                  }}
                >
                  IGEN
                </button>
                <button
                  class="bg-green-500"
                  onclick={() => {
                    killUser = undefined;
                  }}
                >
                  Nem, mert egy jó ember vagyok és meg akarom kímélni {killUser?.name}
                  életét
                </button>
              </div>
            </div>
          </div>
        </dialog>
      {/if}

      {#if $otherUsers}
        <!-- Other users -->
        <div
          class="flex flex-col items-center text-lg *:w-full *:m-2 text-center *:rounded-full *:border-2 *:p-0.5"
        >
          {#each $otherUsers as user, i}
            {#if user.alive}
              <!-- alive other user -->
              <div class="bg-green-500 flex justify-center">
                <span class="mr-2">{user.name} (alias {user.nickname})</span>
                {#if $thisUser.isKiller}
                  <button
                    onclick={(event) => {
                      if (killUser == undefined) {
                        kill(event, user);
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
              <!-- dead other user -->
              <div class="bg-red-500">
                {user.name} (alias {user.nickname})
              </div>
            {/if}
          {/each}
        </div>
        <!-- /other users -->
      {/if}
    {:else if $otherUsers}
      <div
        class="flex flex-col items-center text-lg *:w-full *:m-2 text-center *:rounded-full *:border-2 *:p-0.5"
      >
        {#each $otherUsers as user, i}
          {#if user.alive}
            <!-- alive other user -->
            <div class="bg-green-500 flex justify-center">
              <span class="mr-2">{user.nickname}</span>
            </div>
          {:else}
            <!-- dead other user -->
            <div class="bg-red-500">
              {user.nickname}
            </div>
          {/if}
        {/each}
      </div>
    {/if}
  
</div>
