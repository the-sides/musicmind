export default (token, callback) => {
    if (token === null) return false;
    return fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(rs => rs.json())
        .then(callback)
        .catch(console.error);
}