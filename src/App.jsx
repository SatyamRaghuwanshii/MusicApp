import React, { useEffect, useState } from 'react'
import Card from './components/card.jsx'
import NowBar from './components/nowbar.jsx'
import SearchBar from './components/searchbar.jsx'
import background from './assets/background.jpg'
import Footer from './components/Footer.jsx'
import PageNav from './components/pageNav.jsx'
import Local from './pages/local.jsx'
import axios from 'axios'


const App = ({ onSearch }) => {
  
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("")

  const getSong = async (query)=>{
    if(!query?.trim()) return;
    const response = await axios.get(`https://saavn.sumit.co/api/search/songs?query=${encodeURIComponent(query)}`);
    const data = response.data;
    setSongs(data.data.results);
  }
  
  useEffect(() => {
    getSong();
  }, [])
  

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between text-white overflow-y-hidden">

      {/* 1. Global Background */}
      <img
        className="fixed inset-0 -z-10 h-full w-full object-cover blur-md pointer-events-none"
        src={background}
        alt="background"
      />

      {/* 2. Top Search Header */}
      <header className="fixed top-10 w-full pt-6 pb-2 z-20">
        <SearchBar onSearch={getSong}/>
        <nav className="w-full flex justify-center py-6">
        <PageNav />
        </nav>
      </header>

      {/* 3. Cards Grid */}
      <main
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
            album={elem.album.name}
            poster={elem.image[2].url}
          />
        ))}
      </main>

      <main
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
        "
      >
        <Local/>
      </main>

      {/* 4. Footer at normal document flow bottom */}
      <Footer />


      {/* 5. Fixed Playback Bar */}
      <div className="fixed bottom-3 inset-x-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto w-full flex justify-center">
          <NowBar />
        </div>
      </div>

    </div>
  )
}

export default App