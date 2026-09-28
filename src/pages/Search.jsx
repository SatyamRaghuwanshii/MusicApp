import React, { useEffect, useState } from 'react'
import Card from '../components/card/card'
import { useSearchParams } from 'react-router-dom'
import { getSongsById, searchSongs } from '../services/MusicApi'
import { createRecommendedQueue } from '../services/recommendations'

const Search = ({ onSongClick }) => {
    const [songs, setSongs] = useState([])
    const [searchParams] = useSearchParams()

    const searchQuery = searchParams.get("q")

    useEffect(() => {
        const searchSong = async () => {
            if (!searchQuery?.trim()) return

            try {
                const response = await searchSongs(searchQuery)

                setSongs(response.results)

            } catch (error) {
                console.error("Search failed:", error)
            }
        }

        searchSong()
    }, [searchQuery])


    const handleSearchSongClick = async (item) => {
        try {
            // Get complete song data
            const response = await getSongsById([item.id])

            const song = response?.[0]

            if (!song) return

            // Create recommended queue
            const recommendedQueue =
                await createRecommendedQueue(song)

            console.log("Recommended queue:", recommendedQueue)

            // Send song + queue to Player
            onSongClick(song, recommendedQueue)

        } catch (error) {
            console.error(
                "Failed to play search song:",
                error
            )
        }
    }


    return (
        <div
            className="
                flex-1
                w-full
                max-w-7xl
                mx-auto
                flex
                flex-wrap
                justify-center
                items-center
                gap-4
                sm:gap-8
                md:gap-10
                px-3
                sm:px-6
                py-8
                sm:py-12
                mt-27
            "
        >
            {songs.map((elem) => (
                <Card
                    key={elem.id}
                    name={elem.name}
                    album={elem.album?.name}
                    poster={elem.image?.[2]?.url}
                    onSongClick={() =>
                        handleSearchSongClick(elem)
                    }
                />
            ))}
        </div>
    )
}

export default Search
