import React, { useEffect, useState } from 'react'

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
    const [queue, setQueue] = useState([]);
    const [currentSong, setCurrentSong] = useState(null)
    const [showHeader, setShowHeader] = useState(true);

    const playSong = (song, newQueue = []) => {
        setQueue(newQueue);
        setCurrentSong(song);
    };


    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY < 50) {
                setShowHeader(true);
            }
            else if (currentScrollY > lastScrollY + 5) {
                setShowHeader(false);
            }
            else if (currentScrollY < lastScrollY - 5) {
                setShowHeader(true);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

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
            <header className={`
                fixed w-full pt-6 pb-2 z-20
                transition-transform duration-300 ease-in-out
                ${showHeader ? "translate-y-0" : "-translate-y-[180%]"}
            `}>

                <SearchBar onSearch={handleSearch} />

                <nav className="w-full flex justify-center py-14">
                    <PageNav />
                </nav>

            </header>


            {/* Pages */}
            <Routes>

                <Route
                    path="/"
                    element={<Home onSongClick={playSong} onQueue={setQueue} />}
                />

                <Route
                    path="/search"
                    element={
                        <Search
                            onSongClick={playSong}
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
                        song={currentSong} queue={queue} currentSong={currentSong} setCurrentSong={setCurrentSong}
                    />

                </div>

            </div>

        </div>
    )
}

export default App