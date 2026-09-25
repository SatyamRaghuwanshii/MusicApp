import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '../components/card/card';

const Home = ({ }) => {
    const [songs, setSongs] = useState([]);
    
    // const searchSong = async (query) => {
    //     if (!query?.trim()) return;
    //     const response = await axios.get(`https://saavn.sumit.co/api/search/songs?query=${encodeURIComponent(query)}`);
    //     const data = response.data;
    //     setSongs(data.data.results);
    // }

    // useEffect(() => {
    //     searchSong(query);
    // }, [query])
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
            
        </div>
    )
}

export default Home
