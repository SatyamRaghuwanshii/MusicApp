import React from 'react'
import { IoPlayBack, IoPlay, IoPlayForward, IoBluetooth, IoVolumeHigh, IoHeart } from 'react-icons/io5'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { RiEqualizer2Fill } from 'react-icons/ri'

import poster from '/src/assets/DhurandharPoster.jpg'


// Reusable icon style variable
const svgs = "text-white/[0.47] text-[22px] sm:text-[26px] cursor-pointer hover:text-white transition-colors"

const Player = ({songTitle = "Aari Aari", album = "From Dhurandhar", progress = 45 }) => {
  return (
    <div className="sticky bottom-2.5 z-10 flex w-full justify-center px-2">
      <div className="flex items-center justify-between h-20 w-[95%] sm:w-[90%] lg:w-3/5 rounded-[50px] bg-[#4b4949]/[0.427] backdrop-blur-[15px] border border-b-2 border-white/10 px-4 sm:px-6">
        
        {/* Left Playback Controls */}
        <div className="flex items-center justify-between w-[22%] sm:w-1/5 ml-1 sm:ml-4">
          <IoPlayBack className={svgs} />
          <IoPlay className={`${svgs} text-[26px] sm:text-[32px]`} />
          <IoPlayForward className={svgs} />
        </div>

        {/* Middle Track Info Card */}
        <div className="relative flex items-center h-[80%] w-[46%] sm:w-[38%] rounded-[15px] overflow-hidden px-2">
          {/* Blurred Backdrop */}
          <img 
            className="absolute inset-0 h-full w-full object-cover blur-[10px] pointer-events-none" 
            src={poster} 
            alt="" 
          />

          {/* Album Thumbnail */}
          <div className="relative z-[1] shrink-0 h-[45px] w-[45px] rounded-[5px] overflow-hidden">
            <img 
              className="h-full w-full object-cover filter-none" 
              src={poster} 
              alt="Track Art" 
            />
          </div>

          {/* Song & Artist Details */}
          <div className="relative z-[1] pl-3 flex flex-col justify-center ml-3 min-w-0 pr-14">
            <h3 className="font-['title'] text-white/[0.80] text-xs sm:text-sm font-semibold truncate">
              {songTitle}
            </h3>
            <h6 className="font-['title'] text-white/[0.47] text-[10px] sm:text-xs truncate">
              {album}
            </h6>
          </div>

          {/* Favorite & Options */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-[1] flex items-center gap-1.5 sm:gap-2">
            <IoHeart className={svgs} />
            <BsThreeDotsVertical className={svgs} />
          </div>

          {/* Progress Bar */}
          <div 
            style={{ width: `${progress}%` }} 
            className="absolute bottom-0 left-0 h-[5px] rounded-[3px] bg-white/[0.537] hover:bg-[#f0f8ff] cursor-pointer transition-all"
          />
        </div>

        {/* Right Audio / Output Controls */}
        <div className="flex items-center justify-between w-[22%] sm:w-1/5 mr-1 sm:mr-4">
          <IoBluetooth className={svgs} />
          <RiEqualizer2Fill className={svgs} />
          <IoVolumeHigh className={svgs} />
        </div>

      </div>
    </div>
  )
}

export default Player