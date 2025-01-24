<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="h-10">
	<a href="/rules">
		Szabályok
	</a>

</div>

{@render children()}
