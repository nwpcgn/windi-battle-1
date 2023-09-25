<script>
	import { onMount } from 'svelte'

	import Layer from '../lib/Layer.svelte'
	import { sleep } from '../lib/util'
	export let nav = [
		{
			href: '/',
			name: 'Start'
		}
	]

	let turn = 1
	let roundCount = `⌛ Turn`
	let locked = false
	let gameOver = false

	function throwDice(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min)) + min
	}
	function percentage(partialValue, totalValue) {
		return (100 * partialValue) / totalValue
	}

	const logText = (text) => {
		console.log('XXX - logText(text)', text)
	}
	const healthBarUpdate = (
		playerHealth,
		playerHealthMax,
		playerPoints,
		playerHealthBar
	) => {
		console.log(
			'XXX - healthBarUpdate(playerHealth, playerHealthMax, playerPoints, playerHealthBar)',
			playerHealth,
			playerHealthMax,
			playerPoints,
			playerHealthBar
		)
	}

	const damageTaken = async (animationClass, targetId) => {
		await sleep(500)
		console.log(
			'XXX - damageTaken(animationClass, targetId)',
			animationClass,
			targetId
		)
	}

	function lockActionButtons(condition) {
		locked = condition
		console.log('YYY - lockActionButtons(condition)', condition)
	}

	async function weaponAttack(
		attackDescription,
		successDice,
		damage,
		missDescription
	) {
		// console.log('weaponAttack(successDice, damage)', successDice, damage)

		lockActionButtons(true)
		turn = turn + 1
		// turnCounterUpdate(turn)
		let x = throwDice(1, 10)
		let _del = throwDice(100, 900)
		await sleep(600 + _del)

		if (enemy.health > 0) {
			logText(attackDescription, 'info')
			await sleep(1000)
			damageTaken('swing', 'playerBox')
			if (x > successDice) {
				let nh = enemy.health - damage
				enemy.health = nh < 0 ? 0 : nh
				damageTaken('damages', 'enemyBox')
				healthBarUpdate(
					enemy.health,
					enemy.maxHealth,
					enemy.pointsId,
					enemy.healthbarId
				)
				let damagedeal =
					'⚔️ You successfully deal ' +
					damage +
					' points of damage to the opponent'
				logText(damagedeal, 'success')
			} else {
				logText(missDescription, 'danger')
				damageTaken('enemymiss', 'enemyBox')
			}
			await sleep(1000)
			if (enemy.health > 0) {
				enemy.attack()
			} else {
				logText('☠️ Creatura is dead', 'danger')
				// lockActionButtons(false)
				// enemy.health = 0
				gameOver = true
			}
			await sleep(2000)
			// turnCounterUpdate(turn)
			lockActionButtons(false)
		} else {
			logText('☠️ Creatura is dead', 'danger')
			// lockActionButtons(false)
			// enemy.health = 0
			gameOver = true
		}

		await sleep(1000)
		lockActionButtons(false)
	}

	function opponent(
		name,
		health,
		maxHealth,
		pointsId,
		healthbarId,
		hardAttackDamage,
		hardAttackDice,
		weakAttackDamage,
		weakAttackDice
	) {
		this.name = name
		this.health = health
		this.maxHealth = maxHealth
		this.pointsId = pointsId
		this.healthbarId = healthbarId
		this.attack = async function () {
			let x = throwDice(1, 10)
			let attackMessage = name + ' attempt to attack...'
			logText(attackMessage)
			await sleep(600)
			if (x >= hardAttackDice) {
				damageTaken('attacke', 'enemyBox')
				let nh = player.health - hardAttackDamage
				player.health = nh < 0 ? 0 : nh
				// player.health = player.health - hardAttackDamage
				healthBarUpdate(
					player.health,
					player.maxHealth,
					player.pointsId,
					player.healthbarId
				)
				// logText('The enemy waves his spear at you');
				let damageText =
					'⚔️ You take ' + hardAttackDamage + ' points of critical damage'
				logText(damageText, 'damage')
				damageTaken('damages', 'playerBox')
			} else if (x > weakAttackDice && x < hardAttackDice) {
				damageTaken('attacke', 'enemyBox')
				// player.health = player.health - weakAttackDamage
				let nh = player.health - weakAttackDamage
				player.health = nh < 0 ? 0 : nh
				healthBarUpdate(
					player.health,
					player.maxHealth,
					player.pointsId,
					player.healthbarId
				)
				// logText('The enemy charges at you with a spear');
				let damageText = '⚔️ You take ' + weakAttackDamage + ' points of damage'
				logText(damageText, 'damage')
				damageTaken('damages', 'playerBox')
			} else {
				logText('💫 The fighter stumbles over his own feet', 'miss')
				damageTaken('attacke', 'enemyBox')
				damageTaken('playermiss', 'playerBox')
			}
		}
	}

	function fighter(
		name,
		health,
		maxHealth,
		pointsId,
		healthbarId,
		hardAttackDamage,
		hardAttackDice,
		weakAttackDamage,
		weakAttackDice
	) {
		this.name = name
		this.health = health
		this.maxHealth = maxHealth
		this.pointsId = pointsId
		this.healthbarId = healthbarId
		this.attacks = [
			[
				'🛡️ Shield Bash',
				2,
				3,
				'🛡️ You are trying to bash the opponent away with your shield ...',
				'💫 The enemy dodges your attack ...'
			],
			[
				'🔨 Mace Attack',
				6,
				6,
				'🔨 You are trying hit the enemy with a huge mace ...',
				'💫 The enemy dodges your attack ...'
			],
			[
				'🌀 Magic Attack',
				1,
				4,
				'🌀 You are trying to cast a spell on your opponent ...',
				'💫 The enemy dodges your attack ...'
			]
		]
	}

	const resetGame = () => {
		turn = 1
		roundCount = '⌛ Turn'
		locked = false
		gameOver = false

		player = new fighter(
			gs.p.name,
			gs.p.health,
			gs.p.maxHealth,
			gs.p.pointsId,
			gs.p.healthbarId,
			gs.p.hardAttackDamage,
			gs.p.hardAttackDice,
			gs.p.weakAttackDamage,
			gs.p.weakAttackDice
		)

		enemy = new opponent(
			gs.e.name,
			gs.e.health,
			gs.e.maxHealth,
			gs.e.pointsId,
			gs.e.healthbarId,
			gs.e.hardAttackDamage,
			gs.e.hardAttackDice,
			gs.e.weakAttackDamage,
			gs.e.weakAttackDice
		)
	}

	let gs = {
		e: {
			name: '👾 Goblin Warrior',
			health: 12,
			maxHealth: 12,
			pointsId: 'enemy_points',
			healthbarId: 'enemy_bar',
			hardAttackDamage: 4,
			hardAttackDice: 8,
			weakAttackDamage: 2,
			weakAttackDice: 3
		},
		p: {
			name: '🧝 Elf Knight',
			health: 30,
			maxHealth: 30,
			pointsId: 'player_points',
			healthbarId: 'player_bar',
			hardAttackDamage: 4,
			hardAttackDice: 8,
			weakAttackDamage: 2,
			weakAttackDice: 3,
			attacks: [
				[
					'Shield Bash',
					2,
					3,
					'🛡️ You are trying to bash the opponent away with your shield ...',
					'💫 The enemy dodges your attack ...'
				],
				[
					'Mace Attack',
					6,
					6,
					'🔨 You are trying hit the enemy with a huge mace ...',
					'💫 The enemy dodges your attack ...'
				],
				[
					'Magic Attack',
					1,
					4,
					'🌀 You are trying to cast a spell on your opponent ...',
					'💫 The enemy dodges your attack ...'
				]
			],
			attackLabel: ['Name', 'Damage', 'Dicer', 'Info', 'Failed']
		}
	}

	$: player = {
		name: '🧝 Elf Knight',
		health: 30,
		maxHealth: 30,
		pointsId: 'player_points',
		healthbarId: 'player_bar',
		hardAttackDamage: 4,
		hardAttackDice: 8,
		weakAttackDamage: 2,
		weakAttackDice: 3,
		attacks: [
			[
				'Shield Bash',
				2,
				3,
				'🛡️ You are trying to bash the opponent away with your shield ...',
				'💫 The enemy dodges your attack ...'
			],
			[
				'Mace Attack',
				6,
				6,
				'🔨 You are trying hit the enemy with a huge mace ...',
				'💫 The enemy dodges your attack ...'
			],
			[
				'Magic Attack',
				1,
				4,
				'🌀 You are trying to cast a spell on your opponent ...',
				'💫 The enemy dodges your attack ...'
			]
		]
	}
	$: enemy = {
		name: '👾 Goblin Warrior',
		health: 12,
		maxHealth: 12,
		pointsId: 'enemy_points',
		healthbarId: 'enemy_bar',
		hardAttackDamage: 4,
		hardAttackDice: 8,
		weakAttackDamage: 2,
		weakAttackDice: 3
	}
	onMount(() => {
		player = new fighter(
			gs.p.name,
			gs.p.health,
			gs.p.maxHealth,
			gs.p.pointsId,
			gs.p.healthbarId,
			gs.p.hardAttackDamage,
			gs.p.hardAttackDice,
			gs.p.weakAttackDamage,
			gs.p.weakAttackDice
		)

		enemy = new opponent(
			gs.e.name,
			gs.e.health,
			gs.e.maxHealth,
			gs.e.pointsId,
			gs.e.healthbarId,
			gs.e.hardAttackDamage,
			gs.e.hardAttackDice,
			gs.e.weakAttackDamage,
			gs.e.weakAttackDice
		)
	})

	$: if (player.health <= 0) {
		logText('☠️ You are dead', 'danger')
		// player.health = 0
		gameOver = true
	}
</script>

<Layer>
	<div class="p-4">
		<details>
			<summary>Player</summary>
			<div><pre>{JSON.stringify(player, null, 2)}</pre></div>
		</details>
		<details>
			<summary>Enemy</summary>
			<div><pre>{JSON.stringify(enemy, null, 2)}</pre></div>
		</details>

		<div class="flex flex-grow gap-4 p-4 shadow">
			<img src="./img/avatar/alien.png" />
			<div class="flex flex-col flex-grow">
				<span class="text-2xl">{enemy.name}</span>
				<span class="text-xl">Enemy</span>
				<span class="text-xl">Health: {enemy.health}</span>
				<!-- 	<span class="mt-auto"
					><input
						disabled
						type="range"
						bind:value={enemy.health}
						min={0}
						max={enemy.maxHealth} /></span> -->
				<div class="w-full flex h-4 bg-gray-100 rounded-full mt-auto">
					<span
						class="h-4 bg-blue-500 rounded-full transition-all duration-500 ease"
						style="width: {percentage(enemy.health, enemy.maxHealth)}%;" />
				</div>
			</div>
		</div>
		<div class="flex flex-grow gap-4 p-4 shadow">
			<img src="./img/avatar/robot.png" />
			<div class="flex flex-col flex-grow">
				<span class="text-2xl">{player.name}</span>
				<span class="text-xl">Player</span>
				<span class="text-xl">Health: {player.health}</span>
				<!-- <span class="mt-auto"
					><input
						disabled
						type="range"
						bind:value={player.health}
						min={0}
						max={player.maxHealth} /></span> -->
				<div class="w-full flex h-4 bg-gray-100 rounded-full mt-auto">
					<span
						class="h-4 bg-blue-500 rounded-full transition-all duration-500 ease"
						style="width: {percentage(player.health, player.maxHealth)}%;" />
				</div>
			</div>
		</div>

		<div class="p-4">
			{#if player.attacks}
				{#each player.attacks as [attackName, successDice, damage, attackDescription, missDescription]}
					<!-- attackName, successDice, damage, attackDescriptio, missDescription -->
					<button
						class="btn"
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
		</div>
		<div class="p-4">
			{roundCount}
			{turn}
		</div>
	</div>
</Layer>

{#if gameOver}
	<Layer>
		<div class="m-auto p-12 rounded bg-hite border shadow">
			<button on:click={resetGame} class="btn">Reset Game</button>
		</div>
	</Layer>
{/if}

<style>
	#guy {
		--bg-url: url(https://i.imgur.com/W4Y4RpQ.png);
		--w: 65px;
		--h: 90px;
		--end: -715px;
		width: 65px;
		height: 90px;
		background: var(--bg-url);
	}

	#guy:hover {
		/* animation: animGuy 0.8s steps(11) forwards; */
		animation: animGuy 0.8s steps(11) infinite;
	}

	@keyframes animGuy {
		0% {
			background-position-x: 0;
		}
		100% {
			background-position-x: var(--end);
		}
	}

	details {
		border: 1px solid #aaa;
		border-radius: 4px;
		padding: 0.5em 0.5em 0;
	}

	summary {
		font-weight: bold;
		margin: -0.5em -0.5em 0;
		padding: 0.5em;
	}

	details[open] {
		padding: 0.5em;
	}

	details[open] summary {
		border-bottom: 1px solid #aaa;
		margin-bottom: 0.5em;
	}
</style>
