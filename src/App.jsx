import React from 'react'
import Card from './components/card.jsx'
import NowBar from './components/nowbar.jsx'
import SearchBar from './components/searchbar.jsx'
import background from './assets/background.jpg'
import Footer from './components/Footer.jsx'
import PageNav from './components/pageNav.jsx'
import Local from './pages/local.jsx'


const App = () => {
  const songs = [
    { name: "Blinding Lights", album: "After Hours", cover: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png" },
    { name: "Starboy", album: "Starboy", cover: "https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png" },
    { name: "Shape of You", album: "Divide", cover: "https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png" },
    { name: "Levitating", album: "Future Nostalgia", cover: "https://upload.wikimedia.org/wikipedia/en/f/f5/Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png" },
    { name: "Peaches", album: "Justice", cover: "https://upload.wikimedia.org/wikipedia/en/0/08/Justin_Bieber_-_Justice.png" },
    { name: "As It Was", album: "Harry's House", cover: "https://upload.wikimedia.org/wikipedia/en/f/ff/Harry_Styles_-_As_It_Was.png" },
    { name: "Believer", album: "Evolve", cover: "https://upload.wikimedia.org/wikipedia/en/5/5c/Imagine-Dragons-Believer-art.jpg" },
    { name: "Happier Than Ever", album: "Happier Than Ever", cover: "https://upload.wikimedia.org/wikipedia/en/9/9a/Billie_Eilish_-_Happier_Than_Ever_%28song%29.png" },
    { name: "Stay", album: "Stay", cover: "https://upload.wikimedia.org/wikipedia/en/0/0c/The_Kid_Laroi_and_Justin_Bieber_-_Stay.png" },
    { name: "Senorita", album: "Romance", cover: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Shawn_Mendes_and_Camila_Cabello_-_Se%C3%B1orita.png" },
    { name: "Blinding Lights", album: "After Hours", cover: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png" },
    { name: "Starboy", album: "Starboy", cover: "https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png" },
    { name: "Shape of You", album: "Divide", cover: "https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png" },
    { name: "Levitating", album: "Future Nostalgia", cover: "https://upload.wikimedia.org/wikipedia/en/f/f5/Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png" },
    { name: "Peaches", album: "Justice", cover: "https://upload.wikimedia.org/wikipedia/en/0/08/Justin_Bieber_-_Justice.png" },
    { name: "As It Was", album: "Harry's House", cover: "https://upload.wikimedia.org/wikipedia/en/f/ff/Harry_Styles_-_As_It_Was.png" },
    { name: "Believer", album: "Evolve", cover: "https://upload.wikimedia.org/wikipedia/en/5/5c/Imagine-Dragons-Believer-art.jpg" },
    { name: "Happier Than Ever", album: "Happier Than Ever", cover: "https://upload.wikimedia.org/wikipedia/en/9/9a/Billie_Eilish_-_Happier_Than_Ever_%28song%29.png" },
    { name: "Stay", album: "Stay", cover: "https://upload.wikimedia.org/wikipedia/en/0/0c/The_Kid_Laroi_and_Justin_Bieber_-_Stay.png" },
    { name: "Senorita", album: "Romance", cover: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Shawn_Mendes_and_Camila_Cabello_-_Se%C3%B1orita.png" }
  ];

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
        <SearchBar />
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
        {songs.map((elem, idx) => (
          <Card
            key={idx}
            name={elem.name}
            album={elem.album}
            poster={elem.cover}
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