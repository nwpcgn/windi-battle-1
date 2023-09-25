<script>
	import Layer from '../lib/Layer.svelte'
	export let nav = [
		{
			href: '/',
			name: 'Start'
		}
	]
</script>

<Layer>
	<div class="m-auto">
		<h1 class="text-4xl font-bold">Start</h1>
		<div id="guy"></div>
	</div>
</Layer>


<style>
	#guy {
  --bg-url: url(https://i.imgur.com/W4Y4RpQ.png);
  --w: 65px;
  --h: 90px;
  --end: -715px;
  width: 65px;
  height: 90px;
  background: var(--bg-url);
   
}

#guy:hover {
    /* animation: animGuy 0.8s steps(11) forwards; */
	 animation: animGuy 0.8s steps(11) infinite;
}

@keyframes animGuy {
   0%{ background-position-x:0 ; }
   100% { background-position-x: var(--end); }
}
</style>
