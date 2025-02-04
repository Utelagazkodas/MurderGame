<script lang="ts">
  import { onMount } from 'svelte';
	import '../app.css';
  import { gameState, init } from '$lib/api';
	let { children } = $props();
	import { Shadow } from 'svelte-loading-spinners';

	onMount(init)
</script>

<div class="h-12 bg-gray-800 text-white text-xl flex place-content-evenly items-center border-b *:bg-slate-700 *:px-3 *:py-px *:rounded-lg">
	<a href="/">
		Játék
	</a>

	<a href="/rules">
		Szabályok
	</a>

</div>

<div class="h-[calc(100vh-3rem)] overflow-y-auto bg-gray-600">
{#if $gameState}
	{@render children()}
{:else}
	 <div class=" h-full flex place-content-center items-center">
		<Shadow duration="1.4s" size="50" color="#FFFFFF" unit="px"/>
	 </div>
{/if}
</div>

