import React from "react";
import { NavLink } from "react-router-dom";

const PageNav = () => {
    return (
        <div
            className="
                flex items-center gap-1
                p-1
                rounded-full
                bg-[#4b4949]/[0.427]
                backdrop-blur-[15px]
                border border-white/10
            "
        >
            <NavLink
                to="/"
                end
                className={({ isActive }) =>
                    `px-5 py-2 rounded-full transition-all duration-200 ${
                        isActive
                            ? "bg-white/15 text-white"
                            : "text-white/60 hover:text-white hover:bg-white/10"
                    }`
                }
            >
                Home
            </NavLink>

            <NavLink
                to="/local"
                className={({ isActive }) =>
                    `px-5 py-2 rounded-full transition-all duration-200 ${
                        isActive
                            ? "bg-white/15 text-white"
                            : "text-white/60 hover:text-white hover:bg-white/10"
                    }`
                }
            >
                Local
            </NavLink>
        </div>
    );
};

export default PageNav;