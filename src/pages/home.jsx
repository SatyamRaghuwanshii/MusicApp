import React, { useEffect, useState } from "react";
import MusicCard from "../components/Home/MusicCard";
import Section from "../components/Home/Section";
import HeroSection from "../components/Home/HeroSection";
import QuickPickCard from "../components/Home/QuickPickCard";
import { getSongsByArtistId, getAlbumById, getPlaylistById, getSongsById, trending } from "../services/MusicApi";


const Home = ({ onSongClick, onQueue }) => {

    const [trendingSection, setTrendingSection] = useState([]);


    useEffect(() => {
        const getTrendingSongs = async () => {
            try {
                const response = await trending();
                console.log("Now Trending", response);

                setTrendingSection(response)

            } catch (err) {
                console.error("Failed to get trending songs", err);
            }
        };

        getTrendingSongs();
    }, []);

    const handleTrendingClick = async (item) => {
        try {
            if (item.type === "song") {
                const response = await getSongsById([item.id]);

                const song = response?.[0];

                const getArtistIds = (song) => {
                    const primaryArtists = song.artists?.primary || [];
                    const featuredArtists = song.artists?.featured || [];

                    const artists = [
                        ...primaryArtists,
                        ...featuredArtists
                    ];

                    return [...new Set(
                        artists.map(artist => artist.id)
                    )];
                };

                const createRecommendedQueue = async (song) => {
                    const artistIds = getArtistIds(song);

                    if (!artistIds.length) {
                        return [song];
                    }

                    const responses = await Promise.all(
                        artistIds.map(id => getSongsByArtistId(id))
                    );

                    console.log("Responses:", responses);

                    // Combine songs from all artists
                    const artistSongs = responses.flatMap(response => response.songs);

                    console.log("Artist songs:", artistSongs);

                    // Remove currently playing song
                    const filteredSongs = artistSongs.filter(
                        item => item.id !== song.id
                    );

                    console.log("Filtered songs:", filteredSongs);

                    // Remove duplicate songs
                    const uniqueSongs = [
                        ...new Map(
                            filteredSongs.map(item => [item.id, item])
                        ).values()
                    ];

                    console.log("Unique songs:", uniqueSongs);

                    return [
                        song,
                        ...uniqueSongs
                    ];
                };

                const recommendedQueue = await createRecommendedQueue(song);

                if (!song) return;

                onSongClick(song, recommendedQueue);
            }

            if (item.type === "playlist") {
                const playlist = await getPlaylistById(item.id);

                const songs = playlist?.songs || [];

                if (!songs.length) return;
                onQueue(songs)
                onSongClick(songs[0], songs);
            }

            if (item.type === "album") {
                const album = await getAlbumById(item.id);
                console.log(album)
                const songs = album?.songs || [];

                if (!songs.length) return;
                onQueue(songs)
                onSongClick(songs[0], songs);
            }

        } catch (err) {
            console.error("Failed to play trending item:", err);
        }
    };

    const quickPicks = [
        {
            id: "1",
            name: "Boyfriend",
            album: "P-POP CULTURE",
            image: [
                { url: "/src/assets/DhurandharPoster.jpg" },
                { url: "/src/assets/DhurandharPoster.jpg" },
                { url: "/src/assets/DhurandharPoster.jpg" }
            ]
        },
        {
            id: "2",
            name: "For A Reason",
            album: "P-POP CULTURE",
            image: [
                { url: "/src/assets/DhurandharPoster.jpg" },
                { url: "/src/assets/DhurandharPoster.jpg" },
                { url: "/src/assets/DhurandharPoster.jpg" }
            ]
        }
    ];


    return (
        <main
            className="
                flex
                flex-col
                gap-10
                w-full
                max-w-7xl
                mx-auto
                px-3
                sm:px-6
                py-8
                mt-27
                pb-32
            "
        >

            <HeroSection
                onPlay={() => {
                    if (quickPicks.length > 0) {
                        onSongClick?.(quickPicks[0]);
                    }
                }}
            />

            <Section title="Quick Picks">
                {quickPicks.map((song) => (
                    <QuickPickCard
                        key={song.id}
                        song={song}
                        onClick={() => onSongClick?.(song)}
                    />
                ))}
            </Section>


            <Section title="Trending Now">
                {trendingSection.map((item) => (
                    <MusicCard
                        key={item.id}
                        name={item.title}
                        album={item.type}
                        poster={item.image}
                        onSongClick={() => { handleTrendingClick(item) }}
                    />
                ))}
            </Section>

        </main>
    );
};

export default Home;