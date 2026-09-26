import React, { useState } from 'react'

import NowBar from './components/Player/nowbar.jsx'
import SearchBar from './components/Search/searchbar.jsx'
import background from './assets/background.jpg'
import Footer from './components/Others/Footer.jsx'
import PageNav from './components/Navigation/pageNav.jsx'
import Local from './pages/local.jsx'

import { Route, Routes, useNavigate } from 'react-router-dom'

import Search from './pages/search.jsx'
import Home from './pages/Home.jsx'


const App = () => {

    const navigate = useNavigate()

    const [currentSong, setCurrentSong] = useState(null)

    const handleSearch = (value) => {

        if (!value?.trim()) return

        navigate(`/search?q=${encodeURIComponent(value.trim())}`)
    }

    return (
        <div className="relative min-h-screen w-full flex flex-col justify-between text-white overflow-y-hidden">

            {/* Global Background */}
            <img
                className="fixed inset-0 z-0 h-full w-full object-cover blur-md pointer-events-none"
                src={background}
                alt="background"
            />

            {/* Top Search Header */}
            <header className="fixed top-10 w-full pt-6 pb-2 z-20">

                <SearchBar onSearch={handleSearch} />

                <nav className="w-full flex justify-center py-6">
                    <PageNav />
                </nav>

            </header>


            {/* Pages */}
            <Routes>

                <Route
                    path="/"
                    element={<Home onSongClick={setCurrentSong}/>}
                />

                <Route
                    path="/search"
                    element={
                        <Search
                            onSongClick={setCurrentSong}
                        />
                    }
                />

                <Route
                    path="/local"
                    element={<Local />}
                />

            </Routes>


            {/* Footer */}
            <Footer />


            {/* Player */}
            <div className="fixed bottom-3 inset-x-0 z-50 flex justify-center pointer-events-none">

                <div className="pointer-events-auto w-full flex justify-center">

                    <NowBar
                        song={currentSong}
                    />

                </div>

            </div>

        </div>
    )
}

export default App