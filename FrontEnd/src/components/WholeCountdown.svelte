<script lang="ts">
  import { unixTime } from "$lib/api";
  import { secondsToDate } from "$lib/util";
  import CountDownSegment from "./CountDownSegment.svelte";

    const dates : {name : string, value : number}[] = [{name : "nap", value:86400}, {name: "óra", value: 3600}, {name : "perc", value:60}, {name: "másodperc", value:1}]

    let {countTo, digits} : {countTo: number, digits : number} = $props()

    let date = secondsToDate(countTo - $unixTime)
</script>




