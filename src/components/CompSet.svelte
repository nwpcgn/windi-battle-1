<script>
	export let data = [
		{
			content: 'Select your Character',
			next: false,
			href: false,
			style: 'btn btn-error'
		},
		{
			name: 'Terminal',
			next: false,
			href: '/terminal',
			content: false,
			style: 'btn btn-primary'
		},
		{
			name: 'Open Settings',
			next: false,
			href: '/battle',
			content: false,
			style: 'btn btn-default btn-ghost'
		},
		{
			name: 'Close',
			close: true,
			style: 'btn btn-default'
		}
	]
	export let current = 0
</script>

<div class="btn-grid">
	{#each data as { name, href, close, content, next, style }, i}
		{#if close}
			<button class={style} on:click={() => (current = 0)}>Close</button>
		{:else if href}
			<a {href} class={style}>{name}</a>
		{:else if next}
			<button class={style} on:click={() => (current = next)}>{name}</button>
		{:else}
			<div class={style}>{content ? content : name}</div>
		{/if}
	{/each}
</div>

<style>
</style>
