<script>
	export let name = '🧝 Elf Knight'
	export let health = 25
	export let maxHealth = 30
</script>

<div class="stat-grid">
	<div class="stat-top">
		<h4>{name}</h4>
		<h5><slot>Player</slot></h5>
	</div>
	<div class="stat-side">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			width="1em"
			height="1em">
			<g>
				<path fill="none" d="M0 0h24v24H0z" />
				<path
					d="M12.513 2.001a9.004 9.004 0 0 0 9.97 5.877A4.501 4.501 0 0 1 19 11.888V19l2 .001v2H3v-2h2v-7.113a4.503 4.503 0 0 1-3.484-4.01 9.004 9.004 0 0 0 9.972-5.876h1.025zM17 12H7V19h10v-7z" />
			</g>
		</svg>
	</div>
	<div class="stat-cont">
		<progress max={maxHealth} value={health} />
	</div>
	<div class="stat-foo">
		<div>{health}/ {maxHealth}</div>
	</div>
</div>
