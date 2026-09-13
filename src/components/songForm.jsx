import React, { useState } from 'react'

const songForm = ({onAddSong}) => {

    const [song, setSong] = useState({
      title: "",
      album: "",
      cover: ""
    })

    const handelChange = (e)=>{
      const {name, value} = e.target
      setSong({...song, [name]:value})
    }

    const submitHandler = (e)=>{
      e.preventDefault();
      onAddSong(song)
    }

    return (
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={submitHandler}
        className="
          flex flex-col gap-5
          p-6
          rounded-[20px]
          bg-[#4b4949]/[0.427]
          backdrop-blur-[15px]
          border border-white/10
        "
      >
        <h2 className="text-2xl font-semibold text-white/90">
          Add Local Song
        </h2>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white/60">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={song.title}
            onChange={handelChange}
            placeholder="Enter song title"
            className="
              w-full
              px-4 py-3
              rounded-xl
              bg-white/5
              border border-white/10
              outline-none
              text-white
              placeholder:text-white/30
              focus:border-white/30
            "
          />
        </div>

        {/* Album */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white/60">
            Album
          </label>

          <input
            type="text"
            name="album"
            value={song.album}
            onChange={handelChange}
            placeholder="Enter album name"
            className="
              w-full
              px-4 py-3
              rounded-xl
              bg-white/5
              border border-white/10
              outline-none
              text-white
              placeholder:text-white/30
              focus:border-white/30
            "
          />
        </div>

        {/* Cover */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white/60">
            Cover Link
          </label>

          <input
            type="text"
            name="cover"
            value={song.cover}
            onChange={handelChange}
            placeholder="Paste cover image URL"
            className="
              w-full
              px-4 py-3
              rounded-xl
              bg-white/5
              border border-white/10
              outline-none
              text-white
              placeholder:text-white/30
              focus:border-white/30
            "
          />
        </div>

        <button
          type="submit"
          className="
            mt-2
            w-full
            py-3
            rounded-xl
            bg-white
            text-black
            font-medium
            hover:bg-white/90
            transition
          "
        >
          Add Song
        </button>
      </form>
    </div>
  );
}

export default songForm
