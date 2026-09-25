import React, { useState } from 'react'

import {
    IoArrowBack,
    IoSearch,
    IoClose
} from 'react-icons/io5'

import { useNavigate } from 'react-router-dom'


const SearchBar = ({ onSearch }) => {

    const navigate = useNavigate()

    const [searchValue, setSearchValue] = useState("")


    const handleSearch = () => {

        const value = searchValue.trim()

        if (!value) return

        onSearch(value)
    }


    const handleKeyDown = (e) => {

        if (e.key === "Enter") {
            handleSearch()
        }

    }


    const handleBack = () => {

        navigate(-1)

    }


    const handleClear = () => {

        setSearchValue("")

    }


    return (

        <div
            className="
                z-10
                fixed
                top-2.5
                flex
                w-full
                justify-center
                px-4
            "
        >

            <div
                className="
                    relative
                    flex
                    items-center
                    w-[85%]
                    sm:w-[75%]
                    md:w-3/5
                "
            >

                {/* Back Button */}

                <button
                    onClick={handleBack}
                    className="
                        absolute
                        left-3
                        z-10
                        flex
                        items-center
                        justify-center
                        w-9
                        h-9
                        rounded-full
                        text-white/50
                        hover:text-white
                        hover:bg-white/10
                        transition-all
                        duration-200
                    "
                >

                    <IoArrowBack className="text-xl" />

                </button>


                {/* Search Input */}

                <input
                    type="text"
                    value={searchValue}
                    placeholder="Search here"

                    onChange={(e) => {
                        setSearchValue(e.target.value)
                    }}

                    onKeyDown={handleKeyDown}

                    className="
                        h-15
                        w-full
                        rounded-full
                        text-center
                        text-[#f0f8ff]
                        placeholder:text-white/40
                        bg-[#4b4949]/[0.427]
                        backdrop-blur-[15px]
                        border
                        border-b-2
                        border-white/10
                        focus:outline-none
                        focus:border-white/25
                        focus:ring-0
                        transition-colors
                        px-12
                    "
                />


                {/* Search Button */}

                <button
                    onClick={handleSearch}
                    className="
                        absolute
                        right-3
                        flex
                        items-center
                        justify-center
                        w-9
                        h-9
                        rounded-full
                        text-white/50
                        hover:text-white
                        hover:bg-white/10
                        transition-all
                        duration-200
                    "
                >

                    <IoSearch className="text-xl" />

                </button>


                {/* Clear Button */}

                {searchValue && (

                    <button
                        onClick={handleClear}
                        className="
                            absolute
                            right-12
                            flex
                            items-center
                            justify-center
                            w-7
                            h-7
                            rounded-full
                            text-white/40
                            hover:text-white
                            hover:bg-white/10
                            transition-all
                            duration-200
                        "
                    >

                        <IoClose className="text-lg" />

                    </button>

                )}

            </div>

        </div>

    )
}

export default SearchBar