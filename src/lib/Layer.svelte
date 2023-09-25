<script>
	import { fly, fade } from 'svelte/transition'
	export let body = false
	export let stil = ''
</script>

<section
	out:fade={{ duration: 400 }}
	in:fly={{ duration: 400, y: 50, delay: 350 }}
	class="layer {stil}">
	{#if body}
		<div class="flex-1 p-4 w-full max-w-2xl mx-auto flex flex-col">
			<slot><!-- optional fallback --></slot>
		</div>
	{:else}
		<slot><!-- optional fallback --></slot>
	{/if}
</section>
