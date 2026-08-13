import { ArrowRight, MapPin, Search } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-teal-900 to-slate-900">
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="container-custom relative z-10 flex min-h-[88vh] items-center py-12">
          <div className="grid lg:grid-cols-2 items-center gap-10">
            <div className="space-y-6 text-white page-enter">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
                <MapPin size={16} />
                Trusted Real Estate Platform
              </span>

              <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Find Your
                <span className="block text-amber-400">Dream Home</span>
                With Confidence
              </h1>

              <p className="max-w-lg text-lg leading-relaxed text-slate-300">
                Discover premium apartments, villas, and family homes across the city.
                Buy, rent, or invest with verified listings and trusted agents.
              </p>
            </div>
            <div className="">
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/search"
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 font-semibold text-slate-900 transition hover:scale-105 hover:bg-amber-300"
                  >
                    Explore Properties
                    <ArrowRight size={18} />
                  </Link>

                  <Link
                    to="/search?type=rent"
                    className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    Rent Now
                  </Link>
                </div>

                <div className="mt-8 rounded-2xl bg-white p-3 shadow-2xl">
                  <div className="flex flex-col gap-3 md:flex-row">
                    <div className="flex flex-1 items-center gap-2 rounded-xl bg-slate-100 px-4">
                      <Search size={18} className="text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search by city, locality, or property..."
                        className="w-full bg-transparent py-3 outline-none text-slate-700"
                      />
                    </div>

                    <Link
                      to="/search"
                      className="rounded-xl bg-yellow-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-teal-800"
                    >
                      Search
                    </Link>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero