<script>
	import { onDestroy, onMount } from 'svelte'
	import { path } from 'elegua'
	import { quintIn, quintOut } from 'svelte/easing'
	import { scale } from 'svelte/transition'
	import { sleep } from '../lib/util'
	import { TabControl, TabControlItem } from 'renderless-svelte'
	import { textLog, clearLogs } from './TextLogger.svelte'
	import Layer from '../lib/Layer.svelte'
	import RivalsCard from './RivalsCard.svelte'
	export let rivals
	export let slug = 'enemy'
	let selected = false

	onMount(() => {
		clearLogs()
		sleep(500)
			.then(() => {
				textLog({
					text: `${slug === 'enemy' ? 'Find_Opponent' : 'Select_Figther'}`,
					type: 'terminal'
				})
			})
			.then(() => sleep(1000))
			.then(() => {
				textLog({
					text: `${
						slug === 'enemy' ? 'Find your Opponent' : 'Select your Figther'
					}`,
					type: 'info'
				})
			})
	})

	onDestroy(() => {
		clearLogs()
	})
</script>

<Layer body>
	<TabControl>
		<header class="py-2 space-y-2" slot="tabs" let:tabs>
			<h1 class="text-4xl">
				Select Your {slug === 'enemy' ? 'Opponent' : 'Figther'}
			</h1>
			<nav class="flex border divide-x">
				{#each tabs as { active, disabled, payload, select }, i}
					<button
						class="tabs-btn"
						class:active
						on:click={select}
						on:mouseup={() => (selected = false)}
						{disabled}>{payload}</button>
				{/each}
				<span class="flex-grow" />
			</nav>
		</header>
		<article class="py-2 flex-1 relative">
			{#if rivals.list()[slug]}
				{#each rivals.list()[slug] as val, i}
					<TabControlItem id="tab-{i}" payload={val.name} active={i == 0}>
						<div
							class="absolute left-0 top-0 w-full"
							out:scale={{
								duration: 400,
								opacity: 0,
								start: 0.5,
								easing: quintOut
							}}
							in:scale={{
								duration: 400,
								delay: 100,
								opacity: 0,
								start: 0.5,
								easing: quintIn
							}}>
							<RivalsCard values={val} />
							<footer class="mt-2 flex gap-2">
								<button
									on:click={() => {
										console.log('You select', rivals.list()[slug][i])
										textLog({
											text: `Press Confirm to save`,
											type: 'terminal'
										})
										selected = true
									}}
									class="btn">Select</button>
								{#if selected}
									<button
										on:click={() => {
											if (slug === 'enemy') {
												rivals.selEnemy(i)
											} else {
												rivals.selPlayer(i)
											}
											$path = '/battle'
										}}
										class="btn">Confirm</button>
								{/if}
							</footer>
						</div>
					</TabControlItem>
				{/each}
			{/if}
		</article>
	</TabControl>
</Layer>

<style>
	.tabs-btn {
		@apply flex items-center justify-center py-2 px-4 transition-colors duration-300 ease truncate;
		background-color: var(--background-color);
		color: var(--font-color);
	}
	.tabs-btn.active {
		background-color: var(--sky-500);
		color: var(--sky-50);
	}
</style>
