import defaultPoster from "../../assets/DhurandharPoster.jpg";

const MusicCard = ({
    poster,
    name,
    album,
    onSongClick,
}) => {
    return (
        <div
            onClick={onSongClick}
            className="
                group
                shrink-0
                w-[170px]
                sm:w-[190px]
                cursor-pointer
            "
        >
            {/* Poster */}
            <div
                className="
                    relative
                    aspect-square
                    w-full
                    overflow-hidden
                    rounded-[16px]
                    bg-white/5
                "
            >
                <img
                    src={poster || defaultPoster}
                    alt={name || "Song"}
                    className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-300
                        group-hover:scale-105
                    "
                />
            </div>

            {/* Info */}
            <div className="mt-3 min-w-0">
                <h3
                    className="
                        truncate
                        text-sm
                        font-semibold
                        text-white
                    "
                    title={name}
                >
                    {name}
                </h3>

                <p
                    className="
                        mt-1
                        truncate
                        text-xs
                        text-white/50
                    "
                    title={album}
                >
                    {album}
                </p>
            </div>
        </div>
    );
};

export default MusicCard;