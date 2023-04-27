export default (token, playlist_id, callback) => {
    return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(rs => rs.json())
        .then(callback)
        .catch(console.error);
}