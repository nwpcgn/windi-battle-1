<script>
	export let values
	export let short = false
	function percentage(partialValue, totalValue) {
		return (100 * partialValue) / totalValue
	}

	$: percent = percentage(values.health, values.maxHealth)

	$: death = percent < 1
</script>

<div class="relative overflow-x-auto shadow-md rounded-lg">
	<table
		class="table-fixed w-full text-lefttransition-all duration-200 {death
			? 'bg-red-500 text-white animate-pulse'
			: 'bg-white text-gray-500'}">
		<thead class="text-gray-200 uppercase bg-gray-500">
			<tr>
				<td class="py-1 border font-bold px-4" class:border-red-600={death}
					>{values.pointsId === 'player' ? 'Player' : 'Enemy'}</td>
				<td
					class="py-1 border font-bold px-4"
					class:border-red-600={death}
					contenteditable="true">Wert</td>
			</tr>
		</thead>
		<tbody>
			<tr class="py-2">
				<td class="py-2 border px-4" class:border-red-600={death}
					>{values.name}</td>
				<td class="py-2 border px-4" class:border-red-600={death}
					>{values.health} / {values.maxHealth}</td>
			</tr>
			<tr class="py-2">
				<td class="py-2 border px-4" class:border-red-600={death} colspan="2">
					<div class="w-full rounded-full bg-gray-100 overflow-hidden h-2 flex">
						<section
							style="width: {percent}%;"
							class="rounded-full {percent > 40
								? 'bg-blue-500'
								: percent < 20
								? 'bg-red-500'
								: 'bg-amber-500'}  transition-all duration-500 ease" />
					</div>
				</td>
			</tr>
			{#if !short}
				<tr class="py-2">
					<td class="py-2 border px-4">Hard Attack Damage</td>
					<td class="py-2 border px-4">{values.hardAttackDamage}</td>
				</tr>
				<tr class="py-2">
					<td class="py-2 border px-4">Hard Attack Dice</td>
					<td class="py-2 border px-4">{values.hardAttackDice}</td>
				</tr>
				<tr class="py-2">
					<td class="py-2 border px-4">Weak Attack Damage</td>
					<td class="py-2 border px-4">{values.weakAttackDamage}</td>
				</tr>
				<tr class="py-2">
					<td class="py-2 border px-4">Weak Attack Dice</td>
					<td class="py-2 border px-4">{values.weakAttackDice}</td>
				</tr>
			{/if}
		</tbody>
	</table>
</div>
