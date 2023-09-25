<script>
	import { quintInOut } from 'svelte/easing'
	import { fade } from 'svelte/transition'
	export let terminal = false
</script>

<section
	in:fade={{ duration: 400, easing: quintInOut }}
	class="battle-frame font-mono"
	class:terminal>
	<slot />
</section>
