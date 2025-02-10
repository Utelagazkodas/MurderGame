<script lang="ts">
  import { kill } from "$lib/api";
  import type { player } from "$lib/classes";
  import type { Writable } from "svelte/store";
  import PopUp from "./PopUp.svelte";
  

  let { open, playerToKill }: {open : Writable<boolean>, playerToKill: Writable<player | undefined> } = $props();

  if($playerToKill?.revealDeath != null){
    open.set(false)
  }
</script>

<PopUp open={open} onClose={()=>{
  playerToKill.set(undefined)
}}>
    <div class="text-gray-200 bg-gray-700 p-3 rounded-lg border-2 border-gray-200 h-max absolute top-[50%] -translate-y-[50%] text-center m-3">
        Biztos meg akarod ölni? <br /> Szerintem {$playerToKill?.name} nagyon szomorú
        lenne
      
        <div class="*:rounded *:border-2 *:p-1 *:m-1">
          <button
            class="bg-red-500 text-black"
            onclick={(event) => {
              if ($playerToKill && $playerToKill.revealDeath == null) {
                kill($playerToKill, event);
                open.set(false)
                playerToKill.set(undefined)
              }
            }}
          >
            IGEN
          </button>
          <button class="bg-green-500 text-black" onclick={() => {open.set(false); playerToKill.set(undefined)}}>
            Nem, mert egy jó ember vagyok és meg akarom kímélni {$playerToKill?.name}
            életét
          </button>
        </div>
      </div>
</PopUp>
