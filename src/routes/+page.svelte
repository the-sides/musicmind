<script>
	import { onMount } from 'svelte';

	export let data;
	let dumpElm;
	let token;
	onMount(() => {
		// Clear url params
		// TODO adjust param object directly, better way to write probably
		window.history.replaceState('HomePage', 'Music Kit', '/');
		if (data.tokenObj !== null) {
			window.localStorage.setItem('token', JSON.stringify(data.tokenObj));
		}
		token = JSON.parse(window.localStorage.getItem('token') ?? '{}').access_token;
		const tracks = fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then((rs) => rs.json())
			.then((data) => {
				dumpElm.innerHTML = JSON.stringify(data.items.map((item) => item.name));
			})
			.catch(console.error);
	});
</script>

<div class="absolute top-8 right-8 flex gap-8">
	<p>
		Token: <span class="border-b border-black px-2"> {(token ?? '').substring(0, 8)}</span>
	</p>
	<a class="" href="/login">Login</a>
</div>

<div class="grid min-h-screen place-content-center px-4 mx-auto">
	<h1 class="text-8xl">Music Kit</h1>
	<h2 class="text-4xl my-4">The Spotify app to rule them all.</h2>
	<p bind:this={dumpElm} class="tracks overflow-auto max-w-[700px]" />
</div>
