import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../components/card/card'
import { useSearchParams } from 'react-router-dom'


const Search = ({ onSongClick }) => {

    const [songs, setSongs] = useState([])
    const [searchParams] = useSearchParams()

    const searchQuery = searchParams.get("q")

    useEffect(() => {

        const searchSong = async () => {

            if (!searchQuery?.trim()) return

            try {

                const response = await axios.get(
                    `https://saavn.sumit.co/api/search/songs?query=${encodeURIComponent(searchQuery)}`
                )

                const results = response.data.data.results
                setSongs(results)

            } catch (error) {

                console.error("Search failed:", error)

            }

        }

        searchSong()

    }, [searchQuery])


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
                    onSongClick={() => onSongClick(elem)}
                />

            ))}

        </div>

    )
}

export default Search