<script>
	import { clearLogs } from '../components/TextLogger.svelte'
	import { onDestroy } from 'svelte'
	import { path } from 'elegua'
	import { sleep } from '../lib/util'
	import ArenaCard from '../components/ArenaCard.svelte'
	import Layer from '../lib/Layer.svelte'
	export let demo
	export let enemy
	export let initGamePlay
	export let locked
	export let player
	export let rivals
	export let weaponAttack

	const check = () => {
		if (Object.keys(enemy).length > 0 && Object.keys(player).length > 0) {
			return true
		} else {
			return false
		}
	}
	const init = async () => {
		if (!rivals.battle()) $path = '/battle'
		initGamePlay()
		await sleep(500)
		return check()
	}

	onDestroy(() => {
		clearLogs()
	})

	let promise = init()
</script>

<Layer body>
	{#await promise}
		<div class="m-auto">... loading</div>
	{:then value}
		<section class="flex-1 flex flex-col gap-8">
			{#if value}
				{#each [enemy] as item}
					<ArenaCard short values={item} />
				{/each}

				{#each [player] as item}
					<ArenaCard short values={item} />
				{/each}
				<section class="h-14 relative overflow-hidden">
					<div
						class="absolute grid grid-cols-3 h-14 w-full transform transition-all duration-500 ease-in"
						class:translate-y-full={locked}
						class:opacity-25={locked}>
						{#each player.attacks as [attackName, successDice, damage, attackDescription, missDescription]}
							<!-- <div>{name} | {info}</div> -->
							<button
								on:click={() =>
									weaponAttack(
										attackName,
										successDice,
										damage,
										attackDescription,
										missDescription
									)}
								class="btn flex-1">{attackName}</button>
						{/each}
					</div>
				</section>
			{/if}
			<div>
				<button on:click={demo} class="btn">Demo</button>
			</div>
		</section>
	{/await}
</Layer>
