<script>
	import { dismissLog, logs } from './toast'
</script>

{#if $logs.length}
	<section>
		{#each $logs as log (log.id)}
			<div class="text {log.type}" on:pointerdown={() => dismissLog(log.id)}>
				{@html log.message}
			</div>
		{/each}
	</section>
{/if}

<style>
	section {
		width: 100%;
		display: flex;
		justify-content: end;
		flex-direction: column;
		padding: 0rem;
	}
	.text {
		font-family: 'Courier New', Courier, monospace;
		font-size: 0.9rem;
		line-height: 1.2;
		margin-bottom: 0.4rem;
		color: var(---sky-400, #38b5ed);
		cursor: no-drop; 
	}
	.error {
		color: #e11d48;
	}
	.success {
		color: #10b981;
	}
	.info {
		color: #0ea5e9;
	}
	.warning {
		color: #fbbf24;
	}
</style>
