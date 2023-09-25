<script>
	import { createEventDispatcher, onMount } from 'svelte'

	export let open = false
	export let component = null
	export let text = null
	export let html = null
	export let action = null

	const dispatch = createEventDispatcher()

	const handleClose = () => {
		open = false
	}
	const handleAction = () => {
		dispatch('action')
		handleClose()
	}
	onMount(() => {
		setTimeout(() => {
			open = true
		}, 20)
	})
	$: dispatch(open ? 'open' : 'close')
</script>

<section class="popup" class:is-hidden={!open}>
	<article>
		{#if component}
			<svelte:component this={component} />
		{/if}
		{#if text}
			<span>{text}</span>
		{/if}
		{#if html}
			{@html html}
		{/if}
	</article>
	<footer class="text-center">
		{#if action}
			<button class="font-bold px-8 py-4 shadow text-xl" on:click={handleAction}
				>Ok</button>
		{/if}
		<button class="font-bold px-8 py-4 shadow text-xl" on:click={handleClose}
			>Close</button>
	</footer>
</section>

<style>
	.popup {
		width: 320px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		flex-direction: column;
		justify-items: space-around;
		padding: 1.5rem 1rem;
		background-color: #ffffff;
		border-radius: 0.85rem;
		border: 1px solid #edebeb;
		gap: 2rem;
		max-width: 100%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 40;
		transition: all 250ms ease;
		text-align: center;
	}

	.popup article {
		padding-top: 2rem;
		padding-bottom: 2rem;
		text-align: center;
	}

	.popup.is-hidden {
		opacity: 0.5;
		-webkit-transform: scale(0, 0);
		-ms-transform: scale(0, 0);
		transform: scale(0, 0);
	}

	.popup {
		--tw-shadow-color: 0, 0, 0;
		--tw-shadow: 0 25px 50px -12px rgba(var(--tw-shadow-color), 0.25);
		-webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
			var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
			var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
	}
</style>
