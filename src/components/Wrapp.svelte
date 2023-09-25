<script>
	import { quintInOut } from 'svelte/easing'
	import { fade } from 'svelte/transition'
	export let terminal = false
</script>

<section
	in:fade={{ duration: 500, easing: quintInOut }}
	class="battle-frame"
	class:terminal>
	<slot />
</section>

<style>
	:root {
		--gray-50: #e7eaee;
		--gray-100: #cdd2da;
		--gray-200: #b3bbc6;
		--gray-300: #98a3b3;
		--gray-400: #7e8c9f;
		--gray-500: #64748b;
		--gray-600: #515e71;
		--gray-700: #3f4957;
		--gray-800: #2c333d;
		--bf-space-1: 0.25rem;
		--bf-space-2: 0.5rem;
		--bf-el-px: 0.75rem;
		--bf-el-py: 0.5rem;
		--bf-el-p: var(--bf-el-py) var(--bf-el-px);
		--bf-el-gap: 0.5rem;
		--bf-border: 1px solid var(--gray-300);
		--font-stack: Menlo, Monaco, Lucida Console, Liberation Mono,
			DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
		--mono-font-stack: Menlo, Monaco, Lucida Console, Liberation Mono,
			DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
		--background-color: #fff;
		--page-width: 60em;
		--font-color: var(--gray-600);
	}
	.battle-frame {
		font-family: var(--mono-font-stack);
		display: grid;
		grid-template-columns: 2fr minmax(300px, 1fr);
		grid-template-rows: fit-content(50px) 1fr minmax(100px, auto);
		grid-template-areas: 'win-top sb-top' 'win-cont sb-cont' 'win-foo sb-cont';
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: fixed;
		bottom: 0;
		top: 0;
		right: 0;
		left: 0;
	}
</style>
