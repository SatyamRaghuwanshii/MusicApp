import hero from "../../assets/hero.png";

const HeroSection = ({ onPlay }) => {
    return (
        <section
            className="
                relative
                isolate
                w-full
                h-[280px]
                sm:h-[340px]
                overflow-hidden
                rounded-[28px]
                border
                border-white/10
            "
        >
            {/* Background */}
            <img
                src={hero}
                alt=""
                aria-hidden="true"
                className="
                    absolute
                    inset-0
                    z-0
                    w-full
                    h-full
                    object-cover
                "
            />

            {/* Dark overlay */}
            <div
                className="
                    absolute
                    inset-0
                    z-10
                    bg-gradient-to-r
                    from-black/85
                    via-black/50
                    to-transparent
                "
            />

            {/* Content */}
            <div
                className="
                    absolute
                    inset-0
                    z-20
                    flex
                    flex-col
                    justify-end
                    p-6
                    sm:p-10
                "
            >
                <p className="mb-2 text-sm text-white/60">
                    WELCOME BACK
                </p>

                <h1
                    className="
                        text-3xl
                        sm:text-5xl
                        font-bold
                        leading-tight
                        text-white
                    "
                >
                    Find your sound.
                </h1>

                <p
                    className="
                        mt-3
                        max-w-md
                        text-sm
                        sm:text-base
                        leading-relaxed
                        text-white/70
                    "
                >
                    Discover music, explore new artists and listen to
                    something you love.
                </p>

                <button
                    type="button"
                    onClick={onPlay}
                    className="
                        mt-6
                        w-fit
                        rounded-full
                        bg-white
                        px-6
                        py-3
                        text-sm
                        font-semibold
                        text-black
                        transition-transform
                        duration-200
                        hover:scale-105
                    "
                >
                    Start listening
                </button>
            </div>
        </section>
    );
};

export default HeroSection;