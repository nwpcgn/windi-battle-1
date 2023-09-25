<script>
	let player = {},
		enemy = {},
		gameResult = 'Start a Fight'

	$: match = [player, enemy]

	const sleep = (milliseconds = 1000) =>
		new Promise((resolve) => setTimeout(resolve, milliseconds))

	const getAttackDamage = () => {
		return Math.floor(Math.random() * 3)
	}

	const startBattle = () => {
		player.health = player.maxHealth
		enemy.health = enemy.maxHealth
		enemy.isAlive = true
		player.isAlive = true
		fight()
	}

	function fight() {
		setTimeout(function () {
			player.attaced = false
			enemy.attaced = false
			// recurssive is used instead of while loop for the setTimeout to work
			//while (enemy.isAlive && player.isAlive) {

			var whoAttack = Math.floor(Math.random() * 2)
			if (whoAttack === 0) {
				// enemy attack player
				// Random attack will be generated from 0-2
				// if attack is zero, enemy avoided attack.
				enemy.attac = getAttackDamage()
				if (enemy.attac === 0) {
					gameResult = 'enemy attacked player but player avoided.'
				} else {
					player.health = player.health - enemy.attac
					gameResult = 'enemy punched player.'
					player.attaced = true
				}

				updateLife(player)
			} else {
				// player attack enemy
				// Random attack will be generated from 0-2
				// if attack is zero, enemy avoided attack.
				player.attac = getAttackDamage()
				if (player.attac === 0) {
					gameResult = 'enemy dodged from players trap.'
				} else {
					enemy.health = enemy.health - player.attac
					enemy.attaced = true
					gameResult =
						'player uses remote activated guns that fire and expels Kryptonite mist at enemy.'
				}

				updateLife(enemy)
			}

			checkEndGame()
			//}

			// recurssive is used instead of while loop for the setTimeout to work
			if (enemy.isAlive && player.isAlive) fight()
		}, 800)
	}

	const showDialog = (log) => {
		console.log('showDialog', log)
	}

	const checkEndGame = () => {
		if (enemy.isAlive === false || player.isAlive === false) {
			showDialog('Game Over')
			player.attaced = false
			enemy.attaced = false
			if (enemy.isAlive) {
				gameResult = 'enemy killed player with X-Ray laser vision.'
				showDialog('Enemy Win')
			} else {
				gameResult = 'player killed enemy with Kryptonite spear.'
				showDialog('Player Win')
			}
		}
	}

	const updateLife = (hero) => {
		if (hero.health <= 0) {
			hero.health = 0
			hero.isAlive = false
		}
	}

	class Hero {
		constructor(
			id,
			name,
			health,
			maxHealth,
			hardAttackDamage,
			hardAttackDice,
			weakAttackDamage,
			weakAttackDice,
			isAlive,
			attac
		) {
			this.id = id
			this.name = name
			this.health = health
			this.maxHealth = maxHealth
			this.hardAttackDamage = hardAttackDamage
			this.hardAttackDice = hardAttackDice
			this.weakAttackDamage = weakAttackDamage
			this.weakAttackDice = weakAttackDice
			this.isAlive = isAlive
			this.attac = attac
			this.attaced = false
		}
		dataObj() {
			let o = {}
			o.id = this.id
			o.name = this.name
			o.health = this.health
			o.maxHealth = this.maxHealth
			o.hardAttackDamage = this.hardAttackDamage
			o.hardAttackDice = this.hardAttackDice
			o.weakAttackDamage = this.weakAttackDamage
			o.weakAttackDice = this.weakAttackDice
			o.isAlive = this.isAlive
			o.attac = this.attac
			o.attaced = this.attaced
			console.log(o)
			return o
		}

		takeOff(countdown = 1000) {
			console.log(this.name + ' starting countdown.')
			setTimeout(() => {
				console.log(`Blastoff! ${this.name} has taken off`)
			}, countdown)
		}
	}

	const init = async () => {
		await sleep(1000)
		player = new Hero(0, 'Bruce Wayne', 12, 12, 4, 8, 2, 3, true, 0)
		enemy = new Hero(1, 'Clark Kent', 12, 12, 4, 8, 2, 3, true, 0)
		return true
	}

	let promise = init()
</script>

{#await promise}
	<section class="load-wrapp">
		<div class="m-auto">
			<span class="loader" />
		</div>
	</section>
{:then _}
	<section class="layer">
		<section class="p-4">
			<!-- content here -->
			<div class="flex gap-4">
				{#each match as { name, health, maxHealth, isAlive, attac, attaced }}
					<div
						class="flex flex-col flex-1 gap-2 border-4 rounded transition-all duration-150 ease"
						class:border-blue-500={attaced}
						class:opacity-25={!isAlive}>
						<header class="flex flex-grow gap-2">
							<img
								class="w-20 h-20"
								src="https://images.unsplash.com/photo-1631882456892-54a30e92fe4f?ixid=M3wyMDkyMnwwfDF8c2VhcmNofDQ5fHxhdmF0YXJ8ZW58MHx8fHwxNjk1MjgyNzQxfDA&ixlib=rb-4.0.3q=85&fm=jpg&crop=faces&cs=srgb&w=100&h=100&fit=crop" />
							<div class="flex flex-col flex-grow">
								<span class="text-2xl">{name}</span>
								<span class="text-xl">Health: {health}</span>
							</div>
						</header>
						<footer class="p-4">
							<label
								><input
									class="bg-gray-100"
									type="range"
									min={0}
									max={maxHealth}
									value={health} /></label>
						</footer>
					</div>
				{/each}
			</div>

			<div class="py-4">
				<button class="btn" on:click={startBattle}>Fight</button>
			</div>
			<div class="py-4">
				<span class="text-xl font-semibold capitalize">
					{@html gameResult}
				</span>
			</div>
		</section>
	</section>
{/await}

<style>
	.loader {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		display: inline-block;
		border-top: 4px solid #fff;
		border-right: 4px solid transparent;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}
	.loader::after {
		content: '';
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 0;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		border-bottom: 4px solid #ff3d00;
		border-left: 4px solid transparent;
	}
	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	.load-wrapp {
		position: fixed;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 50;
		--tw-bg-opacity: 0.25;
		background-color: rgba(0, 0, 0, var(--tw-bg-opacity));
	}
</style>
