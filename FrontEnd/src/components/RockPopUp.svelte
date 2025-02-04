<script lang="ts">
  import type { Writable } from "svelte/store";
  import PopUp from "./PopUp.svelte";

    let {open} : {open : Writable<boolean>} = $props()
</script>

<PopUp open={open}>
    <img
    src="/stone.jpeg"
    class="z-10 h-screen w-auto object-contain p-2 rounded-2xl select-none"
    alt="stone"
  />
</PopUp>