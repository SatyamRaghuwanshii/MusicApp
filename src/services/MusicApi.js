import axios from "axios";

const API = "http://localhost:3000/api";

export const searchAll = async (query) => {
    const response = await axios.get(`${API}/search`, {
        params: { query }
    });

    return response.data.data;
};

export const getSongsByID = async (id) => {
    const response = await axios.get(`${API}/songs`, {
        params: {
            ids: id.join(",")
        }

    });

    return response.data.data;
};

export const getPlaylistById = async (id, limit = 50) => {
    const response = await axios.get(`${API}/playlists`, {
        params: {
            id,
            limit
        }
    });

    return response.data.data;
};

export const trending = async (limit = 50) => {
    const response = await axios.get(
        `${API}/content/trending`, {
        params: {
            limit
        }
    }
    );

    return response.data.data;
};

export const searchSongs = async (query, page = 0, limit = 20) => {
    const response = await axios.get(`${API}/search/songs`, {
        params: {
            query,
            page,
            limit
        }
    });

    return response.data.data;
};

export const searchAlbums = async (query, page = 0, limit = 20) => {
    const response = await axios.get(`${API}/search/albums`, {
        params: {
            query,
            page,
            limit
        }
    });

    return response.data.data;
};

export const searchArtists = async (query, page = 0, limit = 20) => {
    const response = await axios.get(`${API}/search/artists`, {
        params: {
            query,
            page,
            limit
        }
    });

    return response.data.data;
};

export const searchPlaylists = async (query, page = 0, limit = 20) => {
    const response = await axios.get(`${API}/search/playlists`, {
        params: {
            query,
            page,
            limit
        }
    });

    return response.data.data;
};