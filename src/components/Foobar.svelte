<script>
	import CompSet from './CompSet.svelte'

	let panels = [
		[
			{
				content: 'Auswahl',
				name: 'Select Figther',
				href: '/battle/player',
				next: 1,
				parent: 0,
				style: 'win-panel',
				type: 'up'
			},
			{
				content: 'Search',
				name: 'Find Opponent',
				href: '/battle/enemy',
				next: 2,
				parent: 0,
				style: 'win-panel',
				type: 'up'
			},
			{
				content: 'Arena',
				name: 'Fight',
				href: '/battle/arena',
				next: 3,
				parent: 0,
				style: 'win-panel',
				type: 'up'
			},
			{
				content: 'Panel 3',
				name: 'Heal',
				href: '/battle/heal',
				next: 3,
				parent: 0,
				style: 'win-panel',
				type: 'up'
			}
		],
		[
			{
				content: 'Auswahl',
				name: 'Select Player',
				next: 1,
				parent: 0,
				style: 'win-panel',
				type: 'up'
			},
			{
				content: 'Panel 1',
				name: 'Find Enemy',
				next: 2,
				parent: 0,
				style: 'win-panel',
				type: 'up'
			},
			{
				content: 'Panel 2',
				name: 'Fight',
				next: 3,
				parent: 0,
				style: 'win-panel',
				type: 'up'
			},
			{
				content: 'Panel 3',
				name: 'Heal',
				next: 3,
				parent: 0,
				style: 'win-panel',
				type: 'up'
			}
		]
	]
	export let player = {}
	export let current = 0
	export let locked = false
	export let logText, weaponAttack
	const openMenu = (id = 0) => {
		current = id
	}


</script>

<footer class="win-foo">
	<nav class="win-panel" class:open={true}>
		<div class="btn-grid" class:opacity-50={current !== 0}>
			{#each panels[0] as { name, next, href }, i}
				{#if !href}
					<button class="btn" on:click={() => openMenu(next)}>{name}</button>
				{:else}
					<a class="btn" {href}>{name}</a>
				{/if}
			{/each}
		</div>
	</nav>
	<nav class="win-panel" class:open={current === 1}>
		<CompSet bind:current />
	</nav>
	<nav class="win-panel" class:open={current === 2}>
		<div class="btn-grid">
			{#each Array(3) as _, i}
				<button
					{current}
					class="btn btn-primary"
					on:click={() =>
						logText(
							`You Pressed the ${i + 1} Button off ${
								panels[0][current].content
							} Menu Level`,
							i == 1 ? 'error' : 'warning'
						)}>
					Panel {current}/{i + 1}
				</button>
			{/each}
			<button
				class="btn btn-default"
				on:click={() => {
					logText(`Menu Closed`)
					openMenu(0)
				}}>Close</button>
		</div>
	</nav>
	<nav class="win-panel" class:open={current == 3 && !locked}>
		<div class="btn-grid">
			{#if player.attacks}
				{#each player.attacks as [attackName, successDice, damage, attackDescription, missDescription]}
					<!-- attackName, successDice, damage, attackDescription, missDescription -->
					<button
						disabled={locked}
						on:click={() =>
							weaponAttack(
								attackDescription,
								successDice,
								damage,
								missDescription
							)}>{attackName}</button>
				{/each}
			{/if}
			<button
				class="btn btn-default"
				on:click={() => {
					logText(`Menu Closed`)
					openMenu(0)
				}}>Close</button>
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
