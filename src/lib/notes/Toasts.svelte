<script>
	import Toast from './Toast.svelte';
	import { dismissToast, toasts } from './toast';
</script>

{#if $toasts.length}
	<section>
		{#each $toasts as toast (toast.id)}
			<Toast
				type={toast.type}
				dismissible={toast.dismissible}
				on:dismiss={() => dismissToast(toast.id)}>{@html toast.message}</Toast
			>
		{/each}
	</section>
{/if}

<svg
	aria-hidden="true"
	style="position: absolute; width: 0; height: 0; overflow: hidden;"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink">
	<defs>
		<symbol id="icon-info" viewBox="0 0 24 24">
			<path
				d="M12 20.016q3.281 0 5.648-2.367t2.367-5.648-2.367-5.648-5.648-2.367-5.648 2.367-2.367 5.648 2.367 5.648 5.648 2.367zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93zM11.016 6.984h1.969v6h-1.969v-6zM11.016 15h1.969v2.016h-1.969v-2.016z" />
		</symbol>
		<symbol id="icon-close" viewBox="0 0 24 24">
			<path
				d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z" />
		</symbol>
		<symbol id="icon-error" viewBox="0 0 24 24">
			<path
				d="M17.016 15.609l-3.609-3.609 3.609-3.609-1.406-1.406-3.609 3.609-3.609-3.609-1.406 1.406 3.609 3.609-3.609 3.609 1.406 1.406 3.609-3.609 3.609 3.609zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93z" />
		</symbol>
		<symbol id="icon-success" viewBox="0 0 24 24">
			<path
				d="M9 16.172l10.594-10.594 1.406 1.406-12 12-5.578-5.578 1.406-1.406z" />
		</symbol>
	</defs>
</svg>

<style>
	section {
		width: 100%;
		position: fixed;
		top: 1rem;
		right: 1rem;
		max-width: 480px;
		display: flex;
		justify-content: end;
		flex-direction: column;
		padding: 0rem;
		gap: 0.4rem;
		z-index: 1000;
	}
</style>
