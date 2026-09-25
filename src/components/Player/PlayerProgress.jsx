import React, { useState } from 'react'
import { IoHeart } from 'react-icons/io5'
import { BsThreeDotsVertical } from 'react-icons/bs'

const svgs =
    "text-white/[0.47] text-[22px] sm:text-[26px] cursor-pointer hover:text-white transition-colors"

const PlayerProgress = ({ song, progress, audioRef, onExpand }) => {
    const [progressPreview, setProgressPreview] = useState(0)

    const handleSeekHover = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const hoverX = e.clientX - rect.left
        const percentage = (hoverX / rect.width) * 100
        setProgressPreview(percentage)
    }

    const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const clickX = e.clientX - rect.x
        const percentage = clickX / rect.width * 100
        const newTime = audioRef.current.duration / 100 * percentage
        audioRef.current.currentTime = newTime
    }

    return (
        <div onClick={onExpand} className="relative flex items-center h-[80%] w-[46%] sm:w-[38%] rounded-[15px] overflow-hidden px-2">

            <img
                className="absolute inset-0 h-full w-full object-cover blur-[10px] pointer-events-none"
                src={song?.image?.[0]?.url}
                alt=""
            />
            <div
                    className="
                        absolute
                        inset-0
                        bg-black/50
                        pointer-events-none
                    "
                />

            <div className="relative z-[1] shrink-0 h-[45px] w-[45px] rounded-[5px] overflow-hidden">
                <img
                    className="h-full w-full object-cover filter-none"
                    src={song?.image?.[0]?.url}
                    alt="Track Art"
                />
                
            </div>

            <div className="relative z-[1] pl-3 flex flex-col justify-center ml-3 min-w-0 pr-14">
                <h3 className="font-['title'] text-white/[0.80] text-xs sm:text-sm font-semibold truncate">
                    {song?.name}
                </h3>

                <h6 className="font-['title'] text-white/[0.47] text-[10px] sm:text-xs truncate">
                    {song?.album?.name}
                </h6>
            </div>

            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-[1] flex items-center gap-1.5 sm:gap-2">
                <IoHeart className={svgs} />
                <BsThreeDotsVertical className={svgs} />
            </div>

            {/* Progress bar */}
            <div
                onClick={handleSeek}
                onMouseMove={handleSeekHover}
                onMouseLeave={() => { setProgressPreview(0) }}
                className="absolute bottom-0 left-0 w-full h-[5px] cursor-pointer"
            >
                <div
                    style={{ width: `${progress || 0}%` }}
                    className="h-full rounded-[3px] bg-white"
                />
                {progressPreview !== null && (
                    <div
                        style={{ width: `${progressPreview}%` }}
                        className="absolute top-0 left-0 h-full rounded-[3px] bg-white/[0.537] pointer-events-none transition-[width] duration-150 ease-out "
                    />
                )}
            </div>

        </div>
    )
}

export default PlayerProgress
