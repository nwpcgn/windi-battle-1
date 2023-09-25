<script>
	import Layer from '../lib/Layer.svelte'
	// import { path } from 'elegua'
	import { sleep } from '../lib/util'

	let go = {
		name: '🤖 Jones Verr',
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
	let en = {
		name: '👾 Goblin Warrior',
		health: 12,
		maxHealth: 12,
		pointsId: 'enemy',
		healthbarId: 'enemy',
		hardAttackDamage: 6,
		hardAttackDice: 8,
		weakAttackDamage: 3,
		weakAttackDice: 4
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

	function fighter(obj) {
		this.name = obj.name
		this.health = obj.health
		this.maxHealth = obj.maxHealth
		this.pointsId = obj.pointsId
		this.healthbarId = obj.healthbarId
		this.hardAttackDamage = obj.hardAttackDamage
		this.hardAttackDice = obj.hardAttackDice
		this.weakAttackDamage = obj.weakAttackDamage
		this.weakAttackDice = obj.weakAttackDice
		this.attacks = obj.attacks
	}

	let player = new fighter(go)
	let enemy = new opponent(en)

	console.log(player)
	console.log(enemy)
</script>

<Layer stil="bg-gray-50">
	<div class="max-w-xl m-auto flex flex-col items-center p-16 gap-8 border">
		<div class="text-4xl">Nwp-Battle</div>
		
		<a href="/battle" class="btn">Attack</a>
	</div>
</Layer>

<style>
</style>
