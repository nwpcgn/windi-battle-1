<script>
	import { CharacterLib, game, fighter, throwDice } from '../components/battle'
	import { onMount } from 'svelte'
	import { path } from 'elegua'
	import { sleep } from '../lib/util'
	import Arena from './Arena.svelte'
	import Foobar from '../components/Foobar.svelte'
	import HeaderMain from '../components/HeaderMain.svelte'
	import HeaderSb from '../components/HeaderSb.svelte'
	import Heal from './Heal.svelte'
	import Main from './Main.svelte'
	import MainContent from '../components/MainContent.svelte'
	import Player from './Player.svelte'
	import SideBar from '../components/SideBar.svelte'
	import TextLogger, { textLog } from '../components/TextLogger.svelte'
	import Wrapp from '../components/Wrapp.svelte'
	let current = 0
	let ended = true
	let locked = false
	let rivals = new CharacterLib(game.player, game.enemy)
	let roundCount = `⌛ Turn`
	let turn = 0

	const logText = (
		text,
		type = 'info',
		timeout = 20000,
		dismissible = true
	) => {
		// console.log('XXX - logText(text)', message)
		textLog({
			text,
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
	function opponent(obj) {
		this.name = obj.name
		this.health = obj.health
		this.maxHealth = obj.maxHealth
		this.pointsId = obj.pointsId
		this.healthbarId = obj.healthbarId
		this.hardAttackDamage = obj.hardAttackDamage
		this.hardAttackDice = obj.hardAttackDice
		this.weakAttackDamage = obj.weakAttackDamage
		this.weakAttackDice = obj.weakAttackDice
		this.attack = async function () {
			let x = throwDice(1, 10)
			let attackMessage = this.name + ' attempt to attack...'

			logText(attackMessage)

			await sleep(600)
			if (x >= this.hardAttackDice) {
				damageTaken('attacke', 'enemyBox')
				let nh = player.health - this.hardAttackDamage
				player.health = nh < 0 ? 0 : nh
				healthBarUpdate(
					player.health,
					player.maxHealth,
					player.pointsId,
					player.healthbarId
				)
				// logText('The enemy waves his spear at you');
				let damageText =
					'⚔️ You take ' + this.hardAttackDamage + ' points of critical damage'
				logText(damageText, 'error')
				damageTaken('damages', 'playerBox')
			} else if (x > this.weakAttackDice && x < this.hardAttackDice) {
				damageTaken('attacke', 'enemyBox')
				// player.health = player.health - weakAttackDamage
				let nh = player.health - this.weakAttackDamage
				player.health = nh < 0 ? 0 : nh
				healthBarUpdate(
					player.health,
					player.maxHealth,
					player.pointsId,
					player.healthbarId
				)
				// logText('The enemy charges at you with a spear');
				let damageText =
					'⚔️ You take ' + this.weakAttackDamage + ' points of damage'
				logText(damageText, 'error')
				damageTaken('damages', 'playerBox')
			} else {
				logText('💫 The fighter stumbles over his own feet', 'success')
				damageTaken('attacke', 'enemyBox')
				damageTaken('playermiss', 'playerBox')
			}

			await sleep(400)
			logText('Turn End', 'terminal')
		}
	}

	async function weaponAttack(
		attackName,
		successDice,
		damage,
		attackDescription,
		missDescription
	) {
		// console.log('weaponAttack(successDice, damage)', successDice, damage)

		lockActionButtons(true)
		turn++
		logText(`⌛ Turn ${turn}`, 'terminal')
		// turnCounterUpdate(turn)
		let x = throwDice(1, 10)
		let _del = throwDice(100, 900)
		await sleep(600 + _del)

		if (enemy.health > 0) {
			await sleep(200)
			logText(attackName, 'info')
			await sleep(200)
			logText(attackDescription, 'info')
			await sleep(800)
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
				logText('☠️ Creatura is dead', 'success')
				// lockActionButtons(false)
				// enemy.health = 0
				ended = true
			}
			await sleep(800)
			// turnCounterUpdate(turn)
			lockActionButtons(false)
		} else {
			logText('☠️ Creatura is dead', 'success')
			// lockActionButtons(false)
			// enemy.health = 0
			ended = true
		}

		await sleep(1000)
		lockActionButtons(false)
	}

	const resetGame = () => {
		turn = 1
		roundCount = '⌛ Turn'
		locked = false
		ended = false
		initGamePlay()
	}

	$: player = {}
	$: enemy = {}

	const demo = async () => {
		await sleep(1000)
		player.health = 24
		enemy.health = 13
		await sleep(1200)
		player.health = 22
		enemy.health = 11
		await sleep(800)
		player.health = 20
		enemy.health = 10
		await sleep(900)
		player.health = 18
		enemy.health = 8
		await sleep(1100)
		player.health = 16
		enemy.health = 6
		await sleep(1400)
		player.health = 13
		enemy.health = 4
		await sleep(900)
		player.health = 10
		enemy.health = 8
		await sleep(800)
		player.health = 8
		enemy.health = 10
		await sleep(1000)
		player.health = 6
		enemy.health = 8
		await sleep(700)
		player.health = 4
		enemy.health = 6
		await sleep(1300)
		player.health = 2
		enemy.health = 3
		await sleep(900)
		player.health = 18
		enemy.health = 8
		await sleep(1100)
		player.health = 16
		enemy.health = 6
		await sleep(1400)
		player.health = 13
		enemy.health = 4
		await sleep(900)
		player.health = 10
		enemy.health = 8
		await sleep(800)
		player.health = 8
		enemy.health = 10
		await sleep(1000)
		player.health = 0
		enemy.health = 0
		await sleep(8000)
		player.health = player.maxHealth
		enemy.health = enemy.maxHealth
	}

	const initGamePlay = () => {
		if (rivals.battle()) {
			let obj1 = rivals.getPlayer()
			player = new fighter(obj1)
			let obj2 = rivals.getEnemy()
			enemy = new opponent(obj2)
			turn = 0
			locked = false
			ended = false
		}
	}

	onMount(() => {
		console.log(rivals.battle())
	})
</script>

<Wrapp>
	<HeaderMain />
	<HeaderSb bind:rivals />
	<MainContent>
		{#if $path === '/battle'}
			<Main bind:rivals bind:player bind:enemy {initGamePlay} />
		{:else if $path === '/battle/player'}
			<Player slug="player" bind:rivals />
		{:else if $path === '/battle/enemy'}
			<Player slug="enemy" bind:rivals />
		{:else if $path === '/battle/heal'}
			<Heal bind:rivals />
		{:else if $path === '/battle/arena'}
			<Arena
				bind:player
				bind:enemy
				bind:rivals
				bind:locked
				{demo}
				{initGamePlay}
				{weaponAttack} />
		{/if}
	</MainContent>
	<SideBar>
		<TextLogger />
	</SideBar>
	<Foobar bind:player bind:current bind:locked {logText} {weaponAttack} />
</Wrapp>
