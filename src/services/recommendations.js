// recommendations.js

import { getSongsByArtistId } from "./MusicApi";

export const getArtistIds = (song) => {
    const primaryIds =
        song?.artists?.primary?.map(artist => artist.id) || [];

    const featuredIds =
        song?.artists?.featured?.map(artist => artist.id) || [];

    return [...new Set([...primaryIds, ...featuredIds])];
};

export const createRecommendedQueue = async (song) => {
    const artistIds = getArtistIds(song);

    if (!artistIds.length) {
        return [song];
    }

    const responses = await Promise.all(
        artistIds.map(id => getSongsByArtistId(id))
    );

    // [{total, songs: [...]}, {total, songs: [...]}]
    //          ↓
    // extract all songs
    const artistSongs = responses.flatMap(
        response => response.songs || []
    );

    // Remove currently playing song
    const filteredSongs = artistSongs.filter(
        item => item.id !== song.id
    );

    // Remove duplicates
    const uniqueSongs = [
        ...new Map(
            filteredSongs.map(item => [item.id, item])
        ).values()
    ];

    return [
        song,
        ...uniqueSongs
    ];
};