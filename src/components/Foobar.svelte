<script>
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
	export let current = 0
	export let locked = false
	export let weaponAttack
	const openMenu = (id = 0) => {
		current = id
	}
</script>

<footer class="win-foo">
	<nav class="win-panel" class:open={true}>
		<div class="btn-grid">
			{#each panels as { name, next, href }, i}
				{#if !href}
					<button class="btn" on:click={() => openMenu(next)}>{name}</button>
				{:else}
					<a class="btn" {href}>{name}</a>
				{/if}
			{/each}
		</div>
	</nav>
	<nav class="win-panel" class:open={false}>
		<div class="btn-grid">
			{#if player && player.attacks}
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
			<button class="btn btn-default">Close</button>
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
