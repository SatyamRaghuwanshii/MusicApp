import React, { useEffect, useState } from 'react'
import {
    IoChevronDown,
    IoHeart,
    IoPlayBack,
    IoPlay,
    IoPause,
    IoPlayForward,
    IoList,
    IoMusicalNotes,
} from 'react-icons/io5'
import { BsThreeDotsVertical } from 'react-icons/bs'

const ExpandedPlayer = ({
    song,
    progress,
    audioRef,
    isPlaying,
    setIsPlaying,
    setIsExpanded
}) => {

    const [activeSection, setActiveSection] = useState(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [hoverProgress, setHoverProgress] = useState(null)

    const handleSeekHover = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()

        const mouseX = e.clientX - rect.left

        const percentage = (mouseX / rect.width) * 100

        setHoverProgress(Math.max(0, Math.min(100, percentage)))
    }

    const handleSeekLeave = () => {
        setHoverProgress(null)
    }

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const updateTime = () => {
            setCurrentTime(audio.currentTime)
        }

        audio.addEventListener("timeupdate", updateTime)

        return () => {
            audio.removeEventListener("timeupdate", updateTime)
        }
    }, [audioRef])

    useEffect(() => {
        requestAnimationFrame(() => {
            setIsAnimating(true)
        })
    }, [])

    const handleClose = () => {
        setIsAnimating(false)

        setTimeout(() => {
            setIsExpanded(true)
        }, 350)
    }

    // -------------------------
    // PLAY / PAUSE
    // -------------------------

    const handlePlayPause = () => {

        if (!audioRef.current) return

        if (audioRef.current.paused) {
            audioRef.current.play()
            setIsPlaying(true)
        } else {
            audioRef.current.pause()
            setIsPlaying(false)
        }
    }

    // -------------------------
    // SEEK
    // -------------------------

    const handleSeek = (e) => {

        if (!audioRef.current) return

        const rect = e.currentTarget.getBoundingClientRect()

        const clickX = e.clientX - rect.left

        const percentage = clickX / rect.width

        if (!audioRef.current.duration) return

        audioRef.current.currentTime =
            audioRef.current.duration * percentage
    }

    // -------------------------
    // OPEN QUEUE / LYRICS
    // -------------------------

    const openSection = (section) => {
        setActiveSection(section)
    }

    // -------------------------
    // CLOSE QUEUE / LYRICS
    // -------------------------

    const closeSection = () => {
        setActiveSection(null)
    }

    return (

        <div
            className="
                fixed
                inset-0
                z-[100]

                flex
                justify-center
                items-end

                pointer-events-none
            "
        >

            {/* ================================================= */}
            {/* EXPANDED PLAYER */}
            {/* ================================================= */}

            <div
                className={`
                    relative
                    pointer-events-auto
                    overflow-hidden
                    bottom-2
                    origin-bottom

                    border
                    border-white/10

                    bg-black/50
                    backdrop-blur-[25px]

                    shadow-2xl

                    transition-all
                    duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    ${isAnimating
                        ? `
                                w-full
                                sm:w-full
                                lg:w-[48%]

                                h-screen
                                sm:h-screen
                                lg:h-[85vh]
                                opacity-100
                                rounded-none
                                sm:rounded-none
                                lg:rounded-[30px]
                            `
                        : `
                                w-[45%]
                                sm:w-[38%]
                                lg:w-[35%]

                                h-[60px]
                                opacity-50
                                rounded-[15px]
                            `
                    }
                `}
            >

                {/* ================================================= */}
                {/* BACKGROUND */}
                {/* ================================================= */}

                <img
                    src={song?.image?.[0]?.url}
                    alt=""
                    className="
                        absolute
                        inset-0

                        w-full
                        h-full

                        object-cover

                        scale-125
                        blur-[40px]

                        pointer-events-none
                    "
                />

                <div
                    className="
                        absolute
                        inset-0
                        bg-black/50
                        pointer-events-none
                    "
                />


                {/* ================================================= */}
                {/* MAIN CONTENT */}
                {/* ================================================= */}

                <div
                    className="
                        relative
                        z-10

                        flex
                        flex-col

                        h-full

                        px-5
                        sm:px-8
                        lg:px-10

                        py-5
                        sm:py-7
                        lg:py-5

                        overflow-hidden
                    "
                >

                    {/* ================================================= */}
                    {/* TOP BAR */}
                    {/* ================================================= */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            h-4
                            pt-3

                            shrink-0
                        "
                    >

                        <button
                            onClick={handleClose}
                            className="
                                flex
                                items-center
                                justify-center

                                w-10
                                h-10

                                rounded-full

                                text-white/60

                                hover:text-white
                                hover:bg-white/10

                                transition-all
                            "
                        >
                            <IoChevronDown className="text-2xl" />
                        </button>


                        <button
                            className="
                                flex
                                items-center
                                justify-center

                                w-10
                                h-10

                                rounded-full

                                text-white/50

                                hover:text-white
                                hover:bg-white/10

                                transition-all
                            "
                        >
                            <BsThreeDotsVertical className="text-xl" />
                        </button>

                    </div>


                    {/* ================================================= */}
                    {/* ALBUM ART */}
                    {/* ================================================= */}

                    <div
                        className="
                            flex
                            justify-center

                            mt-4
                            sm:mt-6

                            shrink-0
                        "
                    >

                        <img
                            src={song?.image?.[2]?.url}
                            alt="Album"
                            className="
                                w-[52vw]
                                h-[52vw]

                                max-w-[280px]
                                max-h-[280px]

                                sm:w-60
                                sm:h-60

                                lg:w-64
                                lg:h-64

                                object-cover

                                rounded-[18px]

                                shadow-2xl
                            "
                        />

                    </div>


                    {/* ================================================= */}
                    {/* SONG INFO */}
                    {/* ================================================= */}

                    <div
                        className="
                            mt-5
                            shrink-0
                        "
                    >

                        <h2
                            className="
                                text-center

                                text-xl
                                sm:text-2xl

                                font-semibold

                                text-white

                                truncate
                            "
                        >
                            {song?.name}
                        </h2>

                        <p
                            className="
                                text-center

                                text-sm

                                text-white/50

                                mt-1

                                truncate
                            "
                        >
                            {song?.album?.name}
                        </p>

                    </div>


                    {/* ================================================= */}
                    {/* LIKE */}
                    {/* ================================================= */}

                    <div
                        className="
                            flex
                            justify-between
                            items-center

                            mt-4

                            shrink-0
                        "
                    >

                        <IoHeart
                            className="
                                text-2xl

                                text-white/50

                                cursor-pointer

                                hover:text-white

                                transition-colors
                            "
                        />

                        <span
                            className="
                                text-xs
                                text-white/30
                            "
                        >
                            Now Playing
                        </span>

                    </div>


                    {/* ================================================= */}
                    {/* PROGRESS */}
                    {/* ================================================= */}

                    <div className="mt-5 shrink-0">

                        <div
                            onClick={handleSeek}
                            onMouseMove={handleSeekHover}
                            onMouseLeave={handleSeekLeave}
                            className="
                                relative
                                w-full
                                h-[5px]
                                rounded-full
                                bg-white/20
                                cursor-pointer
                            "
                        >

                            <div
                                style={{
                                    width: `${progress || 0}%`
                                }}
                                className="
                                    h-full

                                    rounded-full

                                    bg-white
                                "
                            />
                            {hoverProgress !== null && (
                                <div
                                    style={{
                                        width: `${hoverProgress}%`
                                    }}
                                    className="
                                    absolute
                                    left-0
                                    top-0
                                    h-full
                                    rounded-full
                                    bg-white/40
                                    pointer-events-none
                                    
                                "
                                />
                            )}

                        </div>

                        {/* TIME */}

                        <div
                            className="
                                flex
                                justify-between

                                mt-2

                                text-[10px]
                                sm:text-xs

                                text-white/40
                            "
                        >

                            <span>
                                {`${Math.floor(currentTime / 60)}:${String(
                                    Math.floor(currentTime % 60)
                                ).padStart(2, "0")}`}
                            </span>

                            <span>
                                {audioRef.current?.duration
                                    ? `${Math.floor(audioRef.current.duration / 60)}:${String(
                                        Math.floor(audioRef.current.duration % 60)
                                    ).padStart(2, '0')}`
                                    : "0:00"
                                }
                            </span>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* CONTROLS */}
                    {/* ================================================= */}

                    <div
                        className="
                            flex
                            items-center
                            justify-center

                            gap-10

                            mt-6

                            shrink-0
                        "
                    >

                        <IoPlayBack
                            className="
                                text-2xl
                                text-white/60

                                cursor-pointer

                                hover:text-white

                                transition-colors
                            "
                        />


                        <button
                            onClick={handlePlayPause}
                            className="
                                flex
                                items-center
                                justify-center

                                w-14
                                h-14

                                rounded-full

                                bg-white

                                text-black

                                hover:scale-105

                                transition-transform
                            "
                        >

                            {isPlaying ? (
                                <IoPause className="text-2xl" />
                            ) : (
                                <IoPlay className="text-2xl ml-1" />
                            )}

                        </button>


                        <IoPlayForward
                            className="
                                text-2xl
                                text-white/60

                                cursor-pointer

                                hover:text-white

                                transition-colors
                            "
                        />

                    </div>


                    {/* ================================================= */}
                    {/* QUEUE / LYRICS ICONS */}
                    {/* ================================================= */}

                    <div
                        className="
                            flex
                            items-center
                            justify-center

                            gap-10

                            mt-auto
                            pb-2

                            shrink-0
                        "
                    >

                        {/* QUEUE */}

                        <button
                            onClick={() => openSection("queue")}
                            className="
                                flex
                                items-center
                                justify-center

                                w-11
                                h-11

                                rounded-full

                                text-white/50

                                hover:text-white
                                hover:bg-white/10

                                transition-all
                            "
                        >

                            <IoList className="text-2xl" />

                        </button>


                        {/* LYRICS */}

                        <button
                            onClick={() => openSection("lyrics")}
                            className="
                                flex
                                items-center
                                justify-center

                                w-11
                                h-11

                                rounded-full

                                text-white/50

                                hover:text-white
                                hover:bg-white/10

                                transition-all
                            "
                        >

                            <IoMusicalNotes className="text-2xl" />

                        </button>

                    </div>

                </div>


                {/* ================================================= */}
                {/* QUEUE / LYRICS SLIDE SECTION */}
                {/* ================================================= */}

                <div
                    className={`
                        absolute
                        inset-0
                        z-30

                        bg-black/80
                        backdrop-blur-[30px]

                        transition-transform
                        duration-300
                        ease-out

                        ${activeSection
                            ? "translate-x-0"
                            : "translate-x-full"
                        }
                    `}
                >

                    <div
                        className="
                            flex
                            flex-col

                            h-full

                            px-5
                            sm:px-8
                            lg:px-10

                            py-5
                        "
                    >

                        {/* ================================================= */}
                        {/* SECTION HEADER */}
                        {/* ================================================= */}

                        <div
                            className="
                                flex
                                items-center
                                justify-between

                                shrink-0
                            "
                        >

                            <button
                                onClick={closeSection}
                                className="
                                    flex
                                    items-center
                                    justify-center

                                    w-10
                                    h-10

                                    rounded-full
                                    rotate-90
                                    text-white/60

                                    hover:text-white
                                    hover:bg-white/10

                                    transition-all
                                "
                            >
                                <IoChevronDown className="text-2xl" />
                            </button>


                            <h2
                                className="
                                    text-lg
                                    font-semibold
                                    text-white
                                "
                            >
                                {activeSection === "queue"
                                    ? "Queue"
                                    : "Lyrics"
                                }
                            </h2>


                            <div className="w-10" />

                        </div>


                        {/* ================================================= */}
                        {/* SECTION CONTENT */}
                        {/* ================================================= */}

                        <div
                            className="
                                flex-1

                                flex
                                items-center
                                justify-center

                                min-h-0

                                text-white/40
                            "
                        >

                            {activeSection === "queue" && (

                                <div
                                    className="
                                        flex
                                        flex-col
                                        items-center
                                        gap-3
                                    "
                                >

                                    <IoList className="text-5xl text-white/20" />

                                    <p className="text-sm">
                                        Your queue is empty
                                    </p>

                                </div>

                            )}


                            {activeSection === "lyrics" && (

                                <div
                                    className="
                                        flex
                                        flex-col
                                        items-center
                                        gap-3
                                    "
                                >

                                    <IoMusicalNotes
                                        className="
                                            text-5xl
                                            text-white/20
                                        "
                                    />

                                    <p className="text-sm">
                                        Lyrics will appear here
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ExpandedPlayer