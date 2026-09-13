import React, { useState, useEffect } from 'react'
import defaultPoster from '/src/assets/DhurandharPoster.jpg'

const Card = ({ poster, name, album }) => {
  const [horizontal, setHorizontal] = useState(0)
  const [vertical, setVertical] = useState(0)
  const [isHovered, setIsHovered] = useState(false)


  const MAX_TILT = 15


  const calculateHover = (e) => {
    setIsHovered(true)
    const rect = e.currentTarget.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const normalizedX = (x - centerX) / centerX
    const normalizedY = (y - centerY) / centerY

    const rotY = Number((normalizedX * MAX_TILT).toFixed(2))
    const rotX = Number((-normalizedY * MAX_TILT).toFixed(2))

    setHorizontal(rotY)
    setVertical(rotX)
  }

  const resetHover = () => {
    setIsHovered(false)
    setHorizontal(0)
    setVertical(0)
  }

  return (
    <div
      onClick={() => console.log('click')}
      onMouseMove={calculateHover}
      onMouseLeave={resetHover}
      style={{
        zIndex: isHovered ? 20 : 1,
        boxShadow: isHovered
          ? "0 20px 50px -10px rgba(1,1,1,0.65), 0 0 25px 2px rgba(1,1,1,0.35)"
          : "0 10px 60px -15px rgba(0, 0, 0, 0.5)",
        transform: `perspective(1000px) rotateX(${vertical}deg) rotateY(${horizontal}deg) ${isHovered ? 'scale3d(1.03, 1.03, 1.03)' : 'scale3d(1, 1, 1)'
          }`,
      }}
      className={`
        relative flex flex-col items-center
        w-[calc((100%_-_2rem)/3)]
        max-w-[280px]
        aspect-[7/10]
        sm:w-[280px]
        sm:h-[400px]
        sm:aspect-auto
        md:w-[300px]
        md:h-[400px]
        p-[7px]
        cursor-pointer
        rounded-[20px]
        bg-[#4b4949]/[0.427]
        backdrop-blur-[15px]
        border border-b-2 border-white/10
        select-none
        will-change-transform
        ${
          isHovered
            ? 'transition-[box-shadow] duration-200'
            : 'transition-all duration-500 ease-out'
        }
      `}
      >
      {/* Cover Image */}
      <div className="relative w-full aspect-[2/3] overflow-hidden rounded-[20px] pointer-events-none">
        <img
          crossOrigin="anonymous"
          className="absolute inset-0 w-full h-full rounded-[20px] object-cover"
          src={poster || defaultPoster}
          alt={name || "Card poster"}
        />
      </div>

      {/* Typography */}
      <div className="flex flex-col items-center w-full px-2 pointer-events-none">
        <h1
          className="
            font-['title']
            text-base sm:text-lg md:text-xl
            text-center font-semibold text-white/90
            pt-4 sm:pt-5 md:pt-[25px]
            truncate w-full
          "
          title={name}
        >
          {name}
        </h1>

        <h4
          className="
            font-['title']
            text-xs sm:text-sm
            text-center font-semibold text-white/[0.47]
            pt-1
            truncate w-full
          "
          title={album}
        >
          {album}
        </h4>
      </div>
    </div>
  )
}

export default Card