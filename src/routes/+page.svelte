<script>
	export let data;

	// But first, convert to TS
	// // Store
	// const accessToken = data.token;
	// // const token = writable()
	// localStorage.setItem('access_token', accessToken);
</script>

<div class="absolute top-8 right-8 flex gap-8">
	<p>
		Token: <span class="border-b border-black px-2">
			{data.token?.access_token?.substring(0, 8)}</span
		>
	</p>
	<a class="" href="/login">Login</a>
</div>

<div class="grid h-screen place-content-center text-8xl">
	<h1>Music Mind</h1>
	<h2 class="text-4xl my-4">The Spotify app to rule them all.</h2>
</div>
