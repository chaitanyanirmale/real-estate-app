import { Building2, Search, ShieldCheck, Users } from 'lucide-react'
import React from 'react'

const Stats = () => {
  return (
    <section className="bg-slate-950 py-20 text-white">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-teal-400">
              Why PrimeNest
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need to Find the Right Property
            </h2>
            <p className="mt-4 leading-relaxed text-slate-400">
              We make buying, renting, and discovering properties simpler,
              faster, and more transparent.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:-translate-y-2 hover:bg-white/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 transition duration-300 group-hover:scale-110">
                <Building2 size={24} />
              </div>
              <h3 className="mt-5 text-lg font-semibold">
                Wide Property Selection
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Explore apartments, houses, villas, and commercial properties
                in one convenient platform.
              </p>
            </div>
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:-translate-y-2 hover:bg-white/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 transition duration-300 group-hover:scale-110">
                <ShieldCheck size={24} />
              </div>
              <h3 className="mt-5 text-lg font-semibold">
                Trusted Listings
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Discover detailed property information designed to help you
                make confident decisions.
              </p>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:-translate-y-2 hover:bg-white/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 transition duration-300 group-hover:scale-110">
                <Search size={24} />
              </div>
              <h3 className="mt-5 text-lg font-semibold">
                Powerful Search
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Quickly narrow down properties using location, price,
                bedrooms, and other useful filters.
              </p>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:-translate-y-2 hover:bg-white/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 transition duration-300 group-hover:scale-110">
                <Users size={24} />
              </div>
              <h3 className="mt-5 text-lg font-semibold">
                Expert Support
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Connect with property owners and agents to get the information
                you need.
              </p>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-12 md:grid-cols-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-white sm:text-4xl">
                500+
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Properties Listed
              </p>
            </div>

            <div className="text-center">
              <p className="text-3xl font-bold text-white sm:text-4xl">
                250+
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Happy Customers
              </p>
            </div>

            <div className="text-center">
              <p className="text-3xl font-bold text-white sm:text-4xl">
                50+
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Trusted Agents
              </p>
            </div>

            <div className="text-center">
              <p className="text-3xl font-bold text-white sm:text-4xl">
                24/7
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Customer Support
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Stats