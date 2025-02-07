<script lang="ts">
  import { kill } from "$lib/api";
  import type { player } from "$lib/classes";
  import type { Writable } from "svelte/store";
  import PopUp from "./PopUp.svelte";
  

  let { open, playerToKill }: {open : Writable<boolean>, playerToKill?: player } = $props();
</script>

<PopUp open={open}>
    <div class="text-gray-200 bg-gray-700 p-3 rounded-lg border-2 border-gray-200">
        Biztos meg akarod ölni? <br /> Szerintem {playerToKill?.name} nagyon szomorú
        lenne
      
        <div class="*:rounded *:border-2 *:p-1">
          <button
            class="bg-red-500"
            onclick={(event) => {
              if (playerToKill) {
                kill(playerToKill, event);
              }
            }}
          >
            IGEN
          </button>
          <button class="bg-green-500" onclick={() => {}}>
            Nem, mert egy jó ember vagyok és meg akarom kímélni {playerToKill?.name}
            életét
          </button>
        </div>
      </div>
</PopUp>
