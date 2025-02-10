<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Writable } from "svelte/store";

  let {
    open,
    children,
    closeButton = true,
    outclickable = false,
    onClose = ()=>{}
  }: {
    open: Writable<boolean>;
    children: Snippet<[]>;
    closeButton?: boolean;
    outclickable? : boolean;
    onClose? : Function
  } = $props();
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<dialog
  class="overflow-hidden top-0 h-screen w-screen bg-gray-900/65 backdrop-blur text-right z-20"
  open={$open}
  onclick={(_event)=>{
    if(outclickable){
      open.set(false)
      onClose()
    }
  }}
>
  <!-- Relative container for the image and button -->
  <div class="relative h-screen w-auto mx-auto flex justify-center">
    <!-- Image -->
    {@render children()}

    <!-- Close Button -->
    {#if closeButton}
      <button
        aria-label="close"
        class="absolute top-2 right-2 z-20 p-0.5 rounded-2xl bg-slate-900/70 backdrop-blur"
        onclick={() => {
          open.set(false);
          onClose()
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
    {/if}
  </div>
</dialog>
