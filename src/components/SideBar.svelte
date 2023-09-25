<script>
	import { quartInOut } from 'svelte/easing'
	import { fade, slide } from 'svelte/transition'
</script>

<aside
	class="sb-cont"
	transition:slide={{ duration: 500, delay: 500, easing: quartInOut }}>
	<slot><!-- optional fallback --></slot>
</aside>

<style>
	.sb-cont {
		overflow-y: auto;
		grid-area: sb-cont;
		border-left: var(--bf-border);
		display: flex;
		flex-direction: column;
		overflow-x: hidden;
		background-color: var(--gray-800);
		color: var(--sky-500);
		padding: var(--bf-el-p);
	}
</style>
