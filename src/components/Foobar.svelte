<script>
	import { path } from 'elegua'
	import { clickOutside } from '../lib/util'
	const panels = [
		{
			name: 'Select Figther',
			href: '/battle/player'
		},
		{
			name: 'Find Opponent',
			href: '/battle/enemy'
		},
		{
			name: 'Fight',
			href: '/battle/arena'
		},
		{
			name: 'Heal',
			href: '/battle/heal'
		}
	]

	export let player = {}
	export let locked = false
	export let weaponAttack
	let accept = false
	const reset = () => {
		accept = false
	}
</script>

<footer class="win-foo">
	<nav class="win-panel" class:open={$path === '/battle/arena' && !locked}>
		<div class="btn-grid">
			{#if player && player.attacks}
				{#each player.attacks as [attackName, successDice, damage, attackDescription, missDescription]}
					<!-- attackName, successDice, damage, attackDescription, missDescription -->
					<button
						class="btn"
						disabled={locked}
						on:click={() =>
							weaponAttack(
								attackName,
								successDice,
								damage,
								attackDescription,
								missDescription
							)}>{attackName}</button>
				{/each}
				{#if accept}
					<button
						on:click={() => {
							reset()
							$path = '/battle'
						}}
						use:clickOutside
						on:click_outside={reset}
						class="btn bg-red-600 text-red-100">Leave Battle ?</button>
				{:else}
					<button
						on:click={() => (accept = true)}
						class="btn bg-gray-500 text-gray-100">Close</button>
				{/if}
			{/if}
		</div>
	</nav>
	<nav
		class="win-panel flex items-center justify-center"
		class:open={$path === '/battle/arena' && locked}>
		<div>
			<div>... attack in progress</div>
		</div>
	</nav>
	<nav class="win-panel" class:open={$path !== '/battle/arena'}>
		<div class="btn-grid">
			{#each panels as { name, next, href }, i}
				{#if !href}
					<button class="btn">{name}</button>
				{:else}
					<a class="btn" {href}>{name}</a>
				{/if}
			{/each}
		</div>
	</nav>
</footer>

<style>
	.win-foo {
		grid-area: win-foo;
		display: flex;
		position: relative;
		border-top: var(--bf-border);
		flex-direction: column;
	}

	.win-panel {
		position: absolute;
		top: 0;
		left: 0;
		z-index: auto;
		width: 100%;
		height: 100%;
		background-color: var(--background-color);
		transform: translateY(100%);
		transition: transform 600ms ease-in-out;
	}

	.win-panel.open {
		transform: translateY(0);
	}
</style>
