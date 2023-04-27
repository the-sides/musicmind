<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import fetchPlaylists from '../lib/api/fetchPlaylists.js';
	import Nav from '../components/Nav.svelte';
	import Dashboard from '../components/Dashboard.svelte';
	import tokenStore from '../lib/tokenStore.js';

	export let data;

	let token = null;
	$: loaded = false;
	$: selected = null;
	$: playlistItems = [];
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
			tokenStore.set(token)
			// Test
			fetchPlaylists(token, (data) => {
				// dumpElm.innerHTML = JSON.stringify(data.items.map((item) => item.name));
				console.log(data);
				playlistItems = data.items;
				if (data.items) loaded = true;
			});
		} else {
			// Nullify if expired
			token = null;
			window.alert(
				"Session timed-out, you must login again because I haven't setup refresh tokens yet. Sorry not sorry."
			);
		}
	});
</script>

<Nav/>

{#if !loaded}
	<div
		transition:fade
		class="absolute pointer-events-none title-card grid min-h-screen w-full place-content-center px-4 mx-auto"
	>
		<h1 class="text-8xl">Music Kit</h1>
		<h2 class="text-4xl my-4">The Spotify app to rule them all.</h2>
	</div>
{/if}

<!-- Main View -->
<section class:opacity-0={!loaded} class="transition-opacity delay-300 duration-500">
	<Dashboard {playlistItems}/>
</section>
