import React, { use, useEffect, useState } from 'react'
import Card from '../components/card'
import { FiUpload, FiMusic } from "react-icons/fi";
import SongForm from '../components/songForm';
import SearchBar from '../components/searchbar';

const local = () => {
    const [isVisible, setisVisible] = useState(false)
    const [songs, setSongs] = useState(() => {
        const savedSongs = localStorage.getItem("songs");
        return savedSongs ? JSON.parse(savedSongs) : [];
    });


    useEffect(() => {
        localStorage.setItem("songs", JSON.stringify(songs));
    }, [songs]);

    const HandleAddSongs = (song) => {
        console.log(song, "recieved")
        setSongs((prevSongs) => [
            ...prevSongs,
            song
        ]);
        setisVisible(false)
    }


    return (

        <>
            <div
                onClick={() => {
                    setisVisible(true)
                }}
                className="
                    group relative flex flex-col items-center justify-center
                    w-[280px]
                    sm:w-[300px]
                    h-[400px]
                    p-[7px]
                    cursor-pointer
                    rounded-[20px]
                    bg-[#4b4949]/[0.427]
                    backdrop-blur-[15px]
                    border border-b-2 border-white/10
                    select-none
                    transition-all duration-300 ease-out
                    hover:bg-[#4b4949]/[0.55]
                    hover:border-white/20
                    hover:scale-[1.02]
                "
            >
                {/* Upload Icon */}
                <div
                    className="
                    flex items-center justify-center
                    w-20 h-20
                    rounded-full
                    border border-white/20
                    bg-white/[0.06]
                    text-white/60
                    transition-all duration-300
                    group-hover:bg-white/10
                    group-hover:text-white
                    group-hover:scale-105
                    "
                >
                    <FiUpload
                        className="
                        text-3xl
                        transition-transform duration-300
                        group-hover:-translate-y-1
                    "
                    />
                </div>

                {/* Title */}
                <h2
                    className="
                    mt-7
                    text-xl
                    font-semibold
                    text-white/90
                    "
                >
                    Add Local Song
                </h2>

                {/* Description */}
                <p
                    className="
                    mt-2
                    text-sm
                    text-white/40
                    text-center
                    "
                >
                    Add music from your device
                </p>

                {/* Supported Formats */}
                <div
                    className="
                    flex items-center gap-2
                    mt-5
                    text-xs
                    text-white/30
                    "
                >
                    <FiMusic className="text-sm" />
                    <span>MP3 · WAV · FLAC</span>
                </div>



            </div>
            {isVisible && <div className="absolute z-60">
                <SongForm onAddSong={HandleAddSongs} />
            </div>
            }

            {songs.map((elem, idx) => (
                <Card
                    key={idx}
                    name={elem.title}
                    album={elem.album}
                    poster={elem.cover}
                />
            ))}
        </>
    )
}

export default local
