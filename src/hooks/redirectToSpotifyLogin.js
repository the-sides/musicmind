import { PUBLIC_DOMAIN } from '$env/static/public'

export const redirectToSpotifyLogin = () => {
    const url = 'https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
            response_type: 'code',
            client_id: 'aeac846f34e241ee810c4729a53e4926',
            scope: '',
            redirect_uri: PUBLIC_DOMAIN,
            state: '1234'
        }).toString()

    const response = new Response('Redirect', {
        status: 307,
        headers: {
            Location: url
        }
    });
    return response;
}