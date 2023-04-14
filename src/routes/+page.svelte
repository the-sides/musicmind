<script>
	import { onMount } from 'svelte';
	import fetchPlaylists from '../lib/api/fetchPlaylists.js';

	export let data;
	let dumpElm;
	let token = null;
	onMount(() => {
		// Clear url params
		// TODO adjust param object directly, better way to write probably
		window.history.replaceState('HomePage', 'Music Kit', '/');

		// Always insert new token if loaded from server
		if (data.tokenObj !== null) {
			window.localStorage.setItem('token', JSON.stringify(data.tokenObj));
		}

		// Pull token from localStorage
		const tokenObj = JSON.parse(window.localStorage.getItem('token') ?? '{}');
		// Check expiration
		const expired = tokenObj.expires_at < new Date().getTime();
		if (!expired) {
			// Save if valid
			token = tokenObj.access_token;
			// Test
			fetchPlaylists(token, (data) => {
				dumpElm.innerHTML = JSON.stringify(data.items.map((item) => item.name));
			});
		} else {
			// Nullify if expired
			token = null;
			window.alert('Session timed-out, you must login again because I haven\'t setup refresh tokens yet. Sorry not sorry.')
		}
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
