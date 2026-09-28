import React, { useEffect, useRef, useState } from "react";
import {
    IoPlayBack,
    IoPlay,
    IoPause,
    IoPlayForward,
    IoBluetooth,
    IoVolumeHigh,
} from "react-icons/io5";
import { RiEqualizer2Fill } from "react-icons/ri";

import PlayerProgress from "./PlayerProgress";
import VolumeBar from "./VolumeBar";
import ExpandedPlayer from "./ExpandedPlayer";

const svgs =
    "text-white/[0.47] text-[22px] sm:text-[26px] cursor-pointer hover:text-white transition-colors";

const Player = ({
    song,
    queue,
    currentSong,
    setCurrentSong,
}) => {
    const audioRef = useRef(null);
    const volumeTimerRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showVolume, setShowVolume] = useState(false);
    const [Volume, setVolume] = useState(1);
    const [isExpanded, setIsExpanded] = useState(true);

    // --------------------------------
    // Volume
    // --------------------------------

    const resetVolumeTimer = () => {
        clearTimeout(volumeTimerRef.current);

        volumeTimerRef.current = setTimeout(() => {
            setShowVolume(false);
        }, 3000);
    };

    const handleVolumeClick = () => {
        if (showVolume) {
            setShowVolume(false);
            clearTimeout(volumeTimerRef.current);
            return;
        }

        setShowVolume(true);
        resetVolumeTimer();
    };

    useEffect(() => {
        return () => {
            clearTimeout(volumeTimerRef.current);
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = Volume;
        }
    }, [Volume]);

    // --------------------------------
    // Progress
    // --------------------------------

    const handleProgress = () => {
        const audio = audioRef.current;

        if (!audio) return;

        const currTime = audio.currentTime;
        const duration = audio.duration;

        if (!duration) return;

        const prog = (currTime / duration) * 100;

        setProgress(prog);
    };

    // --------------------------------
    // Keyboard
    // --------------------------------

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                e.target.tagName === "INPUT" ||
                e.target.tagName === "TEXTAREA"
            ) {
                return;
            }

            if (e.code === "Space") {
                e.preventDefault();
                handlePlayPause();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // --------------------------------
    // Play / Pause
    // --------------------------------

    const handlePlayPause = () => {
        const audio = audioRef.current;

        if (!audio) return;

        if (audio.paused) {
            audio.play().catch((error) => {
                console.log("Playback failed", error);
            });
        } else {
            audio.pause();
        }
    };

    // --------------------------------
    // Next
    // --------------------------------

    const handleNext = () => {
        if (!queue?.length || !currentSong) return;

        const index = queue.findIndex(
            (item) => item.id === currentSong.id
        );

        if (index === -1) return;

        if (index < queue.length - 1) {
            setCurrentSong(queue[index + 1]);
        }
    };

    // --------------------------------
    // Previous
    // --------------------------------

    const handlePrev = () => {
        if (!queue?.length || !currentSong) return;

        const index = queue.findIndex(
            (item) => item.id === currentSong.id
        );

        if (index === -1) return;

        if (index > 0) {
            setCurrentSong(queue[index - 1]);
        }
    };

    // --------------------------------
    // Load new song
    // --------------------------------

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio || !currentSong) return;

        setProgress(0);

        audio.load();

        audio.play().catch((error) => {
            console.log("Playback failed", error);
        });
    }, [currentSong]);

    return (
        <>
            <audio
                ref={audioRef}
                src={currentSong?.downloadUrl?.[4]?.url}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleProgress}
                onEnded={handleNext}
                volume={Volume}
            />

            {currentSong && (
                <div className="sticky bottom-2.5 z-10 flex w-full justify-center px-2">
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            h-20
                            w-[95%]
                            sm:w-[90%]
                            lg:w-3/5
                            rounded-[50px]
                            bg-[#4b4949]/[0.427]
                            backdrop-blur-[15px]
                            border
                            border-b-2
                            border-white/10
                            px-4
                            sm:px-6
                        "
                    >
                        {/* LEFT CONTROLS */}

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                w-[22%]
                                sm:w-1/5
                                ml-1
                                sm:ml-4
                            "
                        >
                            <IoPlayBack
                                onClick={handlePrev}
                                className={svgs}
                            />

                            {isPlaying ? (
                                <IoPause
                                    onClick={handlePlayPause}
                                    className={`${svgs} text-[26px] sm:text-[32px]`}
                                />
                            ) : (
                                <IoPlay
                                    onClick={handlePlayPause}
                                    className={`${svgs} text-[26px] sm:text-[32px]`}
                                />
                            )}

                            <IoPlayForward
                                onClick={handleNext}
                                className={svgs}
                            />
                        </div>

                        {/* PLAYER */}

                        {isExpanded ? (
                            <PlayerProgress
                                onExpand={() => setIsExpanded(false)}
                                song={currentSong}
                                progress={progress}
                                audioRef={audioRef}
                            />
                        ) : (
                            <ExpandedPlayer
                                song={currentSong}
                                progress={progress}
                                audioRef={audioRef}
                                isPlaying={isPlaying}
                                setIsPlaying={setIsPlaying}
                                setIsExpanded={setIsExpanded}
                                queue={queue}
                                setCurrentSong={setCurrentSong}
                                handlePlayPause={handlePlayPause}
                                handlePrev={handlePrev}
                                handleNext={handleNext}
                                onSongClick={setCurrentSong}
                            />
                        )}

                        {/* RIGHT CONTROLS */}

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                w-[22%]
                                sm:w-1/5
                                mr-1
                                sm:mr-4
                            "
                        >
                            <IoBluetooth className={svgs} />

                            <RiEqualizer2Fill className={svgs} />

                            <IoVolumeHigh
                                onClick={handleVolumeClick}
                                className={svgs}
                            />

                            {showVolume && (
                                <VolumeBar
                                    setVolume={setVolume}
                                    volume={Volume}
                                    resetVolumeTimer={resetVolumeTimer}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Player;