<script lang="ts">
  import { onMount } from 'svelte';
	import '../app.css';
  import { init } from '$lib/api';
	let { children } = $props();

	onMount(init)
</script>

<div class="h-12 bg-gray-800 text-white text-xl flex place-content-evenly items-center border-b *:bg-slate-700 *:px-3 *:py-px *:border *:rounded-full">
	<a href="/">
		Játék
	</a>

	<a href="/rules">
		Szabályok
	</a>

</div>

{@render children()}
