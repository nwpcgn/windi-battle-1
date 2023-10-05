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
	import TextLogger, {
		textLog,
		clearLogs
	} from '../components/TextLogger.svelte'
	import Wrapp from '../components/Wrapp.svelte'
	let ended = true
	let locked = false
	let rivals = new CharacterLib(game.player, game.enemy)
	let roundCount = `⌛ Turn`
	let turn = 0
	let box = {}
	box.enemy = ''
	box.player = ''

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

	const damageTaken = async (animationClass, targetId) => {
		await sleep(100)
		if (animationClass === 'swing') {
			animationClass += ' animate-jackInTheBox'
		} else if (animationClass === 'damages') {
			animationClass += ' animate-bounce'
		} else if (animationClass === 'attacke') {
			animationClass += ' animate-flash'
		} else if (animationClass === 'playermiss') {
			animationClass += ' animate-wobble'
		} else if (animationClass === 'enemymiss') {
			animationClass += ' animate-tada'
		}
		box[targetId] = animationClass
	}

	function lockActionButtons(condition) {
		locked = condition
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
			let attackMessage = `${this.name} attempt to attack...`
			logText(attackMessage)

			let _del = throwDice(300, 900)
			await sleep(800 + _del)
			if (x >= this.hardAttackDice) {
				damageTaken('attacke', 'enemy')
				let nh = player.health - this.hardAttackDamage
				player.health = nh < 0 ? 0 : nh
				// healthBarUpdate(player.health, player.maxHealth, player.pointsId)
				let attac_msg = `${this.name} waves his spear at you`
				logText(attac_msg, 'warning')
				let _del = throwDice(300, 500)
				await sleep(100 + _del)
				let damageText = `⚔️ You take ${this.hardAttackDamage} points of critical damage`
				logText(damageText, 'error')
				damageTaken('damages', 'player')
			} else if (x > this.weakAttackDice && x < this.hardAttackDice) {
				damageTaken('attacke', 'enemy')
				let nh = player.health - this.weakAttackDamage
				player.health = nh < 0 ? 0 : nh
				// healthBarUpdate(player.health, player.maxHealth, player.pointsId)
				let _del = throwDice(300, 500)
				let attac_msg = `${this.name} charges at you with a spear`
				logText(attac_msg, 'warning')
				await sleep(100 + _del)
				let damageText = `⚔️ You take ${this.weakAttackDamage} points of damage`
				logText(damageText, 'error')
				damageTaken('damages', 'player')
			} else {
				damageTaken('attacke', 'enemy')
				let _del = throwDice(300, 500)
				let attac_msg = `${this.name} charges at you with a spear`
				logText(attac_msg, 'warning')
				await sleep(100 + _del)
				logText('💫 The Enemy stumbles over his own feet', 'blank')
				damageTaken('playermiss', 'player')
			}

			await sleep(400)
			logText('Turn End', 'terminal')
		}
	}

	const removeAnimation = async () => {
		await sleep(1500)
		box.enemy = ''
		box.player = ''
	}

	async function weaponAttack(
		attackName,
		successDice,
		damage,
		attackDescription,
		missDescription
	) {
		clearLogs()
		lockActionButtons(true)
		ended = false
		turn++
		logText(`⌛ Turn ${turn}`, 'terminal')
		let x = throwDice(1, 10)
		let _del = throwDice(400, 900)
		await sleep(600 + _del)
		if (enemy.health > 0) {
			await sleep(200)
			logText(attackName, 'info')
			await sleep(200)
			logText(attackDescription, 'info')
			await sleep(800)
			damageTaken('swing', 'player')
			if (x > successDice) {
				let nh = enemy.health - damage
				enemy.health = nh < 0 ? 0 : nh
				damageTaken('damages', 'enemy')
				// healthBarUpdate(enemy.health, enemy.maxHealth, enemy.pointsId)
				let damagedeal = `⚔️ You successfully deal ${damage} points of damage to the opponent`
				logText(damagedeal, 'success')
			} else {
				logText(missDescription, 'error')
				damageTaken('enemymiss', 'enemy')
			}
			let _dely = throwDice(500, 1500)
			await sleep(1000 + _dely)
			if (enemy.health > 0) {
				enemy.attack()
			} else {
				logText('☠️ Creatura is dead', 'success')
				ended = true
			}
			await sleep(800)
		} else {
			logText('☠️ Creatura is dead', 'success')
			ended = true
		}
		await sleep(1500)
		removeAnimation()
		if (player.health < 1) {
			logText('☠️ You are dead', 'error')
			ended = true
		}

		await sleep(1000)
		lockActionButtons(false)
	}

	$: player = {}
	$: enemy = {}

	const demo = async () => {
		resetArena()
		lockActionButtons(true)
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
		ended = true
		lockActionButtons(false)
		player.health = player.maxHealth
		enemy.health = enemy.maxHealth
	}

	const resetArena = () => {
		turn = 0
		locked = false
		ended = true
		box.enemy = ''
		box.player = ''
	}

	const initGamePlay = () => {
		if (rivals.battle()) {
			let obj1 = rivals.getPlayer()
			player = new fighter(obj1)
			let obj2 = rivals.getEnemy()
			enemy = new opponent(obj2)
			resetArena()
		}
	}

	onMount(() => {
		// console.log(rivals.battle())
	})
</script>

<Wrapp>
	<HeaderMain />
	<HeaderSb on:clear={clearLogs} bind:rivals />
	<MainContent>
		{#if $path === '/battle'}
			<Main bind:rivals bind:player bind:enemy {initGamePlay} />
		{:else if $path === '/battle/player'}
			<Player slug="player" bind:rivals />
		{:else if $path === '/battle/enemy'}
			<Player slug="enemy" bind:rivals />
		{:else if $path === '/battle/heal'}
			<Heal />
		{:else if $path === '/battle/arena'}
			<Arena
				bind:box
				bind:ended
				bind:enemy
				bind:locked
				bind:player
				bind:rivals
				{demo}
				{initGamePlay}
				{weaponAttack} />
		{/if}
	</MainContent>
	<SideBar>
		<TextLogger />
	</SideBar>
	<Foobar bind:player bind:ended bind:locked {weaponAttack} />
</Wrapp>
