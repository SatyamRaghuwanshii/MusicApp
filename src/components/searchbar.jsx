import React from 'react'

const SearchBar = ({ onSearch }) => {
  return (
    <div className="z-10 fixed top-2.5 flex w-full justify-center px-4">
      <input
        type="text"
        placeholder="search here"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value.trim() !== '') {
            onSearch(e.target.value);
          }
        }}
        className="h-15 w-[85%] sm:w-[75%] md:w-3/5 rounded-full text-center text-[#f0f8ff] placeholder:text-white/40 bg-[#4b4949]/[0.427] backdrop-blur-[15px] border border-b-2 border-white/10 focus:outline-none focus:border-white/25 focus:ring-0 transition-colors px-6"
      />
    </div>
  )
}

export default SearchBar