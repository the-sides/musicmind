import { PRIVATE_SPOTIFY_AUTH_BASE64 } from '$env/static/private'

export default async (fetch, url) => {
    const code = new URLSearchParams(url.split('?').pop()).get('code');
    const params = {
      code,
      redirect_uri: 'http://localhost:3000',
      grant_type: 'authorization_code',
    }
    const searchParams = Object.keys(params).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');

    return await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${PRIVATE_SPOTIFY_AUTH_BASE64}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: searchParams
    }).then(res => res.json()).catch(console.error)
}