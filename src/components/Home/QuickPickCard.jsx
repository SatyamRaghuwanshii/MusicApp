import React from 'react'

const QuickPickCard = ({ song, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="
                flex
                items-center
                gap-3
                min-w-[220px]
                sm:min-w-[260px]
                p-2
                rounded-xl
                bg-white/[0.06]
                border border-white/10
                backdrop-blur-md
                cursor-pointer
                transition-all
                duration-300
                hover:bg-white/[0.12]
                hover:scale-[1.02]
            "
        >
            <img
                src={song.image?.[2]?.url || song.image?.[0]?.url}
                alt={song.name}
                className="
                    w-14
                    h-14
                    rounded-lg
                    object-cover
                    shrink-0
                "
            />

            <div className="min-w-0">
                <h3 className="text-sm font-semibold text-white truncate">
                    {song.name}
                </h3>

                <p className="text-xs text-white/40 truncate">
                    {song.album?.name || song.album || "Unknown album"}
                </p>
            </div>
        </div>
    );
};

export default QuickPickCard;