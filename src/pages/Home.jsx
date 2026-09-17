import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '../components/card';

const Home = ({ query }) => {
    const [songs, setSongs] = useState([]);
    
    const getSong = async (query) => {
        if (!query?.trim()) return;
        const response = await axios.get(`https://api.audius.co/v1/search/full?query=${encodeURIComponent(query)}`);
        const data = response.data;
        setSongs(data.data.tracks);
    }

    useEffect(() => {
        getSong(query);
    }, [query])
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
                    name={elem.title}
                    album={elem.user?.name}
                    poster={elem.artwork?.["480x480"]}
                />
            ))}
        </div>
    )
}

export default Home
