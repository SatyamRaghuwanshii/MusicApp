import React, { useEffect, useRef, useState } from 'react'

const VolumeBar = ({ volume, setVolume, resetVolumeTimer }) => {

    const barRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)

    // Calculate volume from mouse position
    const updateVolume = (clientX) => {

        const rect = barRef.current.getBoundingClientRect()

        const mouseX = clientX - rect.left

        let percentage = mouseX / rect.width

        // Keep value between 0 and 1
        percentage = Math.max(0, Math.min(1, percentage))

        setVolume(percentage)
    }

    // Start dragging
    const handleMouseDown = (e) => {
        setIsDragging(true)
        updateVolume(e.clientX)
        resetVolumeTimer()
    }

    useEffect(() => {

        if (!isDragging) return

        const handleMouseMove = (e) => {
            updateVolume(e.clientX)
        }

        const handleMouseUp = () => {
            setIsDragging(false)
            resetVolumeTimer()
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handleMouseUp)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        }

    }, [isDragging])

    return (
        <div
            className="
                absolute
                bottom-14
                right-0

                flex items-center justify-center

                w-32
                h-10

                rounded-full

                bg-black/70
                border border-white/20
                shadow-lg

                p-2

                origin-bottom-right
                animate-[volumePop_0.35s_cubic-bezier(0.34,1.56,0.64,1)]
            "
        >

            {/* Volume Track */}
            <div
                ref={barRef}
                onMouseDown={handleMouseDown}
                className="
                    relative
                    w-24
                    h-1
                    rounded-full
                    bg-white/20
                    cursor-pointer
                "
            >

                {/* Filled Volume */}
                <div
                    style={{
                        width: `${volume * 100}%`
                    }}
                    className="
                        absolute
                        left-0
                        top-0
                        h-full
                        rounded-full
                        bg-white
                        transition-[width]
                        duration-75
                    "
                />

                {/* Volume Knob */}
                <div
                    style={{
                        left: `${volume * 100}%`
                    }}
                    className="
                        absolute
                        top-1/2
                        -translate-x-1/2
                        -translate-y-1/2

                        w-3
                        h-3

                        rounded-full
                        bg-white

                        shadow-md
                    "
                />

            </div>

        </div>
    )
}

export default VolumeBar
