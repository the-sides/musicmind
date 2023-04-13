import { redirectToSpotifyLogin } from './hooks/redirectToSpotifyLogin'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // If attempting to login, redirect to 
    if (event.url.pathname.startsWith('/login')) {
        return redirectToSpotifyLogin()
    }
    return resolve(event)
}

