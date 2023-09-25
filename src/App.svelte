<script>
	import { path } from 'elegua'
	import { sleep } from './lib/util'
	import Battle from './routes/Battle.svelte'
	import Error from './routes/Error.svelte'
	import Loader from './lib/Loader.svelte'
	import Start from './routes/Start.svelte'
	import Toasts from './lib/notes/Toasts.svelte'
	const init = async () => {
		$path = '/'
		await sleep(2400)
		return true
	}
	let promise = init()
</script>

<Toasts />

{#await promise}
	<Loader />
{:then _}
	{#if $path === '/'}
		<Start />
	{:else if $path.includes('/battle')}
		<Battle />
	{:else}
		<Error />
	{/if}
{/await}

<style>
</style>
