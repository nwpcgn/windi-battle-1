<script>
	import SpriteEl from '../components/SpriteEl.svelte'
	import StatPanel from '../components/StatPanel.svelte'
	import Foobar from '../components/Foobar.svelte'
	import HeaderMain from '../components/HeaderMain.svelte'
	import HeaderSb from '../components/HeaderSb.svelte'
	import MainContent from '../components/MainContent.svelte'
	import SideBar from '../components/SideBar.svelte'
	import Wrapp from '../components/Wrapp.svelte'
	import { onMount } from 'svelte'
	import { sleep } from '../lib/util'
	import { addToast, addLog, Logs } from '../lib/notes'
	import Layer from '../lib/Layer.svelte'
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
	let ended = false
	let current = 0

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
				ended = true
			}
			await sleep(2000)
			// turnCounterUpdate(turn)
			lockActionButtons(false)
		} else {
			logText('☠️ Creatura is dead', 'error')
			// lockActionButtons(false)
			// enemy.health = 0
			ended = true
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
		ended = false
		initGamePlay()
	}

	let game = {
		pi: 1,
		ei: 1,
		player: [
			{
				name: '🧝 Elf Knight',
				health: 30,
				maxHealth: 30,
				pointsId: 'player',
				healthbarId: 'player',
				hardAttackDamage: 4,
				hardAttackDice: 8,
				weakAttackDamage: 2,
				weakAttackDice: 3,
				hero: true,
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
			},
			{
				name: '🤖 Jones Verr',
				health: 30,
				maxHealth: 30,
				pointsId: 'player',
				healthbarId: 'player',
				hardAttackDamage: 4,
				hardAttackDice: 8,
				weakAttackDamage: 2,
				weakAttackDice: 3,
				hero: true,
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
		],
		enemy: [
			{
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
			{
				name: '👽 Cuuwing',
				health: 12,
				maxHealth: 12,
				pointsId: 'enemy',
				healthbarId: 'enemy',
				hardAttackDamage: 4,
				hardAttackDice: 8,
				weakAttackDamage: 2,
				weakAttackDice: 3
			},
			{
				name: '🥷Wispfree Jones ',
				health: 12,
				maxHealth: 12,
				pointsId: 'enemy',
				healthbarId: 'enemy',
				hardAttackDamage: 4,
				hardAttackDice: 8,
				weakAttackDamage: 2,
				weakAttackDice: 3
			},
			{
				name: '🧛 Break Gett',
				health: 12,
				maxHealth: 12,
				pointsId: 'enemy',
				healthbarId: 'enemy',
				hardAttackDamage: 4,
				hardAttackDice: 8,
				weakAttackDamage: 2,
				weakAttackDice: 3
			}
		]
	}
	$: logText(`⌛ Turn ${turn}`, 'warning')
	$: player = {
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
		]
	}
	$: enemy = {
		name: '👾 Goblin Warrior',
		health: 12,
		maxHealth: 12,
		pointsId: 'enemy',
		healthbarId: 'enemy',
		hardAttackDamage: 4,
		hardAttackDice: 8,
		weakAttackDamage: 2,
		weakAttackDice: 3
	}

	const initGamePlay = () => {
		let p = game.player[game.pi]
		let e = game.enemy[game.ei]
		player = new fighter(
			p.name,
			p.health,
			p.maxHealth,
			p.pointsId,
			p.healthbarId,
			p.hardAttackDamage,
			p.hardAttackDice,
			p.weakAttackDamage,
			p.weakAttackDice
		)
		enemy = new opponent(
			e.name,
			e.health,
			e.maxHealth,
			e.pointsId,
			e.healthbarId,
			e.hardAttackDamage,
			e.hardAttackDice,
			e.weakAttackDamage,
			e.weakAttackDice
		)
	}
	onMount(() => {
		initGamePlay()
	})

	$: if (player.health <= 0) {
		logText('☠️ You are dead', 'error')
		// player.health = 0
		ended = true
	}
</script>

<Wrapp>
	<HeaderMain />
	<HeaderSb />
	<MainContent>
		<section class="max-w-3xl mx-auto p-4 grid grid-cols-2 gap-2">
			<StatPanel {...player}>Player</StatPanel>
			<StatPanel {...enemy}>Enemy</StatPanel>
		</section>
	</MainContent>
	<SideBar>
		<Logs />
	</SideBar>
	<Foobar bind:player bind:current bind:locked {logText} {weaponAttack} />
</Wrapp>
