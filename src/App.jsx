import React, { useEffect, useState } from 'react'
import NowBar from './components/nowbar.jsx'
import SearchBar from './components/searchbar.jsx'
import background from './assets/background.jpg'
import Footer from './components/Footer.jsx'
import PageNav from './components/pageNav.jsx'
import Local from './pages/Local.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'


const App = ({ onSearch }) => {

  const [query, setQuery] = useState("")

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
        <SearchBar onSearch={setQuery} />
        <nav className="w-full flex justify-center py-6">
          <PageNav />
        </nav>
      </header>
      {/* 3. Cards Grid */}
      <Routes>
        <Route path="/" element={<Home query={query} />} />
        <Route path="/local" element={<Local />} />
      </Routes>

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