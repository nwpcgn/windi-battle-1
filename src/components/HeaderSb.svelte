<script>
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()
	function onClick(e) {
		dispatch('click', {
			el: e.currentTarget
		})
	}
	export let rivals
</script>

<header class="sb-top">
	<button on:click={() => dispatch("clear")}>Terminal</button>
	<div class={rivals.getPlayer() ? 'ok' : 'error'}>Player</div>
	<div class={rivals.getEnemy() ? 'ok' : 'error'}>Enemy</div>
</header>

<style>
	.sb-top {
		grid-area: sb-top;
		display: flex;
		border-bottom: var(--bf-border);
		border-left: var(--bf-border);
		overflow: hidden;
	}

	button,
	div {
		display: flex;
		align-items: center;
		padding: 0.5rem;
	}
	button {
		flex: 1;
	}
	div.ok {
		@apply text-blue-100 bg-blue-600;
	}
	div.error {
		@apply text-red-100 bg-red-600;
	}
</style>
