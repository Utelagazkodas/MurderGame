<script lang="ts">
  import { kill } from "$lib/api";
  import type { player } from "$lib/classes";

  let { playerToKill }: { playerToKill: player } = $props();
</script>

<div class="text-gray-200 bg-gray-700 p-3 rounded-lg border-2 border-gray-200">
  Biztos meg akarod ölni? <br /> Szerintem {"akit meg akar ölni a neve"} nagyon szomorú
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
