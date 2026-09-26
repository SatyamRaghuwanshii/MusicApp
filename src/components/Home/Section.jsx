import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Section = ({ title, children }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (!scrollRef.current) return;

        scrollRef.current.scrollBy({
            left: direction === "left" ? -500 : 500,
            behavior: "smooth",
        });
    };

    return (
        <section className="relative z-10 w-full py-6">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
                <h2 className="relative z-20 text-2xl font-bold text-white">
                    {title}
                </h2>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => scroll("left")}
                        className="
                            flex h-9 w-9 items-center justify-center
                            rounded-full
                            border border-white/10
                            bg-white/10
                            text-white
                            backdrop-blur-md
                            transition
                            hover:bg-white/20
                            active:scale-95
                        "
                    >
                        <FiChevronLeft size={20} />
                    </button>

                    <button
                        type="button"
                        onClick={() => scroll("right")}
                        className="
                            flex h-9 w-9 items-center justify-center
                            rounded-full
                            border border-white/10
                            bg-white/10
                            text-white
                            backdrop-blur-md
                            transition
                            hover:bg-white/20
                            active:scale-95
                        "
                    >
                        <FiChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className="relative w-full">

                <div
                    ref={scrollRef}
                    className="
                        w-full
                        overflow-x-auto
                        scrollbar-none
                        scroll-smooth
                        px-2
                    "
                    style={{
                        maskImage:
                            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                        WebkitMaskImage:
                            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                    }}
                >
                    <div className="flex w-max gap-5 px-6 py-8">
                        {children}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Section;