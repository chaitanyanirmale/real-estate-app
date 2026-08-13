import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-teal-700 py-20">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center text-white">

            <span className="text-sm font-semibold uppercase tracking-widest text-teal-200">
              Your Next Move
            </span>

            <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
              Ready to Find Your Perfect Property?
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-teal-100">
              Browse our latest listings and discover a place that feels
              right for you.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/search"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white px-6 py-3 font-semibold text-teal-700 transition duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                Explore Properties
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/create-listing"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                List Your Property
              </Link>
            </div>
          </div>
        </div>
      </section>
  )
}

export default CTA