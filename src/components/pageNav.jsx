import React from 'react'

const pageNav = () => {
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

        <div
        //   to="/"
          className="
            px-5 py-2
            rounded-full
            text-white
            hover:bg-white/10
            transition
          "
        >
          Home
        </div>

        <div
        //   to="/local"
          className="
            px-5 py-2
            rounded-full
            text-white
            hover:bg-white/10
            transition
          "
        >
          Local
        </div>

      </div>
  )
}

export default pageNav
