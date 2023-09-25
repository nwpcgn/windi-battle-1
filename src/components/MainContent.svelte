<script>
	import { quintInOut } from 'svelte/easing'
	import { fade } from 'svelte/transition'

	export let trigger = false
</script>

{#key trigger}
	<article
		class="win-cont"
		transition:fade={{ duration: 600, easing: quintInOut, delay: 500}}>
		<slot><!-- optional fallback --></slot>
	</article>
{/key}

<style>
	.win-cont {
		grid-area: win-cont;
		position: relative;
		overflow-x: hidden;
		overflow-y: scroll;
	}
</style>
