<script>
  import { gameState } from "$lib/api";
  import { secondsToDate } from "$lib/util";

</script>

{#if $gameState}
    1 meeting = {secondsToDate($gameState.gamedata.meetingLength)}
{/if}
