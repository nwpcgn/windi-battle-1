<script>
	import { createEventDispatcher } from 'svelte'
	import { slide } from 'svelte/transition'

	const dispatch = createEventDispatcher()

	export let type = 'error'
	export let dismissible = true
</script>

<article class={type} in:slide out:slide>
	<div class="text">
		<slot />
	</div>

	{#if dismissible}
		<button class="close" on:click={() => dispatch('dismiss')}> x </button>
	{/if}
</article>

<style>
	article {
		color: white;
		padding: 0.25rem 0.5rem;
		display: flex;
		align-items: start;
		justify-content: space-between;
		margin: 0;
		width: 100%;
	}
	.error {
		color: #e11d48;
	}
	.success {
		color: #10b981;
	}
	.info {
		color: #0ea5e9;
	}
	.warning {
		color: #fbbf24;
	}
	.text {
		font-family: 'Courier New', Courier, monospace;
		font-size: 0.9rem;
		line-height: 1.2;
		margin-bottom: 0.4rem;
		color: var(---sky-400, #38b5ed);
	}

	button {
		background: transparent;
		border: 0 none;
		padding: 0;
		margin: 0 0 0 auto;
		line-height: 1;
		font-size: 0.9rem;
	}
</style>
