<script>
	export let values
	export let short = false
</script>

<div class="relative overflow-x-auto shadow-md rounded-lg">
	<table class="table-fixed w-full text-left">
		<thead class="text-gray-200 uppercase bg-gray-500">
			<tr>
				<td class="py-1 border font-bold px-4"
					>{values.pointsId === 'player' ? 'Player' : 'Enemy'}</td>
				<td class="py-1 border font-bold px-4" contenteditable="true">Wert</td>
			</tr>
		</thead>
		<tbody class="bg-white text-gray-500">
			<tr class="py-2">
				<td class="py-2 border px-4">Name</td>
				<td class="py-2 border px-4">{values.name}</td>
			</tr>
			<tr class="py-2">
				<td class="py-2 border px-4">Health</td>
				<td class="py-2 border px-4">{values.health}</td>
			</tr>
			<tr class="py-2">
				<td class="py-2 border px-4">Max Health</td>
				<td class="py-2 border px-4">{values.maxHealth}</td>
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
