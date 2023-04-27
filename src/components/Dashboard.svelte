<script>
	import { fade } from 'svelte/transition';
	import tokenStore from '../lib/tokenStore';
	// import fetchTracks from '../lib/api/fetchTracks';

	export let playlistItems;

	$: selected = playlistItems?.[0] ?? null;
	$: tracks = [];
	tokenStore.subscribe(async (token) => {
        console.log(selected)
		// tracks = (await fetchTracks(token, selected.id)).items;
	});
</script>

<div class="flex w-full max-h-screen px-12 py-24 gap-x-8">
	<div
		class="flex-1 border rounded-md border-light overflow-auto flex flex-col items-start justify-start"
	>
		{#each playlistItems as item}
			<button
				class="w-full px-6 py-3 text-left transition-colors hover:bg-[#6d7189dc] active:bg-[#6d718984]"
				class:!bg-[#6D7189]={selected == item}
				on:click={() => (selected = item)}>{item.name}</button
			>
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
							{#if tracks.length === 0}
								<p class="text-3xl mb-2">loading...</p>
								<span>lol not really</span>
							{:else}
								{#each tracks as track}
									<p>{track.name}</p>
								{/each}
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
