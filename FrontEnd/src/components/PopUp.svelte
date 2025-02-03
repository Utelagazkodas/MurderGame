<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Writable } from "svelte/store";

    let {open, children} : {open : Writable<boolean>, children : Snippet<[]>} = $props()
</script>



<dialog
  class="overflow-hidden top-0 h-screen w-screen bg-gray-900/65 backdrop-blur text-right"
  open={$open}

>
  <!-- Relative container for the image and button -->
  <div class="relative h-screen w-auto mx-auto flex justify-center">
    <!-- Image -->
    {@render children()}

    <!-- Close Button -->
    <button
      aria-label="close"
      class="absolute top-2 right-2 z-20 p-0.5 rounded-2xl bg-slate-900/70 backdrop-blur"
      onclick={() => {
        open.set(false)
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