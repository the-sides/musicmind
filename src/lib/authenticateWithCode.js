import { PRIVATE_SPOTIFY_AUTH_BASE64 } from '$env/static/private'
import { PUBLIC_DOMAIN } from '$env/static/public'

export default async (fetch, code) => {
    const params = {
      code,
      redirect_uri: PUBLIC_DOMAIN, 
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
    }).then(res => res.json())
    .then(
      // Clean up for browser to use
      data => {
        data.expires_at = (new Date().getTime() + (data.expires_in * 1000))
        return data;
      }
    )
    .catch(console.error)
}