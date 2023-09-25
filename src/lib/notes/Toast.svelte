<script>
	import { createEventDispatcher } from 'svelte'
	import { fade, slide } from 'svelte/transition'
	const successIcon = `<svg class="icon icon-success"><use xlink:href="#icon-success"></use></svg>`
	const errorIcon = `<svg class="icon icon-error"><use xlink:href="#icon-error"></use></svg>`
	const infoIcon = `<svg class="icon icon-info"><use xlink:href="#icon-info"></use></svg>`
	const closeIcon = `<svg class="icon icon-close"><use xlink:href="#icon-close"></use></svg>`

	const dispatch = createEventDispatcher()

	export let type = 'error'
	export let dismissible = true
</script>

<article class={type} role="alert" in:slide out:fade>
	<span class="svg">
		{#if type === 'success'}
			{@html successIcon}
		{:else if type === 'error'}
			{@html errorIcon}
		{:else}
			{@html infoIcon}
		{/if}
	</span>
	<div class="text">
		<slot />
	</div>

	{#if dismissible}
		<button class="close" on:click={() => dispatch('dismiss')}>
			{@html closeIcon}
		</button>
	{/if}
</article>



<style>
	article {
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 0.2rem;
		display: flex;
		align-items: center;
		margin: 0 0 0 auto;
		width: 100%;
		max-width: 480px;
	}
	.error {
		background: #e11d48;
	}
	.success {
		background: #10b981;
	}
	.info {
		background: #0ea5e9;
	}
	.warning {
		background-color: #fbbf24;
	}
	.text {
		margin-left: 1rem;
	}

	.svg {
		font-size: 1.3rem;
		display: inline-block;
		width: 1em;
		height: 1em;
		stroke-width: 0;
		stroke: currentColor;
		fill: currentColor;
	}

	button {
		color: white;
		background: transparent;
		border: 0 none;
		padding: 0;
		margin: 0 0 0 auto;
		line-height: 1;
		font-size: 1.3rem;
	}
</style>
