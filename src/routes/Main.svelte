<script>
	import { path } from 'elegua'
	import Layer from '../lib/Layer.svelte'
	import RivalsCard from '../components/RivalsCard.svelte'
	export let rivals
	export let initGamePlay
	export let player
	export let enemy
</script>

<Layer body>
	<header class="py-2">
		<h1 class="text-4xl">Battle Game</h1>
	</header>
	<article class="py-2 space-y-4">
		{#if rivals.getPlayer()}
			{#each [rivals.getPlayer()] as val}
				<RivalsCard short values={val} />
			{/each}
		{:else}
			<div class="flex justify-between items-center">
				<h3 class="text-2xl">Select your Fighter</h3>
				<button
					on:click={() => {
						$path = '/battle/player'
					}}
					class="btn">Show List</button>
			</div>
		{/if}
		{#if rivals.getEnemy()}
			{#each [rivals.getEnemy()] as val}
				<RivalsCard short values={val} />
			{/each}
		{:else}
			<div class="flex justify-between items-center">
				<h3 class="text-2xl">Find your Opponent</h3>
				<button
					on:click={() => {
						$path = '/battle/enemy'
					}}
					class="btn">Search</button>
			</div>
		{/if}
		{#if rivals.battle()}
			<div class="flex justify-between items-center">
				<h3 class="text-2xl">Enter Arena</h3>
				<div>
					<button
						on:click={() => {
							// initGamePlay()
							$path = '/battle/arena'
						}}
						class="btn">Fight</button>
					<!-- <button class="btn" on:click={initGamePlay}>Initial Battle</button> -->
				</div>
			</div>
		{/if}
	</article>
</Layer>
