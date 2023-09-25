<script>
	import { onMount } from 'svelte'
	import Layer from '../lib/Layer.svelte'
	import { sleep } from '../lib/util'
	import { addToast, addLog, Logs } from '../lib/notes'
	export let nav = [
		{
			href: '/',
			name: 'Start'
		}
	]
	// {"areas":[["battletop","logtop"],["battlebody","logbody"],["battlefoo","logbody"]],"columns":["3fr","minmax(400px, 1fr)"],"rows":["60px","1fr","60px"],"gridWidth":"100%","gridHeight":"100%"}
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

	const logText = (
		message,
		type = 'info',
		timeout = 10000,
		dismissible = true
	) => {
		// console.log('XXX - logText(text)', message)
		addLog({
			message,
			type,
			dismissible,
			timeout
		})
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
				logText(missDescription, 'error')
				damageTaken('enemymiss', 'enemyBox')
			}
			await sleep(1000)
			if (enemy.health > 0) {
				enemy.attack()
			} else {
				logText('☠️ Creatura is dead', 'error')
				// lockActionButtons(false)
				// enemy.health = 0
				gameOver = true
			}
			await sleep(2000)
			// turnCounterUpdate(turn)
			lockActionButtons(false)
		} else {
			logText('☠️ Creatura is dead', 'error')
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
				logText(damageText, 'success')
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
				logText(damageText, 'success')
				damageTaken('damages', 'playerBox')
			} else {
				logText('💫 The fighter stumbles over his own feet', 'success')
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
			pointsId: 'enemy',
			healthbarId: 'enemy',
			hardAttackDamage: 4,
			hardAttackDice: 8,
			weakAttackDamage: 2,
			weakAttackDice: 3
		},
		p: {
			name: '🧝 Elf Knight',
			health: 30,
			maxHealth: 30,
			pointsId: 'player',
			healthbarId: 'player',
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
			attackLabel: ['Name', 'success', 'Dicer', 'Info', 'Failed']
		}
	}
	$: logText(`⌛ Turn ${turn}`, 'warning')
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
		logText('☠️ You are dead', 'error')
		// player.health = 0
		gameOver = true
	}
</script>

<section class="battle-container">
	<header class="battletop">battletop</header>
	<header class="logtop">
		<span>
			{roundCount}
			{turn}
		</span>
	</header>

	<article class="battlebody">
		<div class="p-4 flex flex-col gap-4">
			<div class="media">
				<div class="media-side">
					<img src="./img/avatar/alien.png" />
				</div>
				<div class="media-article">
					<div class="text-2xl">{enemy.name}</div>
					<div class="text-xl">👤 Enemy</div>
					<div class="text-xl">💙 {enemy.health}</div>
				</div>
				<div class="media-footer">
					<div class="w-full flex h-4 bg-gray-100 rounded-full">
						<span
							class="h-4 bg-blue-500 rounded-full transition-all duration-500 ease"
							style="width: {percentage(enemy.health, enemy.maxHealth)}%;" />
					</div>
				</div>
			</div>

			<div class="media">
				<div class="media-side">
					<img src="./img/avatar/robot.png" />
				</div>
				<div class="media-article">
					<div class="text-2xl">{player.name}</div>
					<div class="text-xl">👤 Player</div>
					<div class="text-xl">💙 {player.health}</div>
				</div>
				<div class="media-footer">
					<div class="w-full flex h-4 bg-gray-100 rounded-full">
						<span
							class="h-4 bg-blue-500 rounded-full transition-all duration-500 ease"
							style="width: {percentage(player.health, player.maxHealth)}%;" />
					</div>
				</div>
			</div>
		</div>
	</article>

	<aside class="logbody p-1 bg-gray-800">
		<Logs />
	</aside>

	<footer class="battlefoo">
		<div class="menu-ph">
			{#each Array(3) as _}
				<div class="transition-all duration-500" class:bg-blue-500={locked} class:animate-pulse={locked} />
			{/each}
			<!-- 	<div class="shadow" />
			<div class="shadow" />
			<div class="shadow" /> -->
		</div>
		<div
			class="menu-grid absolute inset-0 transition-opacity duration-500 ease-in"
			class:opacity-0={locked}>
			{#if player.attacks}
				{#each player.attacks as [attackName, successDice, damage, attackDescription, missDescription]}
					<!-- attackName, successDice, damage, attackDescriptio, missDescription -->
					<button
						class="border bg-gray-50"
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
	</footer>
</section>

{#if gameOver}
	<div class="layer bg-red-500 bg-opacity-75">
		<div class="m-auto p-12 rounded bg-hite border shadow">
			<button on:click={resetGame} class="btn">Reset Game</button>
		</div>
	</div>
{/if}

<style>
	.menu-ph {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: 48px;
		gap: 0.5rem;
		padding: 0.5rem;
		grid-auto-flow: row;
		opacity: 0.9;
	}
	.menu-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: 48px;
		gap: 0.5rem;
		padding: 0.5rem;
		grid-auto-flow: row;
		/* justify-items: center;
		align-items: center; */
	}

	.battle-container {
		position: absolute;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		display: grid;
		width: 100%;
		height: auto;
		padding: 0;
		gap: 0;
		grid-template-areas:
			'battletop logtop'
			'battlebody logbody'
			'battlefoo logbody';
		grid-template-columns: 3fr minmax(400px, 1fr);
		grid-template-rows: fit-content(60px) 1fr minmax(50px, auto);
	}
	.battle-container > * {
		border: 1px dashed #888;
	}

	.battletop {
		grid-area: battletop;
		padding: 0.25rem 0.5rem;
	}
	.logtop {
		grid-area: logtop;
		padding: 0.25rem 0.5rem;
	}
	.battlebody {
		grid-area: battlebody;
		position: relative;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.logbody {
		grid-area: logbody;
		position: relative;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.battlefoo {
		grid-area: battlefoo;
		position: relative;
	}
	.media {
		display: grid;
		width: 100%;
		height: auto;
		grid-template-areas:
			'media-side media-article'
			'media-footer media-footer';
		grid-template-columns: minmax(100px, 1fr) 4fr;
		grid-template-rows: 1fr fit-content(60px);
	}
	.media {
		@apply p-2 shadow border rounded;
	}

	.media-side {
		grid-area: media-side;
		justify-self: center;
		align-self: center;
		padding: 0.5rem;
	}
	.media-article {
		grid-area: media-article;
		align-self: center;
	}
	.media-footer {
		grid-area: media-footer;
		padding: 0.5rem 1rem;
	}
</style>
