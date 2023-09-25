<script context="module">
	// import { slide } from 'svelte/transition'
	import { writable } from 'svelte/store'
	function typewriter(node, { speed = 2 }) {
		const valid =
			node.childNodes.length === 1 &&
			node.childNodes[0].nodeType === Node.TEXT_NODE

		if (!valid) {
			throw new Error(
				`This transition only works on elements with a single text node child`
			)
		}

		const text = node.textContent
		const duration = text.length / (speed * 0.01)

		return {
			duration,
			tick: (t) => {
				const i = ~~(text.length * t)
				node.textContent = text.slice(0, i)
			}
		}
	}
	export const tlogs = writable([])
	export const textLog = (tlog) => {
		// Create a unique ID so we can easily find/remove it
		// if it is dismissible/has a timeout.
		// const id = Math.floor(Math.random() * 10000)
		const id = 'id' + new Date().getTime()
		// Setup some sensible defaults for a tlog.
		const defaults = {
			id,
			type: 'info',
			dismissible: true,
			timeout: 3000,
			animate: false
		}

		// Push the tlog to the top of the list of tlogs
		tlogs.update((all) => [{ ...defaults, ...tlog }, ...all])

		// If tlog is dismissible, dismiss it after "timeout" amount of time.
		if (tlog.timeout) setTimeout(() => dismissLog(id), tlog.timeout)
	}

	const dismissLog = (id) => {
		tlogs.update((all) => all.filter((t) => t.id !== id))
	}
	export const clearLogs = (id) => {
		tlogs.set([])
	}
</script>

<script>
	/* const daten = [
		{
			text: 'A capsule hotel that s 8 stories tall. Decrepit and rundown. Interior in cramped organic style with secret small data node that leads into the low-res virtual hellscape of a dying world. a terrible monster guards a large   stash. Protected by cyberslashers.',
			type: 'info',
			timeout: 0
		},
		{
			text: 'An ancient subway tunnel accessible through a g0 crater that s 12 stories tall. Unfinished extension or empty levels. Interior in spacious shabby-chic style with secret weapons cache. Protected by mainly drones and turrets.',
			type: 'blank',
			timeout: 6474
		},
		{
			text: 'A factory that s 18 stories tall. High tech equipment. Interior in untidy industrial style with secret cameras. Protected by stealth-suit psychopath.',
			type: 'blank',
			timeout: 5998
		},
		{
			text: 'A garage that s 7 stories tall. Inadequate security. Interior in cluttered minimalist style with secret casette with a custom app  which has a tracker that will ping the app author as soon as it s used. Protected by Uniter Citadel Security.',
			type: 'error',
			timeout: 6574
		},
		{
			text: 'A freight ship in port  with a labyrinth of hidden compartments that s 5 stories tall. Graffitipocalypse. Interior in organised rustic style with secret privacy screen. Protected by enhanced beasts.',
			type: 'error',
			timeout: 4960
		},
		{
			text: 'A ripperdoc that s 11 stories tall. Incomplete. Interior in spacious organic style with secret danger: mold in the walls releases sight-blocking spores when bullets hit them. Protected by nobody.',
			type: 'warning',
			timeout: 4031
		},
		{
			text: 'A grocery store that s 17 stories tall. Incomplete. Interior in cluttered gothic style with secret danger: a cy-raging menace locked inside a padded room. Protected by vindicator cydroid and handler.',
			type: 'success',
			timeout: 4353
		},
		{
			text: 'A deep  lost virtual world that s 14 stories tall. Back room brothel. Interior in spacious industrial style with secret small data node that leads into the low-res virtual hellscape of a dying world. a terrible monster guards a large   stash. Protected by stealth-suit psychopath.',
			type: 'blank',
			timeout: 6120
		},
		{
			text: 'A bar that s 10 stories tall. Squatters who have taken over parts of the building  engaged in a slow but deadly conflict with the owners. Interior in cramped organic style with secret small data node that leads into the low-res virtual hellscape of a dying world. a terrible monster guards a large   stash. Protected by off-duty cops.',
			type: 'blank',
			timeout: 4983
		},
		{
			text: 'A restaurant that s 18 stories tall. Abandoned edifice. Interior in feng shui office beige style with secret weapon sensor. Protected by hell-trained SecOp team.',
			type: 'success',
			timeout: 6328
		},
		{
			text: 'A vrcade that s 14 stories tall. Traces of a recent gunfight with bullet holes and sot rom small fires still on the walls. Interior in feng shui minimalist style with secret danger: a glitching ghost is stuck in a loop somewhere  attacking anyone who enters its vicinity. Protected by corp assassin strike team.',
			type: 'error',
			timeout: 6761
		},
		{
			text: 'A pocket park that s 20 stories tall. Has A weird Smell (see P12). Interior in cavernous rustic style with secret danger: tech use has 50% chance of triggering an electrical fire. Protected by drunken  low-rate secops.',
			type: 'warning',
			timeout: 6539
		},
		{
			text: 'A bulk transport company that s 11 stories tall. Surprisingly rough and dirty. Interior in cluttered rustic style with secret custodian ai. Protected by virid vipers.',
			type: 'blank',
			timeout: 6907
		},
		{
			text: 'A shopping mall that s 14 stories tall. Obvious gang turf (see p26). Interior in biohazard polymer baroque style with secret microphone. Protected by vindicator cydroid and handler.',
			type: 'info',
			timeout: 5728
		},
		{
			text: 'A meeting place for the disgustingly rich that s 17 stories tall. Unusual smell (see p12). Interior in organised hexagonal tiles style with secret danger: tech use has 50% chance of triggering an electrical fire. Protected by nobody.',
			type: 'blank',
			timeout: 5672
		},
		{
			text: 'A night club that s 15 stories tall. Obvious gang turf (see p26). Interior in spacious shabby-chic style with secret danger: an out-of-place laser turret fires at everyone without the password. Protected by AI with weapon platforms.',
			type: 'warning',
			timeout: 4883
		}
	] */

	const icons = {
		info: '💡',
		error: '⛔',
		success: '✅',
		warning: '⚠️',
		blank: '📃',
		terminal: 'nwp@battle> ',
		pack: '📦'
	}
	const getClass = (type = 'default') => {
		let str = ''
		switch (type.toLowerCase().trim()) {
			case '':
				break
			case 'info':
				str = 'text-blue-400'
				break
			case 'error':
				str = 'text-red-500'
				break
			case 'success':
				str = 'text-emerald-500'
				break
			case 'warning':
				str = 'text-amber-500'
				break
			case 'blank':
				str = 'text-gray-300'
				break
			case 'terminal':
				str = 'text-terminal'
				break
			default:
				str = 'text-gray-300'
				break
		}

		return str
	}
</script>

{#if $tlogs.length}
	<section class="font-mono leading-tight flex flex-col gap-2">
		{#each $tlogs as log (log.id)}
			<div
				class="text-log {getClass(log.type)}"
				on:pointerdown={() => dismissLog(log.id)}>
				<span class="glow">{icons[log.type]}</span>
				<span in:typewriter>{log.text}</span>
			</div>
		{/each}
	</section>
{:else}{/if}

<style>
	.text-log {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
			'Liberation Mono', 'Courier New', monospace;
		line-height: 1.2;
		font-size: 0.9rem;
		cursor: no-drop;
	}
	.text-terminal {
		color: #a3be8c;
	}
</style>
