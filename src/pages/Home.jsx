import React, { useEffect, useState } from "react";
import MusicCard from "../components/Home/MusicCard";
import Section from "../components/Home/Section";
import HeroSection from "../components/Home/HeroSection";
import QuickPickCard from "../components/Home/QuickPickCard";
import { getPlaylistById, trending } from "../services/MusicApi";


const Home = ({ onSongClick }) => {

    const [trendingSongs, setTrendingSongs] = useState([]);

    useEffect(() => {
        const getTrendingSongs = async () => {
            try {
                // Get trending playlists
                const response = await trending();

                // Find "Now Trending"
                const nowTrending = response?.find(
                    item => item.title === "Now Trending"
                );

                if (!nowTrending) {
                    console.log("Now Trending playlist not found");
                    return;
                }

                // Get songs from playlist
                const playlist = await getPlaylistById(nowTrending.id);

                console.log("Now Trending songs:", playlist);

                setTrendingSongs(playlist?.songs || []);

            } catch (err) {
                console.error("Failed to get trending songs", err);
            }
        };

        getTrendingSongs();
    }, []);

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
                {trendingSongs.map((item) => (
                    <MusicCard
                        key={item.id}
                        name={item.name}
                        album={item.album?.name}
                        poster={item.image?.[2]?.url}
                        onSongClick={() => onSongClick?.(item)}
                    />
                ))}
            </Section>

        </main>
    );
};

export default Home;