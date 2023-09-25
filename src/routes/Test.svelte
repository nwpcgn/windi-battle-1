<script>
	let dark = false
</script>

<article class="page p-4">
	<section>
		<div class="flex gap-2">


			<label for="dark">
				<input class="sr-only" type="checkbox" bind:checked={dark} id="dark" />
				<span class="btn btn-primary">{dark ? 'RDark' : 'Light'}</span>
			</label>
		</div>
	</section>
	<section>
		<header class="divide-y">
			<h2 id="Typography">Typography</h2>
			<h1>Level 1 Heading</h1>
			<p>
				Pellentesque habitant morbi tristique senectus et netus et malesuada
				fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
				ultricies eget, tempor sit amet, ante.
			</p>
			<h2>Level 2 Heading</h2>
			<p>
				Pellentesque habitant morbi tristique senectus et netus et malesuada
				fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
				ultricies eget, tempor sit amet, ante.
			</p>
			<h3>Level 3 Heading</h3>
			<p>
				Pellentesque habitant morbi tristique senectus et netus et malesuada
				fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
				ultricies eget, tempor sit amet, ante.
			</p>
			<h4>Level 4 Heading</h4>
			<h5>Level 5 Heading</h5>
			<h6>Level 6 Heading</h6>
		</header>
	</section>
</article>

<style>
	:root {
		--global-font-size: 15px;
		--global-line-height: 1.4em;
		--font-stack: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
			sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
		--input-style: solid;
	}

</style>
