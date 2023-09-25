<script>
	import Dialog from './Dialog.svelte';
	
	function onText() {
		const d = new Dialog({
			target: document.body,
			props: { text: 'Hello world' },
		});
		d.$on('close', () => d.$destroy());
	}
	function onHtml() {
		const d = new Dialog({
			target: document.body,
			props: { html: '<input placeholder="Text here"/>' },
		});
		d.$on('close', () => d.$destroy());
	}

</script>

<button on:click={onText}>Text</button>
<button on:click={onHtml}>HTML</button>