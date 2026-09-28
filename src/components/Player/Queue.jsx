import React from "react";
import { IoChevronDown, IoList } from "react-icons/io5";

const Queue = ({
    queue = [],
    currentSong,
    onSongClick,
    onClose,
}) => {

    return (
        <div className="flex flex-col h-full ">

            {/* Queue Header */}
            <div
                
                className="
                    flex
                    items-center
                    justify-between
                    shrink-0
                    pb-4
                "
            >

                <button
                    onClick={onClose}
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

                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-semibold text-white">
                        Queue
                    </h2>

                    <span className="text-[10px] text-white/40">
                        {queue.length} {queue.length === 1 ? "song" : "songs"}
                    </span>
                </div>

                <div className="w-10" />

            </div>


            {/* Queue Content */}
            <div className="flex-1 min-h-0 overflow-y-auto">

                {queue.length === 0 ? (

                    <div
                        className="
                            h-full
                            flex
                            flex-col
                            items-center
                            justify-center
                            gap-3
                            text-white/40
                        "
                    >
                        <IoList className="text-5xl text-white/20" />

                        <p className="text-sm">
                            Your queue is empty
                        </p>
                    </div>

                ) : (

                    <div className="flex flex-col gap-2">

                        {queue.map((item, index) => {

                            const isCurrent =
                                currentSong?.id === item?.id;

                            return (
                                <button
                                    key={`${item.id}-${index}`}
                                    onClick={() => onSongClick(item)}
                                    className={`
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        p-2
                                        rounded-xl
                                        text-left
                                        transition-all
                                        ${
                                            isCurrent
                                                ? "bg-white/10"
                                                : "hover:bg-white/5"
                                        }
                                    `}
                                >

                                    {/* Album Art */}
                                    <div
                                        className="
                                            w-12
                                            h-12
                                            shrink-0
                                            rounded-lg
                                            overflow-hidden
                                            bg-white/5
                                        "
                                    >
                                        <img
                                            src={item?.image?.[0]?.url}
                                            alt=""
                                            className="
                                                w-full
                                                h-full
                                                object-cover
                                            "
                                        />
                                    </div>


                                    {/* Song Info */}
                                    <div className="min-w-0 flex-1">

                                        <p
                                            className={`
                                                text-sm
                                                font-semibold
                                                truncate
                                                ${
                                                    isCurrent
                                                        ? "text-white"
                                                        : "text-white/80"
                                                }
                                            `}
                                        >
                                            {item?.name}
                                        </p>

                                        <p
                                            className="
                                                text-xs
                                                text-white/40
                                                truncate
                                                mt-0.5
                                            "
                                        >
                                            {item?.album?.name || "Unknown album"}
                                        </p>

                                    </div>


                                    {/* Playing indicator */}
                                    {isCurrent && (
                                        <div className="flex items-center gap-[3px] h-6">
                                            <span className="w-[3px] h-3 bg-white rounded-full animate-[wave_0.8s_ease-in-out_infinite]" />
                                            <span className="w-[3px] h-5 bg-white rounded-full animate-[wave_0.8s_ease-in-out_0.15s_infinite]" />
                                            <span className="w-[3px] h-4 bg-white rounded-full animate-[wave_0.8s_ease-in-out_0.3s_infinite]" />
                                            <span className="w-[3px] h-6 bg-white rounded-full animate-[wave_0.8s_ease-in-out_0.45s_infinite]" />
                                        </div>
                                    )}

                                </button>
                            );
                        })}

                    </div>

                )}

            </div>

        </div>
    );
};

export default Queue;