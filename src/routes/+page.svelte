<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import fetchPlaylists from '../lib/api/fetchPlaylists.js';

	export let data;
	let dumpElm;
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

<nav class="fixed z-40 py-8 px-12 top-0 flex w-full gap-8">
	<p class="text-3xl font-bold">MusicMind</p>
	<p class="ml-auto">
		Token: <span class="border-b border-light px-2"> {(token ?? '').substring(0, 8)}</span>
	</p>
	<a class="" href="/login">Login</a>
</nav>

{#if !loaded}
	<div
		transition:fade
		class="absolute pointer-events-none title-card grid min-h-screen w-full place-content-center px-4 mx-auto"
	>
		<h1 class="text-8xl">Music Kit</h1>
		<h2 class="text-4xl my-4">The Spotify app to rule them all.</h2>
	</div>
{/if}

<div class="bg fixed -z-10 inset-0 h-full w-full" />

<section class:opacity-0={!loaded} class="transition-opacity delay-300 duration-500">
	<div class="flex w-full h-full px-12 py-24 gap-x-8">
		<div class="flex-1 border rounded-md border-light p-6">
			{#each playlistItems as item}
				<button class="block" on:click={() => (selected = item)}>{item.name}</button>
			{/each}
		</div>
		<div class="flex-[2] border rounded-md border-light p-12">
			{#if selected}
				<div transition:fade class="">
					<header class="flex items-end gap-x-6">
						<img class="h-48" src={selected.images[0].url} alt="" />
						<h1 class="text-6xl">{selected.name}</h1>
					</header>
					<div class="mt-24">
						<div class="tracks">
							<div class="grid justify-items-center">
							<p class="text-3xl mb-2">loading...</p>
							<span>lol not really</span>

							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>
