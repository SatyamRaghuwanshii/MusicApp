import React from 'react'
import { 
  IoLogoGithub, 
  IoLogoTwitter, 
  IoLogoInstagram, 
  IoLogoYoutube,
  IoMusicalNotes 
} from 'react-icons/io5'

const Footer = () => {
  return (
    <footer className="relative top-6 w-full border-t border-white/10 bg-[#4b4949]/20 backdrop-blur-[15px] pt-12 pb-28 sm:pb-32 px-6 sm:px-12 text-white/70">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        
        {/* Brand / About */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <IoMusicalNotes className="text-2xl text-white" />
            <span className="font-['title'] text-xl font-bold text-white tracking-wide">
              Lodu Music
            </span>
          </div>
          <p className="text-xs text-white/[0.47] leading-relaxed max-w-xs">
            Stream your favorite music, discover trending artists, and create immersive playlists in ultra-clear audio.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a href="#" className="p-2 rounded-full bg-white/5 border border-white/10 text-white/[0.47] hover:text-white hover:bg-white/10 transition-colors">
              <IoLogoTwitter className="text-base" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 border border-white/10 text-white/[0.47] hover:text-white hover:bg-white/10 transition-colors">
              <IoLogoInstagram className="text-base" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 border border-white/10 text-white/[0.47] hover:text-white hover:bg-white/10 transition-colors">
              <IoLogoGithub className="text-base" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 border border-white/10 text-white/[0.47] hover:text-white hover:bg-white/10 transition-colors">
              <IoLogoYoutube className="text-base" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2.5">
          <h3 className="font-['title'] text-xs font-semibold text-white uppercase tracking-wider mb-1">
            Discover
          </h3>
          <a href="#" className="text-xs text-white/[0.47] hover:text-white transition-colors">Top Charts</a>
          <a href="#" className="text-xs text-white/[0.47] hover:text-white transition-colors">New Releases</a>
          <a href="#" className="text-xs text-white/[0.47] hover:text-white transition-colors">Genres & Moods</a>
          <a href="#" className="text-xs text-white/[0.47] hover:text-white transition-colors">Live Radio</a>
        </div>

        {/* Support & Community */}
        <div className="flex flex-col gap-2.5">
          <h3 className="font-['title'] text-xs font-semibold text-white uppercase tracking-wider mb-1">
            Platform
          </h3>
          <a href="#" className="text-xs text-white/[0.47] hover:text-white transition-colors">About Us</a>
          <a href="#" className="text-xs text-white/[0.47] hover:text-white transition-colors">Help Center</a>
          <a href="#" className="text-xs text-white/[0.47] hover:text-white transition-colors">Creator Studio</a>
          <a href="#" className="text-xs text-white/[0.47] hover:text-white transition-colors">Privacy & Terms</a>
        </div>

        {/* Quick Newsletter / Updates */}
        <div className="flex flex-col gap-3">
          <h3 className="font-['title'] text-xs font-semibold text-white uppercase tracking-wider">
            Stay Tuned
          </h3>
          <p className="text-xs text-white/[0.47]">
            Get weekly updates on exclusive releases and playlists.
          </p>
          <div className="flex items-center gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full h-9 rounded-full bg-[#4b4949]/[0.427] border border-white/10 px-4 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
            />
            <button className="h-9 px-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-medium text-white transition-colors shrink-0">
              Join
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/[0.47] gap-3">
        <p>© {new Date().getFullYear()} Lodu Music Inc. All rights Unreserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer